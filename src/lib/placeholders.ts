/**
 * Placeholder Resolution System
 *
 * Supports variable placeholders in the format {{.Variable}} with:
 * - Simple variables: {{.Name}}, {{.Email}}
 * - Nested access: {{.Name.First}}, {{.CustomField.Nested}}
 * - Custom attributes from subscriber customFields
 * - Campaign and club information
 * - System variables (dates, URLs)
 */

type PlaceholderData = {
  name?: string | null;
  email: string;
  customFields?: Record<string, unknown> | null;
  unsubscribeUrl?: string;
  archiveUrl?: string;
  clubName?: string;
  campaignName?: string;
  emailListName?: string;
};

/**
 * Split a full name into first and last name
 * Handles various name formats:
 * - "John Doe" -> { First: "John", Last: "Doe" }
 * - "John" -> { First: "John", Last: "" }
 * - "John Michael Doe" -> { First: "John", Last: "Michael Doe" }
 */
function splitName(fullName: string): { First: string; Last: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { First: "", Last: "" };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { First: parts[0]!, Last: "" };
  }

  // Take first part as first name, rest as last name
  const first = parts[0]!;
  const last = parts.slice(1).join(" ");

  return { First: first, Last: last };
}

/**
 * Get a value from a nested object using dot notation
 * Example: getNestedValue({ user: { name: "John" } }, "user.name") -> "John"
 */
function getNestedValue(
  obj: unknown,
  path: string,
): string | number | boolean | null | undefined {
  if (!obj || typeof obj !== "object") {
    return undefined;
  }

  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return undefined;
    }

    if (Array.isArray(current)) {
      return undefined; // Arrays not supported for now
    }

    current = (current as Record<string, unknown>)[key];
  }

  // Convert to string for template replacement
  if (current === null || current === undefined) {
    return "";
  }

  if (typeof current === "string" || typeof current === "number") {
    return String(current);
  }

  if (typeof current === "boolean") {
    return String(current);
  }

  // For objects/arrays, return empty string (could be extended to JSON.stringify)
  return "";
}

/**
 * Build a data object for placeholder resolution
 * Includes inferred nested fields like Name.First and Name.Last
 */
function buildPlaceholderData(data: PlaceholderData): Record<string, unknown> {
  const now = new Date();

  const result: Record<string, unknown> = {
    Email: data.email,
    Name: data.name || "",
    UnsubscribeUrl: data.unsubscribeUrl || "",
    ArchiveUrl: data.archiveUrl || "",
    Club: {
      Name: data.clubName || "",
    },
    Campaign: {
      Name: data.campaignName || "",
    },
    EmailList: {
      Name: data.emailListName || "",
    },
    // Date/time variables
    Date: now.toLocaleDateString(),
    Time: now.toLocaleTimeString(),
    DateTime: now.toLocaleString(),
    Year: now.getFullYear().toString(),
    Month: (now.getMonth() + 1).toString(),
    Day: now.getDate().toString(),
  };

  // If we have a name, infer First and Last
  if (data.name) {
    const { First, Last } = splitName(data.name);
    result.Name = {
      Full: data.name,
      First,
      Last,
    };
  } else {
    result.Name = {
      Full: "",
      First: "",
      Last: "",
    };
  }

  // Add custom fields (flattened at root level and nested)
  if (data.customFields && typeof data.customFields === "object") {
    // Add custom fields at root level
    Object.entries(data.customFields).forEach(([key, value]) => {
      // Use PascalCase for consistency, but also support original key
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      result[key] = value;
      if (key !== pascalKey) {
        result[pascalKey] = value;
      }
    });

    // Also add under CustomFields namespace
    result.CustomFields = data.customFields;
  }

  return result;
}

/**
 * Resolve a single placeholder (e.g., "Name.First" or "Email")
 */
