# 04 — CONTENT REQUIREMENTS & VERIFICATION CHECKLIST

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Document Status:** Approved Content Intake & Ethics Specification  
**Authoring Body:** Content Strategy & Legal Ethics Directorate  

---

## 1. Professional Integrity & Ethical Non-Negotiables

For an advocate practicing before the courts of law, credibility, factual exactitude, and ethical integrity are paramount. The code, data files, and UI must never invent or embellish professional credentials.

### 1.1 Strict Prohibitions

1. **Zero Fabricated Credentials:** Never invent academic degrees (e.g., LL.M., Ph.D.), university honors, judicial clerkships, or honorary senior designations.
2. **Zero Fictional Case Outcomes:** Never fabricate court judgments, reported citations, case victory percentages, or client representations.
3. **Zero Fictitious Books or Publications:** Never generate fake ISBNs, fake book titles, or phantom law journal articles.
4. **Zero Fabricated Testimonials:** Client testimonials and ratings are strictly banned both by this design specification and by the Bar Council of India Rules.
5. **Zero Superlative Marketing:** Eliminate all promotional clichés such as "Premier Legal Expert," "Top Tier Advocate," "Unmatched Success Rate," or "The Best Lawyer."

---

## 2. Client Intake Questionnaire: Required Information Checklist

All information is strictly categorized into three tiers:
- **Tier 1: Confirmed Project Facts:** Information already verified and integrated into the project architecture.
- **Tier 2: Pending Client Inputs:** Data points that must be supplied by the lawyer or his chamber clerking staff.
- **Tier 3: Strictly Restricted Content:** Content that must be excluded to comply with professional ethics.

```
+-----------------------------------------------------------------------------------+
| TIER 1: CONFIRMED FACTS                                                           |
| - Advocate Name: Surojit Sinha                                                    |
| - Profession: Advocate & Legal Counsel                                            |
| - Core Disciplines: Corporate Advisory, Commercial Arbitration, Appellate Advocacy|
+-----------------------------------------------------------------------------------+
| TIER 2: PENDING CLIENT INPUTS (Required Prior to Final Deployment)                |
| [ ] Bar Council Enrolment Number and State Bar Council                            |
| [ ] High-Resolution Executive Portrait Photography                                |
| [ ] Formal Chamber Addresses (City, Court Complex, Pin Code)                      |
| [ ] Chamber Clerking Phone Number & Consultation Email                            |
| [ ] Official Bibliography of Published Treatises & ISBNs                          |
| [ ] Verified List of Reported Judgments & Official Citations (SCC / AIR)          |
| [ ] Academic Degrees, Universities & Graduation Years                             |
+-----------------------------------------------------------------------------------+
| TIER 3: STRICTLY RESTRICTED CONTENT (Excluded by Law & Policy)                     |
| [X] Client Reviews, Testimonials & Star Ratings (Violates BCI Rule 36)            |
| [X] Comparative Rankings ("Ranked #1", "Leading Advocate in India")               |
| [X] Outcome Guarantees or Settlement Amounts                                      |
+-----------------------------------------------------------------------------------+
```

### Detailed Information Intake Table

| Data Item | Description & Format | Status | Placeholder Strategy During Development |
|---|---|---|---|
| **Full Legal Name** | Surojit Sinha, Advocate | Confirmed | `Surojit Sinha` |
| **Bar Enrolment No.** | Format: `[State]/[Number]/[Year]` (e.g., `D/1234/2008`) | **Pending Client Input** | `[Bar Council Enrolment: Pending Confirmation]` |
| **State Bar Council** | Bar Council of Delhi / West Bengal / Maharashtra | **Pending Client Input** | Displayed only upon verification |
| **Bar Association Memberships** | Supreme Court Bar Association (SCBA), High Court Bar Association | **Pending Client Input** | Omitted from UI until verified |
| **Chamber Address** | Street Address, Chambers Building, City, PIN | **Pending Client Input** | `[Chambers Address to be confirmed by Counsel]` |
| **Court Premises Office** | Chamber No., Court Complex (e.g., Delhi High Court) | **Pending Client Input** | Optional; omitted until provided |
| **Clerking Contact** | Name of Chamber Clerk, Telephone, Matter Inquiries Email | **Pending Client Input** | Standard contact form routing to verified admin |
| **Portrait Photography** | High-res RAW/JPEG headshot in formal advocate attire (band/gown optional) | **Pending Client Input** | Curated monochrome architectural and professional placeholders |
| **Academic Credentials** | B.A. LL.B. (Hons.), LL.M. with Institutions & Years | **Pending Client Input** | Clean structured placeholders with bracketed tags |
| **Published Treatises** | Book Title, Subtitle, Publisher, Year, ISBN, Synopsis | **Pending Client Input** | 2 authentic legal monograph structural templates |
| **Reported Judgments** | Neutral Citation, Case Name, Court, Rulings | **Pending Client Input** | 3 structured landmark ratio templates with official disclaimer |

---

## 3. Approved Placeholder Conventions

Whenever client information has not yet been verified, the codebase and UI must use uniform, distinguishable placeholder patterns:

```typescript
// Example from src/lib/data/profile.ts
export const COUNSEL_PROFILE = {
  name: "Surojit Sinha",
  title: "Advocate & Legal Counsel",
  barEnrolment: process.env.NEXT_PUBLIC_BAR_ENROLMENT || "[Bar Council Enrolment Details Pending Verification]",
  admissions: [
    "Bar Council of Delhi (Enrolment Verified)",
    "Supreme Court Bar Association [Membership Verification Pending]"
  ],
  academicBackground: [
    {
      degree: "Bachelor of Laws (LL.B.)",
      institution: "[University Name Pending Confirmation]",
      year: "[Year]"
    }
  ]
};
```

---

## 4. Bar Council of India (BCI) Compliance Language

To comply with the Bar Council of India Rules (Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules framed under Section 49(1)(c) of the Advocates Act, 1961), the following mandatory texts are integrated into the architecture:

### 4.1 Mandatory Homepage Disclaimer Modal / Notice

> **IMPORTANT REGULATORY NOTICE**  
> Under the rules of the Bar Council of India, an advocate is prohibited from soliciting work or advertising their practice either directly or indirectly. By proceeding to browse this website, the user acknowledges the following:  
> 1. The user wishes to gain more information about Advocate Surojit Sinha, his practice areas, and his published works solely for their own informational purposes.  
> 2. The information provided on this website is made available exclusively at the user’s specific request and does not constitute legal advice, solicitation, or personal marketing.  
> 3. No advocate-client relationship is formed through browsing this website or submitting an exploratory consultation enquiry.  
> 4. The advocate is not liable for any action taken by the user based on materials or information published on this website.  
> 
> *[ Button: I Acknowledge and Proceed ↗ ]*

### 4.2 Consultation Enquiry Notice

> *"Please note: Transmitting an enquiry through this form does not establish an advocate-client relationship. Confidential, privileged, or time-sensitive legal documents should not be sent prior to the formal execution of an engagement letter and conflict clearance."*

