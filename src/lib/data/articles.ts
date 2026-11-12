import type { Article, Category } from "@/types";
import { createClient } from "@/lib/supabase/server";

/**
 * Editorial Taxonomy Categories
 * Maps to public.categories schema
 */
export const CATEGORIES: Category[] = [
  {
    id: "cat-criminal-law",
    name: "Criminal Law & Procedure",
    slug: "criminal-law",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-public-prosecution",
    name: "Public Prosecution",
    slug: "public-prosecution",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-cyber-law",
    name: "Cyber Law & Digital Evidence",
    slug: "cyber-law",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-pocso",
    name: "POCSO & Safeguarding",
    slug: "pocso",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-civil-writ",
    name: "Constitutional & Writ Jurisdiction",
    slug: "civil-writ",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-banking-drt",
    name: "Banking & DRT Proceedings",
    slug: "banking-drt",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-land-revenue",
    name: "Land & Revenue Matters",
    slug: "land-revenue",
    created_at: "2026-01-01T00:00:00Z",
  },
];

/**
 * Editorial Insights, Essays & Commentary
 *
 * Strict Compliance Note (docs/04_CONTENT_REQUIREMENTS.md):
 * Factual integrity & approval requirement:
 * All new articles prepared as research drafts remain strictly marked as 'draft'
 * until formally reviewed and approved for publication by Dr. Surajit Sinha.
 * Public listing only presents articles with status === 'published'.
 */
export const ARTICLES: Article[] = [
  {
    id: "art-01",
    category_id: "cat-public-prosecution",
    title: "Role and Ethical Responsibilities of a Public Prosecutor in Criminal Proceedings",
    slug: "role-of-public-prosecutor-criminal-proceedings",
    excerpt:
      "An analytical examination of the statutory duties of a Public Prosecutor under Section 24 of the CrPC, balancing impartial evidence presentation against adversarial zeal.",
    content_md: `## Introduction

Under the Indian criminal justice system, the Public Prosecutor occupies a unique and constitutionally sensitive position. Appointed under Section 24 of the Code of Criminal Procedure, 1973 (and corresponding provisions of the Bharatiya Nagarik Suraksha Sanhita), the prosecutor represents not a private complainant, but the State as the guardian of public safety.

## The Impartial Minister of Justice

As observed by the Supreme Court in *Shiv Kumar v. Hukam Chand (1999)*, a Public Prosecutor is not an advocate for an individual party, but an officer of the court whose overarching obligation is to assist the court in arriving at truth. The prosecutor does not measure success by conviction rates, but by the integrity with which the trial is conducted.

### Core Statutory Touchpoints
1. **Separation of Investigation and Prosecution:** Investigation remains the exclusive preserve of police authorities, while prosecution evaluates whether the collected material establishes a prima facie case.
2. **Duty of Disclosure:** Evidentiary fairness requires that exculpatory material discovered during investigation is not suppressed.
3. **Withdrawal from Prosecution (Section 321 CrPC):** The prosecutor must exercise independent discretion when seeking withdrawal, serving public interest rather than mechanical administrative directives.

## Conclusion

The dignity of criminal justice hinges on prosecutors who act with detachment, statutory fidelity, and unwavering commitment to due process.`,
    cover_image_url: "/images/practice/appellate-advocacy.jpg",
    reading_time_min: 7,
    status: "draft",
    published_at: null,
    created_at: "2026-01-15T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "art-02",
    category_id: "cat-cyber-law",
    title: "Admissibility of Electronic Records: The Section 65B Certification Framework",
    slug: "admissibility-electronic-records-section-65b",
    excerpt:
      "A doctrinal review of statutory requirements for proving electronic evidence in Indian courts following the landmark ruling in Arjun Panditrao Khotkar.",
    content_md: `## The Digital Transition in Criminal Trials

As criminal offenses and commercial disputes increasingly involve digital communications, server logs, mobile messaging, and CCTV footage, the evidentiary admissibility of computer outputs has become central to litigation practice.

## The Mandatory Nature of Certification

The Supreme Court bench in *Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020)* conclusively resolved divergent precedents concerning Section 65B of the Indian Evidence Act, 1872:
- Production of a Section 65B(4) certificate is a condition precedent to the admissibility of secondary electronic records.
- Oral testimony cannot substitute for the statutory written certificate.
- The certificate must identify the electronic record, describe the manner of its creation, and verify the lawful control and operational integrity of the computer device.

## Evidentiary Preservation Protocols

Practitioners must ensure forensic chain-of-custody protocols are documented from the earliest stage of digital complaint lodging to withstand cross-examination.`,
    cover_image_url: "/images/practice/corporate-advisory.jpg",
    reading_time_min: 8,
    status: "draft",
    published_at: null,
    created_at: "2026-01-20T00:00:00Z",
    updated_at: "2026-01-20T00:00:00Z",
  },
  {
    id: "art-03",
    category_id: "cat-pocso",
    title: "Procedural Safeguards and Evidentiary Presumptions under the POCSO Act, 2012",
    slug: "pocso-procedural-safeguards-evidentiary-presumptions",
    excerpt:
      "Understanding child-friendly trial procedures, in-camera requirements, and statutory presumptions under Sections 29 and 30 of the POCSO Act.",
    content_md: `## Legislative Intent

The Protection of Children from Sexual Offences (POCSO) Act, 2012, was enacted as special legislation to provide child-centric trial procedures while holding perpetrators strictly accountable under criminal law.

## Child Safeguarding Frameworks
- **In-Camera Trials (Section 33(2)):** Special Courts must conduct proceedings in camera, restricting attendance to essential participants.
- **Recording of Statements (Section 24 & 26):** Evidence is recorded at the child's residence or a place of choice, ensuring the child is not exposed to the accused.
- **Identity Protection (Section 33(7)):** Total confidentiality of the child's identity is statutory and non-negotiable.

## Evidentiary Presumptions and the Defense

Sections 29 and 30 introduce statutory presumptions of guilt and culpable mental state once foundational facts of prosecution are established, requiring defense counsel to mount structured, evidence-grounded rebuttals.`,
    cover_image_url: "/images/practice/process-listen.jpg",
    reading_time_min: 9,
    status: "draft",
    published_at: null,
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "art-04",
    category_id: "cat-banking-drt",
    title: "Interplay Between SARFAESI Measures and Debt Recovery Tribunal Applications",
    slug: "sarfaesi-measures-and-drt-applications",
    excerpt:
      "Procedural analysis of Section 17 appeals before the DRT against measures taken by secured creditors under Section 13(4) of the SARFAESI Act.",
    content_md: `## Dual Statutory Avenues

Financial institutions in India navigate two primary recovery mechanisms: the Recovery of Debts and Bankruptcy Act, 1993 (RDB Act) through original applications before the DRT, and non-adjudicatory enforcement under the SARFAESI Act, 2002.

## Section 17 Jurisdiction of the DRT

When a secured creditor issues notice under Section 13(2) and proceeds to symbolic or physical possession under Section 13(4), any aggrieved person—whether borrower, guarantor, or third-party tenant—may challenge the measures by filing an application under Section 17 before the jurisdictional Debt Recovery Tribunal.

### Key Grounds of Challenge
1. Non-compliance with statutory 60-day notice requirements.
2. Failure to objectively decide Section 13(3A) borrower representations.
3. Irregularity in valuation or reserve price fixation for mortgaged assets.`,
    cover_image_url: "/images/practice/commercial-arbitration.jpg",
    reading_time_min: 7,
    status: "draft",
    published_at: null,
    created_at: "2026-02-10T00:00:00Z",
    updated_at: "2026-02-10T00:00:00Z",
  },
];

