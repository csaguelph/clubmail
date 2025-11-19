---
title: "Managing Subscribers"
description: "Learn how to add, import, edit, and organize your email subscribers in ClubMail."
---

# Managing Subscribers

This guide covers everything you need to know about managing your email subscribers in ClubMail.

<!-- TODO: Add screenshot of the subscribers page -->

## Accessing Subscribers

1. Navigate to your club's dashboard
2. Click on "Subscribers" in the sidebar
3. You'll see the subscribers list for the default email list

## Viewing Subscribers

### Selecting an Email List

Use the dropdown at the top to switch between email lists:

- Each list shows its own subscribers
- The default list is pre-selected
- Lists are shown with "(Default)" indicator if applicable

### Subscriber Information

For each subscriber, you can see:

- **Email Address** - Primary identifier
- **Name** - Full name (if provided)
- **Status** - Subscribed, Unsubscribed, Bounced, or Blocked
- **Lists** - Which email lists they belong to
- **Custom Fields** - Additional stored data
- **Created Date** - When they were added

## Adding Subscribers

### Adding a Single Subscriber

1. Click the "Add Subscriber" button
2. Enter the email address (required)
3. Optionally enter the subscriber's name
4. Select which email list(s) to add them to
5. Optionally add custom fields (see below)
6. Click "Save"

**Note:** If the email already exists for this club, it will be updated instead of creating a duplicate.

### Adding Custom Fields

When adding or editing a subscriber, you can add custom fields:

1. Click "Add Custom Field"
2. Enter field name (e.g., "membershipType")
3. Enter field value (e.g., "Premium")
4. Add more fields as needed

Custom fields can be used in email placeholders. See [Variable Placeholders](/features/variables) for details.

## Importing Subscribers

### CSV Import

Import multiple subscribers from a CSV file:

1. Click "Import CSV" button
2. Prepare your CSV file with columns:
   - `email` (required)
   - `name` (optional)
   - Additional columns become custom fields
3. Paste CSV content into the text area, or upload file
4. Review the parsed data preview
5. Select the target email list
6. Click "Import"

**CSV Format Example:**
```csv
email,name,membershipType,graduationYear
john@example.com,John Doe,Premium,2025
jane@example.com,Jane Smith,Standard,2024
bob@example.com,Bob Johnson,Basic,2026
```

**Tips:**
- First row should contain column headers
- Email addresses must be valid
- Duplicate emails will update existing subscribers
- Custom field columns are automatically detected

<!-- TODO: Add screenshot of CSV import interface -->

### GryphLife Import

Import subscribers directly from GryphLife:

1. Click "Import from GryphLife" button
2. Export your data from GryphLife
3. Paste the exported data into the text area
4. Review the parsed subscriber information
5. Select the target email list
6. Click "Import"

**Note:** GryphLife import automatically parses the platform's export format.

## Editing Subscribers

1. Find the subscriber in the list
2. Click the edit icon (pencil) next to their email
3. Update any information:
   - Email address
   - Name
   - Custom fields
   - List memberships
4. Click "Save Changes"

### Managing List Memberships

When editing a subscriber:

- Check/uncheck email lists to add/remove them
- Subscribers can belong to multiple lists
- Changes take effect immediately

## Managing Subscriber Status

### Changing Status

1. Find the subscriber in the list
2. Click the status dropdown
3. Select new status:
   - **Subscribed** - Active, will receive emails
   - **Unsubscribed** - Opted out, won't receive emails
   - **Bounced** - Email bounced (usually automatic)
   - **Blocked** - Blocked due to hard bounces or complaints

### Understanding Statuses

**Subscribed:**
- Active subscriber
- Will receive all campaigns sent to their lists
- Default status for new subscribers

**Unsubscribed:**
- Subscriber has opted out
- Automatically excluded from all campaigns
- Can be manually resubscribed

**Bounced:**
- Email delivery failed
- Usually set automatically by the system
- May be temporary (soft bounce) or permanent (hard bounce)

**Blocked:**
- Subscriber blocked due to hard bounces or spam complaints
- Cannot receive emails
- Cannot be manually reactivated

## Exporting Subscribers

Export your subscriber list to CSV:

1. Select the email list you want to export
2. Click "Export CSV" button
3. CSV file will download automatically
4. File includes: email, name, status, and custom fields

**Use Cases:**
- Backup your subscriber list
- Import into another system
- Analyze data in spreadsheet software
- Share with team members

## Deleting Subscribers

1. Find the subscriber in the list
2. Click the delete icon (trash)
3. Confirm deletion in the dialog
4. Subscriber is permanently removed

**Warning:** Deleting a subscriber:
- Removes them from all email lists
- Removes all campaign history
- Cannot be undone

## Managing Email Lists

### Creating a New List

1. Navigate to Email Lists section (if available)
2. Click "Create List"
3. Enter list name
4. Add optional description
5. Set as default (optional)
6. Save

### List Membership

- Subscribers can belong to multiple lists
- Adding a subscriber to a list doesn't remove them from others
- Removing from a list doesn't delete the subscriber

## Custom Fields

### Adding Custom Fields

Custom fields store additional information about subscribers:

1. When adding/editing a subscriber, click "Add Custom Field"
2. Enter field name (e.g., "membershipType", "graduationYear")
3. Enter field value
4. Save

### Using Custom Fields in Emails

Custom fields can be used in email placeholders:

```
{{.CustomFields.membershipType}}
{{.CustomFields.graduationYear}}
```

See [Variable Placeholders](/features/variables) for complete documentation.

### Nested Custom Fields

Custom fields support nested objects:

```json
{
  "profile": {
    "year": "2024",
    "program": "Computer Science"
  }
}
```

Access with: `{{.CustomFields.profile.year}}`

## Best Practices

### List Organization

- Create separate lists for different audiences
- Use descriptive list names
- Keep default list for general announcements
- Document list purposes

### Data Quality

- Regularly clean your lists
- Remove bounced addresses
- Respect unsubscribe requests
- Keep custom fields consistent

### Privacy

- Only collect necessary information
- Clearly communicate data usage
- Provide easy unsubscribe options
- Comply with email regulations

## Troubleshooting

### Can't Add Subscriber

- Verify email address is valid format
- Check that email isn't already in the list
- Ensure you have Editor or Owner permissions

### Import Not Working

- Check CSV format matches requirements
- Verify email addresses are valid
- Ensure first row contains headers
- Check for special characters in data

### Subscriber Not Receiving Emails

- Check subscriber status (must be "Subscribed")
- Verify they're in the selected email list
- Check that list is selected when sending campaign
- Ensure campaign was actually sent

## Next Steps

- [Importing Subscribers](/user-guide/importing-subscribers) - Detailed import guide
- [Variable Placeholders](/features/variables) - Using custom fields
- [Creating Campaigns](/user-guide/creating-campaigns) - Send emails to your subscribers

