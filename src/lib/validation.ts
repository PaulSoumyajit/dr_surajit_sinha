import type { ContactInquiry, MatterCategory } from "@/types";

export const ALLOWED_MATTER_CATEGORIES: MatterCategory[] = [
  "Criminal Litigation",
  "Public Prosecution",
  "Cybercrime & Cyber Law",
  "POCSO Proceedings",
  "Civil & Writ Proceedings",
  "Banking & DRT Matters",
  "Land & Revenue Matters",
  "Corporate & Institutional Advisory",
  "Corporate Advisory",
  "Commercial Dispute",
  "Appellate Representation",
  "Other",
];

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ContactInquiry;
}

/**
 * Validates consultation inquiry payload both client-side and server-side.
 * Enforces strict length bounds, format matching, and non-solicitation acknowledgment.
 */
export function validateInquiryPayload(raw: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      isValid: false,
      errors: { _general: "Invalid submission payload format." },
    };
  }

  const payload = raw as Record<string, unknown>;

  // 1. Full Name
  const fullName = typeof payload.full_name === "string" ? payload.full_name.trim() : "";
  if (!fullName) {
    errors.full_name = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.full_name = "Full name must be at least 2 characters.";
  } else if (fullName.length > 150) {
    errors.full_name = "Full name must not exceed 150 characters.";
  }

  // 2. Organization (optional)
  let organization: string | null = null;
  if (typeof payload.organization === "string") {
    const org = payload.organization.trim();
    if (org.length > 150) {
      errors.organization = "Organization must not exceed 150 characters.";
    } else {
      organization = org || null;
    }
  }

  // 3. Email
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email) {
    errors.email = "Email address is required.";
  } else if (email.length > 150) {
    errors.email = "Email address must not exceed 150 characters.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  // 4. Telephone (optional)
  let telephone: string | null = null;
  if (typeof payload.telephone === "string") {
    const phone = payload.telephone.trim();
    if (phone) {
      if (phone.length > 50) {
        errors.telephone = "Telephone number must not exceed 50 characters.";
      } else if (!PHONE_REGEX.test(phone)) {
        errors.telephone = "Please provide a valid telephone number.";
      } else {
        telephone = phone;
      }
    }
  }

  // 5. Matter Category
  const category = payload.category as MatterCategory;
  if (!category || !ALLOWED_MATTER_CATEGORIES.includes(category)) {
    errors.category = "Please select a valid matter category.";
  }

  // 6. Brief Overview / Message
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    errors.message = "A brief overview of the legal matter is required.";
  } else if (message.length < 10) {
    errors.message = "Brief overview must be at least 10 characters.";
  } else if (message.length > 3000) {
    errors.message = "Brief overview must not exceed 3,000 characters.";
  }

  // 7. Disclaimer Accepted (Mandatory checkbox)
  const disclaimerAccepted = payload.disclaimer_accepted === true;
  if (!disclaimerAccepted) {
    errors.disclaimer_accepted =
      "You must acknowledge that submitting this enquiry does not create an advocate-client relationship.";
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      full_name: fullName,
      organization,
      email,
      telephone,
      category,
      message,
      disclaimer_accepted: true,
    },
  };
}

