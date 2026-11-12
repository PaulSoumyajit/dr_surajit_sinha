"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { generateSlug } from "@/lib/slug";

export interface ActionResponse {
  success: boolean;
  error?: string;
  articleId?: string;
}

/**
 * Calculates estimated reading time in minutes based on word count.
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Server Action: Save, Publish, Unpublish or Archive Article
 */
export async function saveArticleAction(formData: FormData): Promise<ActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    const id = (formData.get("id") as string) || undefined;
    const title = (formData.get("title") as string)?.trim();
    let slug = (formData.get("slug") as string)?.trim();
    const category_id = (formData.get("category_id") as string) || null;
    const excerpt = (formData.get("excerpt") as string)?.trim();
    const content_md = (formData.get("content_md") as string) || "";
    const cover_image_url = (formData.get("cover_image_url") as string)?.trim() || null;
    const status = (formData.get("status") as string) || "draft";

    if (!title) {
      return { success: false, error: "Article title is required." };
    }

    if (!slug) {
      slug = generateSlug(title);
    } else {
      slug = generateSlug(slug);
    }

    if (!slug) {
      return { success: false, error: "A valid URL slug is required." };
    }

    if (!excerpt) {
      return { success: false, error: "A concise editorial excerpt is required." };
    }

    if (!content_md.trim()) {
      return { success: false, error: "Article Markdown content cannot be empty." };
    }

    // 1. Slug uniqueness check
    let query = supabase.from("articles").select("id").eq("slug", slug);
    if (id) {
      query = query.neq("id", id);
    }
    const { data: existingSlug } = await query;
    if (existingSlug && existingSlug.length > 0) {
      return {
        success: false,
        error: `The slug "/${slug}" is already in use by another article. Please modify the slug.`,
      };
    }

    const reading_time_min = calculateReadingTime(content_md);
    const now = new Date().toISOString();

    const articlePayload: Record<string, unknown> = {
      title,
      slug,
      category_id: category_id && category_id !== "none" ? category_id : null,
      excerpt,
      content_md,
      cover_image_url,
      reading_time_min,
      status,
      updated_at: now,
    };

    if (id) {
      articlePayload.id = id;
    }

    if (status === "published") {
      // If newly published or no prior published_at, set published_at
      const { data: existingArticle } = id
        ? await supabase.from("articles").select("published_at").eq("id", id).single()
        : { data: null };

      if (!existingArticle?.published_at) {
        articlePayload.published_at = now;
      }
    }

    const { data: savedData, error: saveError } = await supabase
      .from("articles")
      .upsert(articlePayload)
      .select("id")
      .single();

    if (saveError) {
      return {
        success: false,
        error: saveError.message || "Failed to persist article to database.",
      };
    }

    // Revalidate affected routes
    revalidatePath("/insights");
    revalidatePath(`/insights/${slug}`, "page");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/dashboard");
    revalidatePath("/sitemap.xml");

    return {
      success: true,
      articleId: savedData?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Delete Article
 */
export async function deleteArticleAction(id: string): Promise<ActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    // Fetch slug first to revalidate specific path
    const { data: art } = await supabase.from("articles").select("slug").eq("id", id).single();

    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/insights");
    if (art?.slug) {
      revalidatePath(`/insights/${art.slug}`, "page");
    }
    revalidatePath("/admin/articles");
    revalidatePath("/admin/dashboard");
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete article.";
    return { success: false, error: message };
  }
}
