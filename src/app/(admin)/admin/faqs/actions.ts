"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";

export interface FaqActionResponse {
  success: boolean;
  error?: string;
}

/**
 * Server Action: Create or Update Practice Guidance FAQ
 */
export async function saveFaqAction(formData: FormData): Promise<FaqActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    const id = (formData.get("id") as string) || undefined;
    const question = (formData.get("question") as string)?.trim();
    const answer = (formData.get("answer") as string)?.trim();
    const category = (formData.get("category") as string)?.trim() || "General";
    const order_index = parseInt((formData.get("order_index") as string) || "0", 10);

    if (!question) {
      return { success: false, error: "Question text is required." };
    }

    if (!answer) {
      return { success: false, error: "Procedural answer guidance is required." };
    }

    const payload: Record<string, unknown> = {
      question,
      answer,
      category,
      order_index: isNaN(order_index) ? 0 : order_index,
    };

    if (id) {
      payload.id = id;
    }

    const { error } = await supabase.from("faqs").upsert(payload);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to persist FAQ.";
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Delete Practice FAQ
 */
export async function deleteFaqAction(id: string): Promise<FaqActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete FAQ.";
    return { success: false, error: msg };
  }
}

