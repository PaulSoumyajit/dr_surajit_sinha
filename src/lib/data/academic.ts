import type { AcademicQualification, TechnicalCertification } from "@/types";

/**
 * Verified Academic Degrees & Research Disciplines
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Source: docs/CONTENT_VERIFICATION_REGISTER.md & Candidate CV
 * Strict Compliance:
 * - PhD is awarded and confirmed by owner. "Dr." title retained.
 * - Awarding university and year are omitted without public placeholders.
 * - All qualifications are verified and documented.
 */
export const DOCTORAL_AND_DEGREES: AcademicQualification[] = [
  {
    degree: "Doctor of Philosophy (PhD)",
    specialisation: "Cyber Law and E-commerce",
    honors: "Doctoral Research",
    verification_status: "verified",
  },
  {
    degree: "Master of Laws (LL.M.)",
    specialisation: "Postgraduate Legal Jurisprudence & Evidentiary Standards",
    verification_status: "verified",
  },
  {
    degree: "Master of Computer Applications (MCA)",
    specialisation: "Systems Architecture, Network Engineering & Computing",
    verification_status: "verified",
  },
  {
    degree: "Master of Commerce (M.Com.)",
    specialisation: "Advanced Commercial Accounts & Corporate Governance",
    verification_status: "verified",
  },
  {
    degree: "Bachelor of Laws (LL.B.)",
    specialisation: "Core Legal Qualification (Advocates Act, 1961)",
    verification_status: "verified",
  },
  {
    degree: "Bachelor of Commerce (B.Com. Honours)",
    specialisation: "Financial Accounting, Corporate Law & Commercial Systems",
    verification_status: "verified",
  },
];

/**
 * Technical Certifications & Specialised Qualifications
 * Source: Candidate CV & Content Verification Register
 */
export const TECHNICAL_CERTIFICATIONS: TechnicalCertification[] = [
  {
    id: "cert-ethical-hacking",
    title: "Diploma in Ethical Hacking & Cyber Security",
    category: "Cyber & IT",
    issuer: "Cyber Security Institute",
    description:
      "Advanced training in penetration testing concepts, vulnerability assessment, cyber security architecture, digital system exploitation methodologies, and countermeasure implementation.",
    date_or_period: "Professional Training",
  },
  {
    id: "cert-ccna",
    title: "CCNA++ Certification",
    category: "Cyber & IT",
    issuer: "Cisco Systems Curriculum",
    description:
      "Comprehensive networking curriculum covering routing, switching, packet inspection, network protocols (TCP/IP), and network infrastructure security.",
    date_or_period: "Professional Certification",
  },
  {
    id: "cert-tally-guru",
    title: "Tally Guru Certification",
    category: "Commerce & Finance",
    issuer: "Tally Solutions",
    description:
      "Expert-level computerized accounting, corporate ledger reconciliation, GST compliance modules, inventory control, and enterprise financial records.",
    date_or_period: "Specialised Certification",
  },
  {
    id: "cert-ca-pe2",
    title: "CA PE-2 (Group 1)",
    category: "Commerce & Finance",
    issuer: "The Institute of Chartered Accountants of India (ICAI)",
    description:
      "Intermediate chartered accountancy examination covering advanced accounting, corporate law, auditing practices, and direct taxation.",
    date_or_period: "Professional Examination",
  },
  {
    id: "cert-dca",
    title: "Diploma in Computer Application (DCA)",
    category: "Cyber & IT",
    issuer: "Computer Education Centre",
    description:
      "Foundational computer applications curriculum covering software utilities, database operations, operating systems, and digital data handling.",
    date_or_period: "Diploma Qualification",
  },
  {
    id: "cert-lan-hardware",
    title: "Hardware, Software & LAN Networking Training",
    category: "Cyber & IT",
    issuer: "Technical Training Institute",
    description:
      "Practical hardware maintenance, component diagnostic protocols, LAN topology installation, network cabling, and systems administration.",
    date_or_period: "Technical Curriculum",
  },
  {
    id: "cert-niit",
    title: "NIIT Professional Training",
    category: "Cyber & IT",
    issuer: "National Institute of Information Technology",
    description:
      "Structured information technology coursework covering algorithmic logic, programming foundations, and database concepts.",
    date_or_period: "Professional Coursework",
  },
  {
    id: "appointment-teaching",
    title: "Lecturer — Commercial & Legal Studies",
    category: "Academic Teaching",
    issuer: "Barrackpore Training College",
    description:
      "Instruction in commercial principles, foundational legal frameworks, and regulatory systems delivered to college students.",
    date_or_period: "Academic Appointment",
  },
];

/**
 * Key Research & Doctrinal Themes
 */
export const RESEARCH_THEMES = [
  {
    id: "theme-cyber-jurisprudence",
    title: "Cyber Jurisprudence & E-Commerce Regulations",
    description:
      "Doctrinal analysis of commercial transactions executed via electronic mediums, consumer protection in digital marketplaces, and intermediary liability under the Information Technology Act.",
  },
  {
    id: "theme-electronic-evidence",
    title: "Electronic Records & Section 65B Admissibility",
    description:
      "Procedural standards governing computer output, hash integrity, electronic certificate requirements, and chain-of-custody protocols under Indian evidence law.",
  },
  {
    id: "theme-criminal-procedure",
    title: "Procedural Fairness in Criminal Trials & Prosecution",
    description:
      "Institutional role of the prosecution under Section 24 of the Code of Criminal Procedure, evidentiary burdens, and statutory compliance in special court trials.",
  },
  {
    id: "theme-banking-recovery",
    title: "Debt Recovery Tribunals & Statutory Secured Creditors",
    description:
      "Analysis of securitisation applications under Section 17 of SARFAESI, recovery proceedings before DRT benches, and due process in classification of non-performing assets.",
  },
];

