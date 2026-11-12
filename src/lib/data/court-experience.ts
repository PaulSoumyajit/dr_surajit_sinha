import type { CourtExperienceItem } from "@/types";

/**
 * Court & Prosecution Experience Repository
 * Dr. Surajit Sinha — Advocate, High Court & Lower Courts
 *
 * Source: docs/CONTENT_VERIFICATION_REGISTER.md & Candidate CV
 *
 * Strict Compliance:
 * - No fake case citations (SCC/AIR), fictional ratios, or invented outcomes.
 * - Factual documentation of court admissions, prosecution appointments, tribunal representations,
 *   and confirmed senior counsel collaborations.
 */
export const COURT_EXPERIENCE_ITEMS: CourtExperienceItem[] = [
  {
    id: "exp-public-prosecution",
    title: "Public Prosecution & State Representation",
    forum: "Sub-Divisional & District Criminal Courts",
    role: "Assistant Public Prosecutor (APP) & Public Prosecutor (PP)",
    tenure: "Approx. 10 Years Service",
    category: "prosecution",
    description:
      "Extensive state prosecution tenure conducting criminal trials, examining witnesses, arguing bail and remand applications, formulating charges, and presenting official prosecution briefs in accordance with statutory duties under the Code of Criminal Procedure.",
    statutory_basis: [
      "Section 24 & 25, Code of Criminal Procedure, 1973 (CrPC)",
      "Indian Penal Code, 1860 (IPC)",
      "Indian Evidence Act, 1872",
    ],
  },
  {
    id: "exp-pocso-proceedings",
    title: "Special POCSO Court Proceedings",
    forum: "Special Courts under the POCSO Act",
    role: "District POCSO Public Prosecutor-in-Charge",
    tenure: "Dedicated Public Prosecution Charge",
    category: "prosecution",
    description:
      "Management and presentation of prosecution cases involving offenses under the POCSO Act. Strict observance of child-friendly procedures, in-camera trials, victim privacy safeguards under Section 33, and rigorous evidentiary compliance under special statutory mandates.",
    statutory_basis: [
      "Protection of Children from Sexual Offences (POCSO) Act, 2012",
      "Sections 24, 33 & 35, POCSO Act (In-Camera & Child Safeguards)",
      "Juvenile Justice (Care and Protection of Children) Act, 2015",
    ],
  },
  {
    id: "exp-cybercrime-prosecution",
    title: "Cybercrime Prosecution & Electronic Evidence",
    forum: "Special Cyber Crime Courts & Magistrate Benches",
    role: "District Cyber Crime Public Prosecutor & Special Public Prosecutor (SPP)",
    tenure: "Designated Cybercrime Charge",
    category: "cyber",
    description:
      "Handling public prosecution in complex electronic crime cases including phishing, online financial fraud, computer tampering, identity theft, and unauthorized network intrusion. Evaluating technical forensic reports, server logs, and supervising compliance with electronic evidence certification under Section 65B.",
    statutory_basis: [
      "Information Technology Act, 2000 (Sections 43, 65, 66, 66C, 66D, 66E)",
      "Section 65B, Indian Evidence Act, 1872 (Electronic Evidence Certificate)",
      "Indian Penal Code Cyber-fraud Sections (419, 420, 468, 471)",
    ],
  },
  {
    id: "exp-criminal-trials",
    title: "Criminal Trial & Defense Litigation",
    forum: "Sessions Courts, Chief Judicial Magistrate Courts & High Court",
    role: "Advocate & Defense Counsel",
    tenure: "Approx. 19 Years Criminal Practice",
    category: "criminal-trial",
    description:
      "Substantive trial practice encompassing sessions trials, warrant cases, summons cases, regular bail applications under Section 439, anticipatory bail under Section 438, and criminal revisions. Strategic cross-examination, evidentiary evaluation, and procedural safeguard advocacy.",
    statutory_basis: [
      "Code of Criminal Procedure, 1973 (Bail, Trial & Revisions)",
      "Indian Penal Code, 1860",
      "Arms Act, NDPS Act & Related Special Penal Laws",
    ],
  },
  {
    id: "exp-drt-banking",
    title: "Debt Recovery Tribunal (DRT I, II & III) Practice",
    forum: "Debt Recovery Tribunals (DRT-I, DRT-II & DRT-III, Kolkata)",
    role: "Advocate / Counsel",
    tenure: "Tribunal Practice & 5 Years Solicitor Association",
    category: "drt",
    description:
      "Appearing before Debt Recovery Tribunals in matters arising under the Recovery of Debts and Bankruptcy Act (RDBA) and the SARFAESI Act. Drafting and arguing Securitisation Applications (S.A.) under Section 17, interim restraint petitions, and loan recovery disputes.",
    statutory_basis: [
      "Recovery of Debts and Bankruptcy Act, 1993 (RDBA)",
      "Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest (SARFAESI) Act, 2002",
      "Security Interest (Enforcement) Rules, 2002",
    ],
  },
  {
    id: "exp-civil-writ",
    title: "Civil Litigation & High Court Writ Jurisdiction",
    forum: "High Court of Judicature & Subordinate Civil Courts",
    role: "Advocate — High Court & Lower Courts",
    tenure: "Active Court Practice",
    category: "civil-writ",
    description:
      "Filing and arguing writ petitions under Article 226 of the Constitution of India challenging arbitrary administrative orders, police inaction, or statutory authority non-compliance. Conducting title suits, injunction proceedings, money suits, and civil appeals before district civil benches.",
    statutory_basis: [
      "Article 226, Constitution of India (Writ Petitions)",
      "Code of Civil Procedure, 1908 (CPC)",
      "Specific Relief Act, 1963",
    ],
  },
  {
    id: "exp-land-revenue",
    title: "Land & Revenue Matters",
    forum: "BLLRO, DLLRO & Land Reforms Tenancy (LRT) Authorities",
    role: "Counsel / Legal Representative",
    tenure: "Administrative & Revenue Practice",
    category: "land-revenue",
    description:
      "Handling land-related disputes, mutation proceedings, title verification, conversion applications, and tenancy issues before the Block Land and Land Reforms Officer (BLLRO), District Land and Land Reforms Officer (DLLRO), and appellate revenue tribunals.",
    statutory_basis: [
      "West Bengal Land Reforms Act, 1955",
      "West Bengal Estates Acquisition Act, 1953",
      "West Bengal Land Reforms and Tenancy Tribunal Act, 1997",
    ],
  },
  {
    id: "exp-senior-collaborations",
    title: "Professional Senior Counsel Collaborations",
    forum: "High Court of Judicature & Debt Recovery Tribunals",
    role: "Professional Legal Collaboration",
    tenure: "Historical Matter Engagements",
    category: "collaboration",
    description:
      "Reported professional association and matter collaboration with eminent senior members of the Bar: High Court matters with Senior Counsel Laxminarayan Jalan; Debt Recovery Tribunal proceedings with Senior Counsel Ajit Kumar Panja; and proceedings in the Tarapith Electric Crematorium matter with Senior Advocate Shaktinath Chatterjee.",
    statutory_basis: [
      "Advocates Act, 1961 (Counsel Collaboration Protocols)",
      "Bar Council of India Professional Ethics Standards",
    ],
  },
];

