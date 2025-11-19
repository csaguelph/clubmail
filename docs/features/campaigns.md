---
title: "Email Campaigns"
description: "Create beautiful email campaigns with ClubMail's drag-and-drop editor. Schedule sends, personalize content, and track engagement."
---

# Email Campaigns

ClubMail's campaign feature lets you create professional email newsletters and announcements with an intuitive drag-and-drop editor. No coding required!

<!-- TODO: Add screenshot of the campaign editor interface -->

## Key Features

### Drag-and-Drop Editor

Build your emails visually by adding and arranging content blocks:

- **Headings** - Add H1, H2, or H3 headings to structure your content
- **Text Blocks** - Rich text editor for paragraphs and formatted content
- **Buttons** - Call-to-action buttons with customizable links and alignment
- **Images** - Upload and insert images with alt text
- **Dividers** - Horizontal lines to separate sections
- **Spacers** - Add vertical spacing between elements

<!-- TODO: Add screenshot showing different block types -->

### Campaign Management

- **Draft Mode** - Save campaigns as drafts and edit them later
- **Scheduled Sending** - Schedule campaigns to send at a specific date and time
- **Campaign Status** - Track campaign status (Draft, Scheduled, Sending, Sent, Failed, Cancelled)
- **Archive** - View sent campaigns in a web archive format

### Personalization

Use variable placeholders to personalize each email:

- Subscriber names and email addresses
- Custom fields (membership type, graduation year, etc.)
- Club and campaign information
- Dynamic unsubscribe and archive links

See [Variable Placeholders](/features/variables) for complete documentation.

### Email Lists

Each campaign targets a specific email list:

- Select from your club's email lists
- Only active subscribers receive emails
- Automatically excludes unsubscribed, bounced, and blocked subscribers

## Campaign Workflow

1. **Create** - Start a new campaign and give it a name
2. **Design** - Use the drag-and-drop editor to build your email
3. **Configure** - Set subject line, preheader text, and select email list
4. **Preview** - Review your email in the live preview panel
5. **Save** - Save as draft or send immediately/schedule

<!-- TODO: Add workflow diagram -->

## Campaign Settings

### Basic Information

- **Campaign Name** - Internal name for your reference
- **Subject Line** - The email subject (supports placeholders)
- **Preheader Text** - Short preview text shown in email clients
- **Email List** - Target list for the campaign

### Sender Information

Automatically pulled from your club settings:

- **From Name** - Display name for the sender
- **From Email** - Sender email address (format: `slug@clubmail.csaonline.ca`)
- **Reply-To** - Email address for replies (optional)

## Campaign Statuses

- **Draft** - Campaign is saved but not sent
- **Scheduled** - Campaign is queued for future delivery
- **Sending** - Campaign is currently being sent
- **Sent** - Campaign has been successfully sent
- **Failed** - Campaign encountered errors during sending
- **Cancelled** - Scheduled campaign was cancelled before sending

## Best Practices

### Subject Lines

- Keep subject lines concise and clear
- Use placeholders for personalization: `{{.Name.First}}, don't miss our event!`
- Test different subject lines to improve open rates

### Content Structure

- Start with a clear heading
- Use short paragraphs and bullet points
- Include a clear call-to-action button
- Add images to break up text
- End with contact information or social links

### Scheduling

- Schedule campaigns for optimal engagement times
- Consider time zones of your subscribers
- Avoid sending during holidays or exam periods (for student clubs)

### Testing

- Always preview your campaign before sending
- Test with different subscriber data to see how placeholders render
- Check mobile responsiveness in the preview

## Related Guides

- [Creating Campaigns](/user-guide/creating-campaigns) - Step-by-step guide
- [Scheduling Campaigns](/user-guide/scheduling-campaigns) - How to schedule sends
- [Variable Placeholders](/features/variables) - Personalization guide
- [Analytics](/user-guide/analytics) - Track campaign performance