/**
 * Synchronous retrieval of local published articles.
 */
export function getPublishedArticles(): Article[] {
  return ARTICLES.filter((article) => article.status === "published");
}

/**
 * Synchronous retrieval of a single local published article by slug.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  const article = ARTICLES.find((a) => a.slug === slug && a.status === "published");
  if (!article) return undefined;

  if (!article.category && article.category_id) {
    const category = CATEGORIES.find((c) => c.id === article.category_id);
    return { ...article, category };
  }

  return article;
}

/**
 * Synchronous retrieval of categories containing local published articles.
 */
export function getPublishedCategories(): Category[] {
  const published = getPublishedArticles();
  const activeCategoryIds = new Set(published.map((a) => a.category_id).filter(Boolean));
  return CATEGORIES.filter((cat) => activeCategoryIds.has(cat.id));
}

/**
 * Synchronous retrieval of local related articles.
 */
export function getRelatedArticles(currentArticle: Article, limit = 3): Article[] {
  if (!currentArticle.category_id) return [];

  return getPublishedArticles()
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        article.category_id === currentArticle.category_id
    )
    .slice(0, limit);
}

// ==============================================================================
// ASYNCHRONOUS DATABASE INTEGRATION (Phase 9 CMS Connected)
// ==============================================================================

/**
 * Asynchronously retrieves published articles from Supabase with local fallback.
 * Strictly excludes draft and archived articles from public consumption.
 */
export async function fetchPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return getPublishedArticles();

    const { data, error } = await supabase
      .from("articles")
      .select("*, category:categories(*)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getPublishedArticles();
    }

    return data as Article[];
  } catch {
    return getPublishedArticles();
  }
}

/**
 * Asynchronously resolves a single published article by its slug from Supabase.
 * Returns undefined if not found or if the article is not published.
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const supabase = await createClient();
    if (!supabase) return getArticleBySlug(slug);

    const { data, error } = await supabase
      .from("articles")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      return getArticleBySlug(slug);
    }

    return data as Article;
  } catch {
    return getArticleBySlug(slug);
  }
}

/**
 * Asynchronously returns only categories that contain at least one published article.
 */
export async function fetchPublishedCategories(): Promise<Category[]> {
  const published = await fetchPublishedArticles();
  if (published.length === 0) return [];

  const activeCategoryIds = new Set(published.map((a) => a.category_id).filter(Boolean));

  try {
    const supabase = await createClient();
    if (!supabase) {
      return CATEGORIES.filter((cat) => activeCategoryIds.has(cat.id));
    }

    const { data } = await supabase.from("categories").select("*");
    if (!data || data.length === 0) {
      return CATEGORIES.filter((cat) => activeCategoryIds.has(cat.id));
    }

    return (data as Category[]).filter((cat) => activeCategoryIds.has(cat.id));
  } catch {
    return CATEGORIES.filter((cat) => activeCategoryIds.has(cat.id));
  }
}

/**
 * Asynchronously recommends published articles related to the current article.
 */
export async function fetchRelatedArticles(
  currentArticle: Article,
  limit = 3
): Promise<Article[]> {
  if (!currentArticle.category_id) return [];

  const published = await fetchPublishedArticles();
  return published
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        article.category_id === currentArticle.category_id
    )
    .slice(0, limit);
}