function resolvePlaceholder(
  placeholder: string,
  data: PlaceholderData,
): string {
  const placeholderData = buildPlaceholderData(data);

  // Special case: {{.Name}} should return the full name
  if (placeholder === "Name") {
    return data.name || "";
  }

  const value = getNestedValue(placeholderData, placeholder);

  return value !== undefined && value !== null ? String(value) : "";
}

/**
 * Parse a placeholder string to extract variable path and optional default value
 * Supports: {{.Variable}} or {{.Variable || "default"}}
 *
 * @param placeholderText - The full placeholder text (e.g., "Name.First || \"Friend\"")
 * @returns Object with variablePath and optional defaultValue
 */
function parsePlaceholder(placeholderText: string): {
  variablePath: string;
  defaultValue?: string;
} {
  // Check if there's a default value using || operator
  const defaultMatch = placeholderText.match(/^(.+?)\s*\|\|\s*(["'])(.*?)\2$/);

  if (defaultMatch) {
    return {
      variablePath: defaultMatch[1]!.trim(),
      defaultValue: defaultMatch[3]!, // The value inside quotes (without the quotes)
    };
  }

  // No default value, just return the variable path
  return {
    variablePath: placeholderText.trim(),
  };
}

/**
 * Replace all placeholders in a string with their resolved values
 * Supports format: {{.Variable}} or {{.Nested.Path}} or {{.Variable || "default"}}
 *
 * @param template - The template string containing placeholders
 * @param data - The data object to use for resolution
 * @returns The template with all placeholders replaced
 */
export function resolvePlaceholders(
  template: string,
  data: PlaceholderData,
): string {
  // First, handle HTML-encoded placeholders ({{ becomes &#123;&#123; or &lt;&lt;)
  // Decode common HTML entities that might encode the braces
  let decoded = template;
  decoded = decoded.replace(/&#123;&#123;\./g, "{{.");
  decoded = decoded.replace(/&#125;&#125;/g, "}}");
  decoded = decoded.replace(/&lt;&lt;\./g, "{{.");
  decoded = decoded.replace(/&gt;&gt;/g, "}}");
  decoded = decoded.replace(/&#x7b;&#x7b;\./gi, "{{.");
  decoded = decoded.replace(/&#x7d;&#x7d;/gi, "}}");

  // Match placeholders in the format:
  // - {{.Variable}}
  // - {{.Variable || "default"}}
  // - {{.Nested.Path || 'default'}}
  // The regex matches: {{. followed by content (variable path + optional default), then }}
  // Content: variable path (word chars and dots) optionally followed by || "default"
  const placeholderRegex = /\{\{\.([\w.]+(?:\s*\|\|\s*["'][^"']*["'])?)\}\}/g;

  return decoded.replace(placeholderRegex, (match, placeholderContent) => {
    try {
      const { variablePath, defaultValue } =
        parsePlaceholder(placeholderContent);

      const resolved = resolvePlaceholder(variablePath, data);

      // Use default value if resolved value is empty
      if (!resolved || resolved.trim() === "") {
        return defaultValue ?? "";
      }

      return resolved;
    } catch (error) {
      console.warn(
        `Failed to resolve placeholder ${match}:`,
        error instanceof Error ? error.message : String(error),
      );
      // Return default value if provided, otherwise empty string
      try {
        const parsed = parsePlaceholder(placeholderContent);
        return parsed.defaultValue ?? "";
      } catch {
        return "";
      }
    }
  });
}

/**
 * Extract all placeholder variables from a template
 * Useful for validation or preview purposes
 *
 * @param template - The template string
 * @returns Array of unique placeholder paths found in the template (without default values)
 */
export function extractPlaceholders(template: string): string[] {
  // Match placeholders with or without default values
  const placeholderRegex = /\{\{\.([\w.]+(?:\s*\|\|\s*["'][^"']*["'])?)\}\}/g;
  const matches = Array.from(template.matchAll(placeholderRegex));
  const placeholders = matches.map((match) => {
    const { variablePath } = parsePlaceholder(match[1]!);
    return variablePath;
  });
  return Array.from(new Set(placeholders)); // Return unique placeholders
}
