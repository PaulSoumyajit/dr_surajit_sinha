import type { FAQ } from "@/types";

/**
 * Legally Researched Practice Guidance FAQs
 *
 * Adheres strictly to Bar Council of India Rule 36:
 * Provides general educational information regarding court processes, statutes,
 * and procedural frameworks under Indian law without constituting personalized legal advice.
 */
export const PRACTICE_FAQS: FAQ[] = [
  {
    id: "faq-01",
    question: "What is the role and responsibility of a Public Prosecutor under Indian law?",
    answer:
      "A Public Prosecutor is an officer of the court appointed under the Code of Criminal Procedure (Section 24 CrPC / BNSS) to represent the State in criminal trials and appeals. Unlike defense counsel, a Public Prosecutor's primary duty is not to secure a conviction at all costs, but to assist the court in arriving at truth and justice by placing all credible evidence impartially before the bench.",
    category: "Criminal Law & Prosecution",
    order_index: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-02",
    question: "What is the difference between an Assistant Public Prosecutor (APP) and a Public Prosecutor (PP)?",
    answer:
      "Under Section 25 of the CrPC, Assistant Public Prosecutors (APPs) are appointed by the State Government to conduct prosecutions primarily in the Courts of Magistrates. Public Prosecutors (PPs) and Additional Public Prosecutors (appointed under Section 24 CrPC) conduct prosecutions in the Courts of Session, Special Courts, and High Courts.",
    category: "Criminal Law & Prosecution",
    order_index: 2,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-03",
    question: "What is the purpose and framework of the POCSO Act, 2012?",
    answer:
      "The Protection of Children from Sexual Offences (POCSO) Act, 2012, was enacted to protect children from sexual assault, harassment, and pornography, establishing Special Courts for trial. The Act mandates child-friendly procedures, in-camera trials, recording of statements without the child coming into contact with the accused, strict confidentiality of the victim's identity (Section 33(7)), and statutory presumptions under Sections 29 and 30.",
    category: "POCSO & Safeguarding",
    order_index: 3,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-04",
    question: "What constitutes cybercrime and electronic evidence under Indian law?",
    answer:
      "Cybercrimes encompass unauthorized access, data alteration, cyber fraud, identity theft, and transmission of obscene content penalized under Chapters IX and XI of the Information Technology Act, 2000, and corresponding provisions of the criminal code. For digital records (emails, server logs, CCTV, messaging) to be admissible in court, strict certification under Section 65B of the Indian Evidence Act (now Section 63 of Bharatiya Sakshya Adhiniyam) is mandatory as affirmed by the Supreme Court in Arjun Panditrao Khotkar (2020).",
    category: "Cyber Law & Digital Evidence",
    order_index: 4,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-05",
    question: "What is a Debt Recovery Tribunal (DRT) proceeding?",
    answer:
      "Debt Recovery Tribunals (DRT I, II, III) were established under the Recovery of Debts and Bankruptcy Act, 1993, to adjudicate debt recovery claims filed by banks and financial institutions above statutory monetary thresholds. DRTs also possess appellate jurisdiction under Section 17 of the SARFAESI Act, 2002, to hear borrower challenges against enforcement actions such as possession notices or property auctions.",
    category: "Banking & DRT",
    order_index: 5,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-06",
    question: "What is a writ petition under Article 226 of the Constitution of India?",
    answer:
      "Article 226 empowers High Courts to issue prerogative writs—such as Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari—for the enforcement of Fundamental Rights or for any other purpose against administrative arbitrariness, statutory violations, or jurisdictional excess by public authorities and State instrumentalities.",
    category: "Constitutional & Writ Jurisdiction",
    order_index: 6,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "faq-07",
    question: "What kinds of matters fall within West Bengal land and revenue proceedings?",
    answer:
      "Land and revenue proceedings in West Bengal are primarily governed by the West Bengal Land Reforms Act, 1955. Matters encompass record of rights (RoR) corrections, plot mutations, ceiling limit determinations, barga (sharecropper) recordings, and conversion petitions heard before Block Land and Land Reforms Officers (BLLRO), District Land and Land Reforms Officers (DLLRO), and appellate challenges before the West Bengal Land Reforms and Tenancy Tribunal (LRT).",
    category: "Land & Revenue Matters",
    order_index: 7,
    created_at: "2026-01-01T00:00:00Z",
  },
];

