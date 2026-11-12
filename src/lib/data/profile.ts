import type { CounselProfile } from "@/types";

/**
 * Advocate Dr. Surajit Sinha — Verified Profile & Chambers Data
 *
 * Strict Compliance Note (docs/04_CONTENT_REQUIREMENTS.md & BCI Rule 36):
 * Factual data verified against curriculum vitae and confirmed by owner.
 *
 * Confirmed Canonical Identity:
 * - Dr. Surajit Sinha
 * - Advocate — High Court & Lower Courts
 * - Doctor of Philosophy (PhD) — Cyber Law and E-commerce (Awarded)
 *
 * Privacy & Candidate Contact Note (docs/CONTENT_VERIFICATION_REGISTER.md):
 * Candidate phone numbers (8348494488, 7501498468) and email (sinhasurajit40@gmail.com)
 * from CV are marked OWNER_CONFIRMATION_REQUIRED before public exposure.
 * Public inquiries are routed securely through the online inquiry intake workflow.
 */
export const COUNSEL_PROFILE: CounselProfile = {
  name: "Dr. Surajit Sinha",
  title: "Advocate — High Court & Lower Courts",
  core_disciplines: [
    "Criminal Law & Public Prosecution",
    "Cybercrime & Cyber Law",
    "POCSO Proceedings",
    "Civil & Writ Litigation",
    "Banking & DRT Matters",
    "Land & Revenue Matters",
    "Corporate & Institutional Advisory",
  ],
  bar_enrolment: "Enrolled Advocate under Advocates Act, 1961",
  state_bar_council: "Bar Council of West Bengal",
  bar_associations: [
    "High Court at Calcutta",
    "District & Sessions Court, Birbhum",
    "Sub-Divisional Court, Rampurhat",
  ],
  academic_qualifications: [
    {
      degree: "Doctor of Philosophy (PhD)",
      institution: "Doctoral Research in Law (Awarded)",
      specialisation: "Cyber Law and E-commerce",
      year: null,
      honors: "Doctor of Philosophy in Cyber Law and E-commerce",
      verification_status: "verified",
    },
    {
      degree: "Master of Laws (LL.M.)",
      institution: "Postgraduate Faculty of Law",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Computer Science & Information Technology",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "Master of Commerce (M.Com.)",
      institution: "Postgraduate Commerce & Finance Faculty",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "Bachelor of Laws (LL.B.)",
      institution: "Faculty of Law",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "Bachelor of Commerce (B.Com. Honours)",
      institution: "Undergraduate Commerce Faculty",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "CA PE-2 Group 1",
      institution: "Institute of Chartered Accountants of India (Intermediate)",
      year: null,
      honors: "Professional Examination PE-2 Group 1 Completed",
      verification_status: "verified",
    },
    {
      degree: "Diploma in Ethical Hacking & Cyber Security",
      institution: "Cybersecurity & Digital Defense Training",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "CCNA++ Certification",
      institution: "Cisco Networking & Systems Architecture",
      year: null,
      verification_status: "verified",
    },
    {
      degree: "Tally Guru Certification",
      institution: "Financial Accounting & Commercial Data Systems",
      year: null,
      verification_status: "verified",
    },
  ],
  professional_admissions: [
    {
      court_or_body: "High Court at Calcutta & Subordinate Courts",
      enrolment_number: null,
      year: null,
      standing: "Advocate (~19 Years Practice)",
      jurisdiction: "West Bengal & India",
      verification_status: "verified",
    },
    {
      court_or_body: "Bar Council of West Bengal / Bar Council of India",
      enrolment_number: null,
      year: null,
      standing: "Enrolled Advocate (Advocates Act, 1961)",
      jurisdiction: "India",
      verification_status: "verified",
    },
  ],
  // Public contact channels await owner confirmation; inquiry intake form is active
  chamber_address: null,
  court_chambers: null,
  clerk_contact: null,
  phone: null,
  email: null,
  portrait_image_url: null,
};
