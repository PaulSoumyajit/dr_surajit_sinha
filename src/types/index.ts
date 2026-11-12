/**
 * Unified TypeScript Domain Models
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Aligned with Supabase PostgreSQL schema documented in docs/05_TECHNICAL_ARCHITECTURE.md
 * and Content Requirements in docs/04_CONTENT_REQUIREMENTS.md.
 */

// ============================================================================
// 1. Common / Supporting Enums & Types
// ============================================================================

/** Status lifecycle of editorial articles */
export type ArticleStatus = "draft" | "published" | "archived";

/** Processing status of consultation inquiries in administrative inbox */
export type InquiryStatus = "unread" | "reviewed" | "archived";

/** Factual verification state for credentials and practice items */
export type VerificationStatus = "verified" | "pending";

// ============================================================================
// 2. Editorial & Publishing Models (Articles & Categories)
// ============================================================================

/**
 * Category taxonomy for articles and essays.
 * Maps to public.categories table.
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

/**
 * Editorial legal insights, essays, and monographs.
 * Maps to public.articles table.
 */
export interface Article {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  cover_image_url: string | null;
  reading_time_min: number;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  /** Optional joined category record when resolved */
  category?: Category | null;
}

// ============================================================================
// 3. Scholarly Works & Reported Judgments
// ============================================================================

/**
 * Published legal textbooks, commentaries, and academic treatises.
 * Maps to public.publications table.
 */
export interface Publication {
  id: string;
  title: string;
  subtitle: string | null;
  publisher: string;
  publication_year: number;
  isbn: string | null;
  cover_image_url: string | null;
  purchase_url: string | null;
  description: string;
  order_index: number;
  created_at: string;
}

/**
 * Peer-reviewed legal journal articles, law reviews, and seminar papers.
 */
export interface JournalArticle {
  id: string;
  title: string;
  citation: string;
  publication_date: string;
  topic: string;
  download_url: string | null;
  summary?: string;
  order_index?: number;
}

/**
 * Significant reported judgments and judicial rulings where counsel appeared.
 * Maps to public.judgments table.
 */
export interface Judgment {
  id: string;
  case_title: string;
  neutral_citation: string;
  court_bench: string;
  legal_subject: string;
  counsel_role: string;
  decision_date: string | null;
  official_report_url: string | null;
  ratio_summary: string;
  order_index: number;
  created_at: string;
}

/**
 * Technical certification or specialized qualification.
 */
export interface TechnicalCertification {
  id: string;
  title: string;
  category: string;
  issuer?: string;
  description: string;
  date_or_period?: string;
}

/**
 * Court & prosecution experience entry.
 */
export interface CourtExperienceItem {
  id: string;
  title: string;
  forum: string;
  role: string;
  tenure?: string;
  description: string;
  statutory_basis?: string[];
  category: "prosecution" | "criminal-trial" | "cyber" | "civil-writ" | "drt" | "land-revenue" | "collaboration";
}

// ============================================================================
// 4. Client Guidance & Inquiries
// ============================================================================

/**
 * Frequently asked questions and procedural guidance.
 * Maps to public.faqs table.
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  created_at: string;
}

/**
 * Consultation inquiries received via secure intake form.
 * Maps to public.contact_inquiries table.
 */
export interface ConsultationInquiry {
  id: string;
  full_name: string;
  organization: string | null;
  email: string;
  telephone: string | null;
  category: string;
  message: string;
  disclaimer_accepted: boolean;
  ip_hash: string | null;
  status: InquiryStatus;
  created_at: string;
}

// ============================================================================
// 5. Advocate Profile & Professional Credentials
// ============================================================================

/** Verified university degrees and academic honors */
export interface AcademicQualification {
  degree: string;
  institution?: string;
  specialisation?: string | null;
  year?: string | null;
  honors?: string | null;
  clerkship?: string | null;
  verification_status: VerificationStatus;
}

/** Bar Council enrolment and court admissions */
export interface ProfessionalAdmission {
  court_or_body: string;
  enrolment_number: string | null;
  year: string | null;
  standing?: string | null;
  jurisdiction?: string | null;
  verification_status: VerificationStatus;
}

/** Notable institutional appointments, panel empanelments, and advisory roles */
export interface InstitutionalAppointment {
  id: string;
  appointing_authority: string;
  role_or_capacity: string;
  tenure: string | null;
  jurisdiction_or_scope: string | null;
  verification_status: VerificationStatus;
}

/** Chronological career milestone entry */
export interface CareerMilestone {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
  highlight?: boolean;
  verification_status: VerificationStatus;
}

/** Practice domain with objective statutory touchpoints */
export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  description: string;
  order_index: number;
  verification_status: VerificationStatus;
  statutory_touchpoints?: string[];
}

/** Chamber clerking contact details */
export interface ChamberClerkContact {
  name: string;
  phone: string;
  email: string;
}

/**
 * Advocate professional profile model.
 * Strict separation between verified facts and pending client inputs.
 */
export interface CounselProfile {
  name: string;
  title: string;
  core_disciplines: string[];
  bar_enrolment: string | null;
  state_bar_council: string | null;
  bar_associations: string[];
  academic_qualifications: AcademicQualification[];
  professional_admissions: ProfessionalAdmission[];
  chamber_address: string | null;
  court_chambers: string | null;
  clerk_contact: ChamberClerkContact | null;
  phone: string | null;
  email: string | null;
  portrait_image_url: string | null;
}

// ============================================================================
// 6. Consultation Inquiry Models
// ============================================================================

/** Matter category taxonomy for preliminary consultation intake */
export type MatterCategory =
  | "Criminal Litigation"
  | "Public Prosecution"
  | "Cybercrime & Cyber Law"
  | "POCSO Proceedings"
  | "Civil & Writ Proceedings"
  | "Banking & DRT Matters"
  | "Land & Revenue Matters"
  | "Corporate & Institutional Advisory"
  | "Corporate Advisory"
  | "Commercial Dispute"
  | "Appellate Representation"
  | "Other";

/**
 * Consultation Inquiry Record.
 * Maps to public.contact_inquiries table in Supabase.
 */
export interface ContactInquiry {
  id?: string;
  full_name: string;
  organization?: string | null;
  email: string;
  telephone?: string | null;
  category: MatterCategory;
  message: string;
  disclaimer_accepted: boolean;
  ip_hash?: string;
  status?: InquiryStatus;
  created_at?: string;
}


