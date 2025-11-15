import { render } from "@react-email/components";
import { EmailTemplate } from "./template";
import type { EmailBlock } from "./types";

/**
 * Process rich text HTML to add email-client friendly inline styles
 * Optimized for Outlook compatibility
 */
export function processRichTextForEmail(html: string): string {
  // Add inline styles for common HTML elements to ensure consistent rendering
  let processed = html;

  // Remove empty paragraphs with just <br> (Tiptap adds these for empty lines)
  processed = processed.replace(/<p><br><\/p>/g, "");
  processed = processed.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, "");

  // Style paragraphs - Outlook-specific mso-line-height-rule:exactly forces exact spacing
  // mso-margin-top-alt and mso-margin-bottom-alt help Outlook respect margins
  processed = processed.replace(
    /<p>/g,
    '<p style="margin: 0 0 10px 0; mso-margin-top-alt: 0; mso-margin-bottom-alt: 10px; padding: 0; font-size: 16px; line-height: 1.5; mso-line-height-rule: exactly; color: #484848;">',
  );

  // Style list items - reduce margin for tighter spacing
  processed = processed.replace(
    /<li>/g,
    '<li style="margin: 0 0 6px 0; mso-margin-bottom-alt: 6px; padding: 0; font-size: 16px; line-height: 1.5; mso-line-height-rule: exactly; color: #484848;">',
  );

  // Style unordered lists
  processed = processed.replace(
    /<ul>/g,
    '<ul style="margin: 0 0 10px 0; mso-margin-bottom-alt: 10px; padding: 0 0 0 24px; list-style-position: outside;">',
  );

  // Style ordered lists
  processed = processed.replace(
    /<ol>/g,
    '<ol style="margin: 0 0 10px 0; mso-margin-bottom-alt: 10px; padding: 0 0 0 24px; list-style-position: outside;">',
  );

  // Style links
  processed = processed.replace(
    /<a /g,
    '<a style="color: #3b82f6; text-decoration: underline;" ',
  );

  // Remove the last paragraph's bottom margin to prevent extra spacing
  processed = processed.replace(
    /(<p[^>]*>(?:(?!<\/p>).)*<\/p>)(?![\s\S]*<p)/,
    (match) =>
      match
        .replace(/margin: 0 0 10px 0;/g, "margin: 0;")
        .replace(/mso-margin-bottom-alt: 10px;/g, "mso-margin-bottom-alt: 0;"),
  );

  return processed;
}

export async function generateEmailHTML(
  blocks: EmailBlock[],
  clubName: string,
  brandColor?: string,
  unsubscribeUrl?: string,
): Promise<string> {
  return await render(
    EmailTemplate({
      blocks,
      clubName,
      brandColor,
      unsubscribeUrl,
    }),
  );
}

export function generateDesignJSON(blocks: EmailBlock[]): string {
  return JSON.stringify({ blocks }, null, 2);
}

export function parseDesignJSON(json: string): EmailBlock[] {
  try {
    const parsed: unknown = JSON.parse(json);

    if (!parsed || typeof parsed !== "object") return [];

    const maybe = parsed as { blocks?: unknown };

    if (!maybe.blocks || !Array.isArray(maybe.blocks)) return [];

    return maybe.blocks as EmailBlock[];
  } catch {
    return [];
  }
}
