import React from "react";
import { cn } from "@/lib/utils";

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Generates a stable, URL-friendly slug ID for headings.
 * Shared between MarkdownRenderer and ArticleToc to guarantee matching anchor targets.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Sanitizes URLs to reject dangerous protocols like javascript: or vbscript:.
 * Only allows http:, https:, mailto:, tel:, relative paths (/), or hash anchors (#).
 */
export function sanitizeUrl(url: string): string | null {
  const trimmed = url.trim();
  if (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  return null;
}

/**
 * Secure inline Markdown parser.
 * Converts bold (**text**), italic (*text*), inline code (`code`),
 * footnotes ([^1]), and safe links ([text](url)) into React elements.
 * Never uses dangerouslySetInnerHTML.
 */
export function renderInlineContent(text: string): React.ReactNode {
  // Regex to match markdown links, bold, italic, code, and footnote refs
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[\^(\d+)\])/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Add text preceding the match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const [fullMatch, , linkText, linkUrl, boldText, italicText, codeText, footnoteRef] = match;

    if (linkText && linkUrl) {
      const safeUrl = sanitizeUrl(linkUrl);
      if (safeUrl) {
        const isExternal = safeUrl.startsWith("http://") || safeUrl.startsWith("https://");
        elements.push(
          <a
            key={match.index}
            href={safeUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-forest font-medium underline underline-offset-4 decoration-forest/40 hover:decoration-forest hover:text-forest-deep transition-colors"
          >
            {renderInlineContent(linkText)}
          </a>
        );
      } else {
        // Fallback to plain text if URL is rejected by sanitizer
        elements.push(linkText);
      }
    } else if (boldText) {
      elements.push(
        <strong key={match.index} className="font-semibold text-charcoal">
          {renderInlineContent(boldText)}
        </strong>
      );
    } else if (italicText) {
      elements.push(
        <em key={match.index} className="italic text-charcoal/90">
          {renderInlineContent(italicText)}
        </em>
      );
    } else if (codeText) {
      elements.push(
        <code
          key={match.index}
          className="font-mono text-xs bg-stone-subtle px-1.5 py-0.5 rounded text-forest font-medium"
        >
          {codeText}
        </code>
      );
    } else if (footnoteRef) {
      elements.push(
        <sup key={match.index} className="ml-0.5">
          <a
            href={`#fn-${footnoteRef}`}
            className="text-forest font-mono text-xs hover:underline"
            aria-label={`Footnote ${footnoteRef}`}
          >
            [{footnoteRef}]
          </a>
        </sup>
      );
    } else {
      elements.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length === 1 ? elements[0] : elements;
}

/**
 * Secure Markdown Content Renderer (P7-04)
 *
 * Server-rendered, XSS-immune Markdown processor:
 * - Parses article markdown into semantic React elements with editorial legal typography.
 * - Legal blockquotes styled as warm parchment callouts with deep forest left rule.
 * - Headings assigned unique, stable anchor IDs identical to ArticleToc.
 * - Footnotes formatted into clean numbered citations.
 * - Zero dangerouslySetInnerHTML; strictly sanitized URLs.
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let blockIndex = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(---|___|\*\*\*)$/.test(line.trim())) {
      blocks.push(
        <hr key={`hr-${blockIndex++}`} className="my-10 border-border-subtle" />
      );
      i++;
      continue;
    }

    // Code Blocks (```)
    if (line.trim().startsWith("```")) {
      const language = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      blocks.push(
        <div
          key={`code-${blockIndex++}`}
          className="my-6 rounded-xl overflow-hidden border border-border-subtle bg-surface-card p-4 sm:p-5"
        >
          {language && (
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-slate mb-2">
              {language}
            </div>
          )}
          <pre className="font-mono text-xs sm:text-sm text-charcoal overflow-x-auto leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Headings (##, ###, ####)
    if (line.startsWith("#### ")) {
      const text = line.slice(5).trim();
      const id = slugifyHeading(text);
      blocks.push(
        <h4
          key={`h4-${blockIndex++}`}
          id={id}
          className="font-serif text-lg sm:text-xl font-medium text-charcoal mt-8 mb-3 tracking-tight scroll-mt-28"
        >
          {renderInlineContent(text)}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      const id = slugifyHeading(text);
      blocks.push(
        <h3
          key={`h3-${blockIndex++}`}
          id={id}
          className="font-serif text-xl sm:text-2xl font-normal text-charcoal mt-10 mb-4 tracking-tight scroll-mt-28"
        >
          {renderInlineContent(text)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      const id = slugifyHeading(text);
      blocks.push(
        <h2
          key={`h2-${blockIndex++}`}
          id={id}
          className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-charcoal mt-12 mb-5 tracking-tight leading-snug scroll-mt-28 border-b border-border-subtle/60 pb-3"
        >
          {renderInlineContent(text)}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote (>)
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const quoteText = quoteLines.join(" ");
      const isCallout = quoteText.startsWith("[!NOTE]") || quoteText.startsWith("**Statutory Note:**");

      blocks.push(
        <blockquote
          key={`quote-${blockIndex++}`}
          className={cn(
            "my-8 p-6 sm:p-7 rounded-2xl border-l-4 leading-relaxed font-serif",
            isCallout
              ? "bg-surface-card border-forest text-charcoal shadow-xs font-sans text-sm sm:text-base"
              : "bg-parchment/60 border-forest text-charcoal/90 italic text-base sm:text-lg"
          )}
        >
          <p className="m-0">{renderInlineContent(quoteText.replace(/^\[!NOTE\]\s?/, ""))}</p>
        </blockquote>
      );
      continue;
    }

    // Unordered List (- or *)
    if (/^\s*[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul
          key={`ul-${blockIndex++}`}
          className="my-6 space-y-2.5 pl-6 list-disc list-outside text-charcoal/80 font-sans text-base sm:text-[17px] leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInlineContent(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List (1. )
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol
          key={`ol-${blockIndex++}`}
          className="my-6 space-y-2.5 pl-6 list-decimal list-outside text-charcoal/80 font-sans text-base sm:text-[17px] leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInlineContent(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Footnote definition ([^1]: note)
    if (/^\[\^(\d+)\]:\s*(.+)/.test(line)) {
      const footnoteLines: { id: string; text: string }[] = [];
      while (i < lines.length && /^\[\^(\d+)\]:\s*(.+)/.test(lines[i])) {
        const match = lines[i].match(/^\[\^(\d+)\]:\s*(.+)/);
        if (match) {
          footnoteLines.push({ id: match[1], text: match[2] });
        }
        i++;
      }
      blocks.push(
        <div
          key={`footnotes-${blockIndex++}`}
          className="mt-12 pt-6 border-t border-border-subtle/80 space-y-2 text-xs font-sans text-charcoal/70"
        >
          <div className="font-semibold uppercase tracking-wider text-forest text-[11px] mb-2">
            Footnotes &amp; Authorities Cited
          </div>
          {footnoteLines.map((fn) => (
            <div key={fn.id} id={`fn-${fn.id}`} className="flex items-start gap-2">
              <span className="font-mono text-forest font-semibold">{fn.id}.</span>
              <p className="m-0 leading-relaxed">{renderInlineContent(fn.text)}</p>
            </div>
          ))}
        </div>
      );
      continue;
    }

    // Standard Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("```") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\[\^(\d+)\]:/.test(lines[i]) &&
      !/^(---|___|\*\*\*)$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    const paraText = paragraphLines.join(" ");
    blocks.push(
      <p
        key={`p-${blockIndex++}`}
        className="my-5 font-sans text-base sm:text-[17px] leading-[1.8] text-charcoal/85 tracking-normal"
      >
        {renderInlineContent(paraText)}
      </p>
    );
  }

  return (
    <div className={cn("editorial-reading-body max-w-prose", className)}>
      {blocks}
    </div>
  );
}
