import { render } from "@react-email/components";
import { EmailTemplate } from "./template";
import type { EmailBlock } from "./types";

export async function generateEmailHTML(
  blocks: EmailBlock[],
  clubName: string,
  unsubscribeUrl?: string
): Promise<string> {
  return await render(
    EmailTemplate({
      blocks,
      clubName,
      unsubscribeUrl,
    })
  );
}

export function generateDesignJSON(blocks: EmailBlock[]): string {
  return JSON.stringify({ blocks }, null, 2);
}

export function parseDesignJSON(json: string): EmailBlock[] {
  try {
    const parsed = JSON.parse(json);
    return parsed.blocks || [];
  } catch {
    return [];
  }
}
