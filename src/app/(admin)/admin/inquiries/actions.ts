"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import type { InquiryStatus } from "@/types";

export interface InquiryActionResponse {
  success: boolean;
  error?: string;
}

/**
 * Server Action: Update Consultation Inquiry Processing Status
 */
export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus
): Promise<InquiryActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("contact_inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update inquiry status.";
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Permanently Expunge Consultation Inquiry
 */
export async function deleteInquiryAction(id: string): Promise<InquiryActionResponse> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete inquiry.";
    return { success: false, error: msg };
  }
}

