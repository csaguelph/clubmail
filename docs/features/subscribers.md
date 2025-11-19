---
title: "Subscriber Management"
description: "Organize and manage your email subscribers with lists, custom fields, CSV import/export, and automatic unsubscribe handling."
---

# Subscriber Management

Manage your club's email subscribers efficiently with ClubMail's subscriber management features. Organize contacts into lists, import from CSV, and track subscriber status.

<!-- TODO: Add screenshot of the subscribers page -->

## Key Features

### Email Lists

Organize subscribers into multiple lists:

- **Multiple Lists** - Create separate lists for different audiences (e.g., "All Members", "Executive Team", "Event Attendees")
- **Default List** - One list can be marked as default for quick access
- **List Descriptions** - Add notes about each list's purpose
- **List Membership** - Subscribers can belong to multiple lists

<!-- TODO: Add screenshot showing list management -->

### Subscriber Status

Track subscriber status automatically:

- **Subscribed** - Active subscriber receiving emails
- **Unsubscribed** - Subscriber has opted out
- **Bounced** - Email address returned a bounce (soft or hard)
- **Blocked** - Subscriber blocked due to hard bounces or complaints

### Custom Fields

Store additional information about subscribers:

- **Flexible Data** - Store any JSON data (membership type, graduation year, interests, etc.)
- **Personalization** - Use custom fields in email placeholders
- **Nested Data** - Support for nested objects and arrays

See [Variable Placeholders](/features/variables) for using custom fields in campaigns.

### Import & Export

- **CSV Import** - Bulk import subscribers from CSV files
- **CSV Export** - Export subscriber lists for backup or external use
- **GryphLife Import** - Import subscribers directly from GryphLife platform
- **Duplicate Handling** - Automatic handling of duplicate emails during import

## Subscriber Information

### Required Fields

- **Email Address** - Unique email address (unique per club)

### Optional Fields

- **Name** - Subscriber's full name
- **Custom Fields** - Any additional structured data

### Automatic Fields

- **Unsubscribe Token** - Unique token for unsubscribe links
- **Status** - Current subscription status
- **Created At** - When subscriber was added
- **Updated At** - Last modification timestamp

## Importing Subscribers

### CSV Import

1. Prepare a CSV file with columns:
   - `email` (required)
   - `name` (optional)
   - Additional columns become custom fields

2. Click "Import CSV" on the subscribers page
3. Paste CSV content or upload file
4. Review parsed data
5. Select target email list
6. Confirm import

**CSV Format Example:**
```csv
email,name,membershipType,graduationYear
john@example.com,John Doe,Premium,2025
jane@example.com,Jane Smith,Standard,2024
```

### GryphLife Import

Import subscribers directly from GryphLife:

1. Click "Import from GryphLife"
2. Paste GryphLife export data
3. Review parsed subscriber information
4. Select target email list
5. Confirm import

<!-- TODO: Add screenshot of import process -->

## Managing Subscribers

### Adding Subscribers

**Single Subscriber:**
1. Click "Add Subscriber"
2. Enter email address
3. Optionally add name and custom fields
4. Select email list(s)
5. Save

**Bulk Import:**
- Use CSV import for multiple subscribers
- Use GryphLife import for platform integration

### Editing Subscribers

1. Find subscriber in the list
2. Click edit icon
3. Update email, name, or custom fields
4. Change list memberships
5. Save changes

### Changing Status

Manually update subscriber status:

- **Resubscribe** - Reactivate an unsubscribed subscriber
- **Unsubscribe** - Manually unsubscribe a subscriber
- **Block** - Block a subscriber (prevents all future emails)

### Deleting Subscribers

1. Find subscriber in the list
2. Click delete icon
3. Confirm deletion

**Note:** Deleting a subscriber removes them from all lists and all campaign history.

## List Management

### Creating Lists

1. Navigate to Email Lists section
2. Click "Create List"
3. Enter list name
4. Add optional description
5. Set as default (optional)
6. Save

### Managing List Membership

- Add subscribers to multiple lists
- Remove subscribers from lists
- View which lists a subscriber belongs to

### Default List

- One list per club can be marked as default
- Default list is pre-selected when creating campaigns
- Default list is shown first in list selectors

## Unsubscribe Handling

### Automatic Unsubscribe Links

Every email automatically includes an unsubscribe link:

- Unique token per subscriber
- One-click unsubscribe
- Respects subscriber preferences immediately

### Unsubscribe Process

1. Subscriber clicks unsubscribe link in email
2. Confirmation page shown
3. Subscriber status updated to "Unsubscribed"
4. Removed from all future campaign sends

### Resubscribing

- Subscribers can be manually resubscribed by club owners/editors
- Resubscribed subscribers are added back to their previous lists

## Bounce Management

### Soft Bounces

Temporary delivery failures (mailbox full, server down):

- Tracked automatically
- Multiple soft bounces may result in blocking
- Configurable threshold in platform settings

### Hard Bounces

Permanent delivery failures (invalid email, domain doesn't exist):

- Automatically blocked
- Status set to "Blocked"
- Excluded from all future sends

## Best Practices

### List Organization

- Create separate lists for different audiences
- Use descriptive list names
- Document list purposes in descriptions
- Keep default list for general announcements

### Data Quality

- Regularly clean your subscriber lists
- Remove bounced addresses
- Respect unsubscribe requests immediately
- Keep custom fields consistent

### Privacy

- Only collect necessary subscriber information
- Clearly communicate how data is used
- Provide easy unsubscribe options
- Comply with email marketing regulations

## Related Guides

- [Managing Subscribers](/user-guide/managing-subscribers) - Step-by-step guide
- [Importing Subscribers](/user-guide/importing-subscribers) - Detailed import instructions
- [Variable Placeholders](/features/variables) - Using custom fields in campaigns

