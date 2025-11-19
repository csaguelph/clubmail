# Variable Placeholders in Campaigns

ClubMail supports dynamic variable placeholders in email campaigns, allowing you to personalize content for each subscriber. Placeholders use the format `{{.Variable}}` and support both simple and nested data access.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Default Values](#default-values)
- [Available Variables](#available-variables)
- [Nested Access](#nested-access)
- [Custom Fields](#custom-fields)
- [Name Handling](#name-handling)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Basic Usage

Placeholders use the format `{{.Variable}}` where `Variable` is the name of the variable you want to insert. Placeholders can be used in both the email subject line and the email body (HTML content).

## Default Values

You can provide a default value for placeholders that might be empty using the `||` operator. This ensures your emails always look professional, even when subscriber data is missing.

### Syntax

```
{{.Variable || "default value"}}
{{.Nested.Path || 'default value'}}
```

The default value is used when:
- The variable resolves to an empty string
- The variable is null or undefined
- The variable path doesn't exist

### Examples

**Basic Usage:**
```
{{.Name.First || "Friend"}}        → "John" (if name exists) or "Friend" (if missing)
{{.Club.Name || "Our Club"}}       → "Computer Science Club" or "Our Club"
{{.CustomFields.role || "Member"}} → "Admin" or "Member"
```

**In Templates:**
```
Subject: Welcome {{.Name.First || "there"}}!

Body: Hi {{.Name.First || "Friend"}}, welcome to {{.Club.Name || "our club"}}!
```

### Notes

- Default values must be enclosed in quotes (single `'` or double `"`)
- Default values are only used when the variable is empty or missing
- You can use default values with any variable type (subscriber info, custom fields, campaign/club info)
- Default values work with nested paths: `{{.CustomFields.address.city || "Unknown"}}`

## Available Variables

### Built-in Variables

The following variables are automatically available for all subscribers:

#### Subscriber Information

| Variable | Description | Example |
|----------|-------------|---------|
| `{{.Email}}` | Subscriber's email address | `john@example.com` |
| `{{.Name}}` | Subscriber's full name (if available) | `John Doe` |
| `{{.Name.Full}}` | Subscriber's full name (explicit) | `John Doe` |
| `{{.Name.First}}` | First name (inferred from full name) | `John` |
| `{{.Name.Last}}` | Last name (inferred from full name) | `Doe` |

#### Campaign & Club Information

| Variable | Description | Example |
|----------|-------------|---------|
| `{{.Club.Name}}` | Name of the club sending the campaign | `Computer Science Club` |
| `{{.Campaign.Name}}` | Name of the campaign | `Weekly Newsletter #42` |
| `{{.EmailList.Name}}` | Name of the email list | `All Members` |

#### URLs

| Variable | Description | Example |
|----------|-------------|---------|
| `{{.UnsubscribeUrl}}` | URL to unsubscribe from emails | `https://clubmail.csaonline.ca/unsubscribe?token=...` |
| `{{.ArchiveUrl}}` | URL to view the campaign on the web | `https://clubmail.csaonline.ca/archive/campaign-id` |

#### Date & Time

| Variable | Description | Example |
|----------|-------------|---------|
| `{{.Date}}` | Current date (locale formatted) | `1/15/2024` |
| `{{.Time}}` | Current time (locale formatted) | `3:45:30 PM` |
| `{{.DateTime}}` | Current date and time (locale formatted) | `1/15/2024, 3:45:30 PM` |
| `{{.Year}}` | Current year | `2024` |
| `{{.Month}}` | Current month (1-12) | `1` |
| `{{.Day}}` | Current day of month (1-31) | `15` |

### Custom Fields

Any custom fields you've added to subscribers are also available as variables. Custom fields can be accessed directly or through the `CustomFields` namespace.

**Direct Access:**
```
{{.CustomFieldName}}
```

**Namespaced Access:**
```
{{.CustomFields.CustomFieldName}}
```

## Nested Access

Placeholders support nested property access using dot notation. This allows you to access nested objects within custom fields.

### Example

If a subscriber has a custom field structure like:
```json
{
  "address": {
    "city": "Guelph",
    "province": "ON"
  }
}
```

You can access nested values:
```
{{.CustomFields.address.city}}  → "Guelph"
{{.CustomFields.address.province}}  → "ON"
```

Or if the custom field is at the root level:
```
{{.address.city}}  → "Guelph"
```

## Name Handling

The system automatically infers first and last names from the subscriber's full name field. The name splitting logic works as follows:

- **Single word**: `"John"` → First: `"John"`, Last: `""`
- **Two words**: `"John Doe"` → First: `"John"`, Last: `"Doe"`
- **Multiple words**: `"John Michael Doe"` → First: `"John"`, Last: `"Michael Doe"`

### Name Variables

| Variable | Description |
|----------|-------------|
| `{{.Name}}` | Full name (same as `{{.Name.Full}}`) |
| `{{.Name.Full}}` | Full name explicitly |
| `{{.Name.First}}` | First name (inferred) |
| `{{.Name.Last}}` | Last name (inferred) |

## Examples

### Basic Personalization

**Subject:**
```
Welcome {{.Name.First || "there"}}!
```

**Body:**
```html
<p>Hi {{.Name.First || "Friend"}},</p>
<p>Thank you for subscribing to our newsletter!</p>
<p>We'll send updates to {{.Email}}.</p>
```

### Using Custom Fields

If you have custom fields like:
- `membershipType`: "Premium"
- `joinDate`: "2024-01-15"
- `preferences`: `{ "newsletter": true, "events": true }`

**Subject:**
```
Special offer for {{.membershipType}} members!
```

**Body:**
```html
<p>Hi {{.Name.First}},</p>
<p>As a {{.membershipType}} member since {{.joinDate}}, you're eligible for exclusive benefits!</p>
```

### Nested Custom Fields

If you have nested custom fields:
```json
{
  "profile": {
    "year": "2024",
    "program": "Computer Science"
  }
}
```

**Body:**
```html
<p>Hi {{.Name.First}},</p>
<p>We noticed you're a {{.CustomFields.profile.year}} student in {{.CustomFields.profile.program}}!</p>
```

### Using Campaign and Club Information

**Subject:**
```
{{.Campaign.Name}} from {{.Club.Name}}
```

**Body:**
```html
<p>Hi {{.Name.First}},</p>
<p>This is {{.Campaign.Name}} from {{.Club.Name}}.</p>
<p>You're receiving this because you're subscribed to {{.EmailList.Name}}.</p>
```

### Using URLs

**Body:**
```html
<p>View this email on the web: <a href="{{.ArchiveUrl}}">Click here</a></p>
<p>To unsubscribe, visit: <a href="{{.UnsubscribeUrl}}">Unsubscribe</a></p>
```

### Using Date/Time Variables

**Subject:**
```
{{.Campaign.Name}} - {{.Date}}
```

**Body:**
```html
<p>This email was sent on {{.DateTime}}.</p>
<p>Happy {{.Year}}!</p>
<p>This is our newsletter for {{.Month}}/{{.Day}}.</p>
```

## Best Practices

### 1. Always Provide Fallbacks

If a placeholder might be empty, use default values to ensure your email looks professional:

**Without Default:**
```
Hi {{.Name.First}}!  → "Hi John!" (if name exists)
                     → "Hi !" (if name is missing)
```

**With Default:**
```
Hi {{.Name.First || "there"}}!  → "Hi John!" (if name exists)
                                → "Hi there!" (if name is missing)
```

Default values are especially useful for:
- Names that might be missing
- Custom fields that aren't always populated
- Optional campaign/club information

### 2. Use Appropriate Name Variables

- Use `{{.Name.First}}` for casual, friendly emails
- Use `{{.Name.Full}}` for formal communications
- Use `{{.Name}}` when you want the full name but it's optional

### 3. Test with Different Data

Test your templates with subscribers who have:
- Full names
- First names only
- No names
- Various custom field configurations

### 4. Custom Field Naming

Use clear, consistent naming for custom fields:
- Use camelCase or snake_case: `membershipType`, `join_date`
- Avoid special characters that might conflict with placeholder syntax
- Document your custom fields for your team

### 5. Subject Line Best Practices

- Keep subject lines concise
- Placeholders count toward character limits
- Test how placeholders look when empty

**Example:**
```
{{.Name.First}}, don't miss our event!  → "John, don't miss our event!"
```

## Technical Details

### Placeholder Resolution

Placeholders are resolved at email send time, not at template creation time. This means:

1. Each subscriber receives a personalized version of the email
2. Placeholders are replaced with actual subscriber data
3. Missing or null values result in empty strings
4. Invalid placeholder syntax is ignored (logged as warnings)

### Supported Data Types

- **Strings**: Displayed as-is
- **Numbers**: Converted to strings
- **Booleans**: Converted to "true" or "false"
- **Objects/Arrays**: Currently return empty strings (may be extended in future)

### Error Handling

If a placeholder cannot be resolved:
- The placeholder is replaced with an empty string
- A warning is logged (in development/debugging)
- The email is still sent (graceful degradation)

## Troubleshooting

### Placeholder Not Replacing

1. **Check syntax**: Ensure you're using `{{.Variable}}` format (note the dot)
2. **Check variable name**: Variable names are case-sensitive
3. **Check data exists**: Verify the subscriber has the data you're trying to access
4. **Check custom fields**: Ensure custom fields are properly saved in the database

### Empty Values

If placeholders are showing as empty:
- The subscriber may not have that field populated
- Check the subscriber's profile in the admin panel
- Verify custom fields are correctly formatted (JSON)

### Nested Access Not Working

- Ensure the custom field is a JSON object, not a string
- Check the exact path matches your data structure
- Use `{{.CustomFields.path.to.value}}` for nested access

## Future Enhancements

Potential future features:
- Conditional logic (`{{#if}}...{{/if}}`)
- Loops for arrays (`{{#each}}...{{/each}}`)
- Default values (`{{.Name.First | default: "Friend"}}`)
- String formatting and filters
- Date formatting for custom date fields

---

For questions or issues, please refer to the main [README.md](../README.md) or open an issue in the repository.

