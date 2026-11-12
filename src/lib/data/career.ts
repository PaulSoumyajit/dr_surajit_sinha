import type { CareerMilestone, InstitutionalAppointment } from "@/types";

/**
 * Career Milestones Dataset — Dr. Surajit Sinha
 *
 * Strict Compliance Note (docs/04_CONTENT_REQUIREMENTS.md):
 * Only confirmed professional roles and experiences are presented.
 * To preserve factual integrity, unverified calendar dates or fabricated milestone
 * years are strictly avoided; experience is grouped into verified professional roles.
 */
export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: "milestone-01",
    year: "10 Yrs",
    title: "Public Prosecution Service",
    category: "Prosecution",
    description:
      "A decade of public prosecution service representing the State as Assistant Public Prosecutor (APP), Public Prosecutor (PP), and Sub-Divisional Public Prosecutor across trial and special courts.",
    highlight: true,
    verification_status: "verified",
  },
  {
    id: "milestone-02",
    year: "Charge",
    title: "District POCSO Public Prosecutor-in-Charge",
    category: "Specialized Prosecution",
    description:
      "Held official charge as District POCSO Public Prosecutor, leading state prosecution under the Protection of Children from Sexual Offences Act with rigorous adherence to in-camera trial confidentiality and child safeguarding frameworks.",
    highlight: true,
    verification_status: "verified",
  },
  {
    id: "milestone-03",
    year: "Special",
    title: "District Cyber Crime Public Prosecutor",
    category: "Cyber Prosecution",
    description:
      "Appointed as District Cyber Crime Public Prosecutor and served in Special Public Prosecutor-related capacities for electronic crime proceedings, evaluating electronic evidence and data communications under the Information Technology Act.",
    highlight: true,
    verification_status: "verified",
  },
  {
    id: "milestone-04",
    year: "~19 Yrs",
    title: "Criminal Legal Practice",
    category: "Trial & Appellate",
    description:
      "Approximately 19 years of dedicated criminal trial and appellate advocacy across Birbhum district courts and the High Court at Calcutta, handling complex criminal matters and post-polling proceedings.",
    highlight: true,
    verification_status: "verified",
  },
  {
    id: "milestone-05",
    year: "Practice",
    title: "Civil & Writ Litigation",
    category: "Civil Jurisprudence",
    description:
      "Previous professional experience includes substantial civil litigation before trial and appellate courts, along with constitutional writ petitions before the High Court.",
    verification_status: "verified",
  },
  {
    id: "milestone-06",
    year: "Tribunal",
    title: "Debt Recovery Tribunal Practice (DRT I, II & III)",
    category: "Banking & Recovery",
    description:
      "Extensive representation before Debt Recovery Tribunals I, II, and III in Kolkata, handling complex debt recovery proceedings, loan securitization disputes, and financial-sector litigation.",
    verification_status: "verified",
  },
  {
    id: "milestone-07",
    year: "5 Yrs",
    title: "Jalan & Jalan Solicitor Firm, Kolkata",
    category: "Solicitor Practice",
    description:
      "Five years of professional engagement with premier solicitor firm Jalan & Jalan, Kolkata, focusing on banking-sector legal work, DRT proceedings, corporate documentation, and Registrar of Companies (ROC) matters.",
    verification_status: "verified",
  },
  {
    id: "milestone-08",
    year: "Faculty",
    title: "Lecturer — Barrackpore Training College",
    category: "Academic & Teaching",
    description:
      "Academic and teaching experience as a Lecturer at Barrackpore Training College, contributing to higher educational instruction and scholarly discourse.",
    verification_status: "verified",
  },
  {
    id: "milestone-09",
    year: "Audit",
    title: "Accountancy & Financial-Sector Exposure",
    category: "Financial Diligence",
    description:
      "Historical accountancy and audit engagement with SBA Associates CA Firm, Kolkata, including audit exposure relating to UTI/Axis Bank, IFB Agro, and various public and cooperative banking institutions.",
    verification_status: "verified",
  },
];

/**
 * Notable Institutional Appointments & Advisory Roles
 *
 * Strict Compliance Note (docs/04_CONTENT_REQUIREMENTS.md):
 * Lists verified public prosecution roles and documented institutional advisory associations.
 */
export const NOTABLE_APPOINTMENTS: InstitutionalAppointment[] = [
  {
    id: "appt-01",
    appointing_authority: "Government of West Bengal / District Administration",
    role_or_capacity: "District POCSO Public Prosecutor-in-Charge",
    tenure: "Previous Appointment",
    jurisdiction_or_scope: "District POCSO Court, Birbhum",
    verification_status: "verified",
  },
  {
    id: "appt-02",
    appointing_authority: "Government of West Bengal / District Administration",
    role_or_capacity: "District Cyber Crime Public Prosecutor",
    tenure: "Previous Appointment",
    jurisdiction_or_scope: "Cybercrime Prosecution & Special PP Matters",
    verification_status: "verified",
  },
  {
    id: "appt-03",
    appointing_authority: "State of West Bengal / Prosecution Directorate",
    role_or_capacity: "Sub-Divisional Public Prosecutor & APP/PP",
    tenure: "10 Years Cumulative Service",
    jurisdiction_or_scope: "Sub-Divisional & District Criminal Courts",
    verification_status: "verified",
  },
  {
    id: "appt-04",
    appointing_authority: "Barrackpore Training College",
    role_or_capacity: "Lecturer",
    tenure: "Previous Academic Appointment",
    jurisdiction_or_scope: "College Academic Instruction",
    verification_status: "verified",
  },
  {
    id: "appt-05",
    appointing_authority: "Jalan & Jalan Solicitor Firm, Kolkata",
    role_or_capacity: "Legal Associate (Banking, DRT & Corporate)",
    tenure: "5 Years Engagement",
    jurisdiction_or_scope: "DRT I, II, III & High Court Matters",
    verification_status: "verified",
  },
  {
    id: "appt-06",
    appointing_authority: "Regional & Institutional Bodies (TRDA, Rampurhat Municipality, etc.)",
    role_or_capacity: "Reported Legal Advisory Associations",
    tenure: "CV-Reported Advisory Associations",
    jurisdiction_or_scope: "Municipal, Panchayat & Regional Authorities",
    verification_status: "verified",
  },
];
