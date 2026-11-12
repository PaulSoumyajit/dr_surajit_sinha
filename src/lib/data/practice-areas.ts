import type { PracticeArea } from "@/types";

/**
 * Verified Practice Disciplines — Dr. Surajit Sinha
 *
 * Strict Compliance Note (docs/04_CONTENT_REQUIREMENTS.md & BCI Rule 36):
 * Factual, dignified presentation based on counsel's curriculum vitae.
 * Zero superlative or comparative marketing claims.
 */
export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "pa-01",
    slug: "criminal-litigation",
    title: "Criminal Law & Criminal Litigation",
    description:
      "Trial, sessions, and appellate criminal defense and prosecution experience spanning approximately 19 years across Birbhum district courts and the High Court, emphasizing evidentiary discipline and due process.",
    order_index: 1,
    verification_status: "verified",
    statutory_touchpoints: [
      "Code of Criminal Procedure, 1973 (CrPC) / BNSS",
      "Indian Penal Code, 1860 (IPC) / BNS",
      "Indian Evidence Act, 1872 / BSA",
      "Bail & Anticipatory Bail Petitions",
    ],
  },
  {
    id: "pa-02",
    slug: "public-prosecution",
    title: "Public Prosecution",
    description:
      "A decade of public prosecution experience representing the State as Assistant Public Prosecutor (APP), Public Prosecutor (PP), and Sub-Divisional Public Prosecutor across trial and special criminal courts.",
    order_index: 2,
    verification_status: "verified",
    statutory_touchpoints: [
      "State Criminal Prosecution",
      "Sub-Divisional Prosecutor Mandates",
      "Sessions Trials & Inquiries",
      "Criminal Appeals & Revisions",
    ],
  },
  {
    id: "pa-03",
    slug: "pocso-proceedings",
    title: "POCSO Proceedings",
    description:
      "Specialized prosecution experience as District POCSO Public Prosecutor-in-Charge, adhering strictly to child safeguarding frameworks, statutory evidentiary standards, and in-camera confidentiality.",
    order_index: 3,
    verification_status: "verified",
    statutory_touchpoints: [
      "Protection of Children from Sexual Offences (POCSO) Act, 2012",
      "Special Court In-Camera Procedures",
      "Child Protection & Privacy Safeguards",
      "Evidentiary & Forensic Protocols",
    ],
  },
  {
    id: "pa-04",
    slug: "cyber-law",
    title: "Cybercrime & Cyber Law",
    description:
      "Distinctive legal domain combining law and technology, grounded in a doctoral thesis in Cyber Law and E-commerce, technical certifications in ethical hacking and networking, and experience as District Cyber Crime Public Prosecutor.",
    order_index: 4,
    verification_status: "verified",
    statutory_touchpoints: [
      "Information Technology Act, 2000",
      "Section 65B Electronic Evidence Certification",
      "E-Commerce & Digital Contract Regulations",
      "Cyber Offenses & Data Protection",
    ],
  },
  {
    id: "pa-05",
    slug: "civil-writ-proceedings",
    title: "Civil & Writ Proceedings",
    description:
      "Advocacy and briefcraft in civil suits, title disputes, injunction applications, and constitutional writ petitions before the High Court and subordinate civil courts.",
    order_index: 5,
    verification_status: "verified",
    statutory_touchpoints: [
      "Code of Civil Procedure, 1908 (CPC)",
      "Constitution of India (Articles 226 & 227)",
      "Specific Relief Act, 1963",
      "Transfer of Property Act, 1882",
    ],
  },
  {
    id: "pa-06",
    slug: "banking-drt",
    title: "Banking & Debt Recovery Tribunal Matters",
    description:
      "Experienced representation before Debt Recovery Tribunals (DRT I, II, and III), encompassing recovery proceedings, securitization disputes, and financial-sector litigation shaped by solicitor firm practice.",
    order_index: 6,
    verification_status: "verified",
    statutory_touchpoints: [
      "Recovery of Debts and Bankruptcy Act, 1993",
      "SARFAESI Act, 2002",
      "DRT I, II & III Tribunal Procedure",
      "Negotiable Instruments Act (Section 138)",
    ],
  },
  {
    id: "pa-07",
    slug: "land-revenue",
    title: "Land & Revenue Matters",
    description:
      "Substantive experience in West Bengal land laws, revenue proceedings, title verification, and administrative tribunals including BLLRO, DLLRO, and LRT forums.",
    order_index: 7,
    verification_status: "verified",
    statutory_touchpoints: [
      "West Bengal Land Reforms Act, 1955",
      "BLLRO & DLLRO Revenue Proceedings",
      "Land Reforms Tenancy Tribunal (LRT)",
      "Record of Rights (RoR) & Mutation Matters",
    ],
  },
  {
    id: "pa-08",
    slug: "corporate-institutional",
    title: "Corporate & Institutional Legal Matters",
    description:
      "Secondary advisory discipline covering corporate filings, commercial documentation, ROC compliance, and past legal advisory associations with public and regional institutions.",
    order_index: 8,
    verification_status: "verified",
    statutory_touchpoints: [
      "Companies Act, 2013",
      "Registrar of Companies (ROC) Filings",
      "Commercial Contracts & Covenants",
      "Institutional Legal Advisory",
    ],
  },
];
