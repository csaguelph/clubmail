/**
 * Preview utilities for placeholders
 * Wraps placeholders in styled pills/badges for visual indication in preview mode
 */

/**
 * Wrap placeholders in styled pills for preview
 * This only affects the preview HTML, not the actual email HTML
 */
export function wrapPlaceholdersForPreview(html: string): string {
  // Match placeholders in the format: {{.Variable}} or {{.Variable || "default"}}
  const placeholderRegex = /\{\{\.([\w.]+(?:\s*\|\|\s*["'][^"']*["'])?)\}\}/g;

  return html.replace(
    placeholderRegex,
    (match: string, placeholderContent: string) => {
      // Extract just the variable name (without default value) for display
      const variableName = placeholderContent.split(/\s*\|\|/)[0]?.trim() ?? "";

      // Escape HTML in the match to prevent XSS
      const escapedMatch = match
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Escape the variable name for the title attribute
      const escapedVariableName = variableName
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      return `<span style="display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace; margin: 0 2px; border: 1px solid #93c5fd; white-space: nowrap; vertical-align: middle;" title="Variable: ${escapedVariableName}">${escapedMatch}</span>`;
    },
  );
}
