---
title: "Creating Campaigns"
description: "Step-by-step guide to creating and sending email campaigns with ClubMail's drag-and-drop editor."
---

# Creating Campaigns

This guide will walk you through creating your first email campaign using ClubMail's drag-and-drop editor.

<!-- TODO: Add screenshot of the new campaign page -->

## Step 1: Start a New Campaign

1. Navigate to your club's dashboard
2. Click on "Campaigns" in the sidebar
3. Click the "Create Campaign" button
4. You'll be taken to the campaign editor

## Step 2: Enter Campaign Details

Fill in the basic information:

- **Campaign Name** - Internal name for your reference (e.g., "Weekly Newsletter #42")
- **Subject Line** - The email subject that recipients will see
- **Preheader Text** - Short preview text shown in email clients (optional but recommended)
- **Email List** - Select which email list to send to

**Tip:** Use variable placeholders in your subject line for personalization:
```
Welcome {{.Name.First || "there"}}!
```

<!-- TODO: Add screenshot of campaign details form -->

## Step 3: Build Your Email Content

Use the drag-and-drop editor to build your email:

### Adding Blocks

1. Click the "+" button to see available block types
2. Select a block type to add it to your email:
   - **Heading** - For titles and section headers
   - **Text** - For paragraphs and formatted content
   - **Button** - For call-to-action buttons
   - **Image** - For photos and graphics
   - **Divider** - For visual separation
   - **Spacer** - For vertical spacing

<!-- TODO: Add screenshot of block menu -->

### Editing Blocks

1. Click on any block to select it
2. Edit properties in the side panel:
   - **Heading:** Change text and heading level (H1, H2, H3)
   - **Text:** Use the rich text editor for formatting
   - **Button:** Set button text, URL, and alignment
   - **Image:** Upload image, set alt text, and adjust width
   - **Divider:** No options needed
   - **Spacer:** Adjust height

<!-- TODO: Add screenshot of editing a block -->

### Rearranging Blocks

Move blocks up or down:

1. Click the up/down arrows on a block
2. Or drag and drop blocks to reorder

### Deleting Blocks

1. Select the block you want to remove
2. Click the delete/trash icon

## Step 4: Preview Your Email

The live preview panel shows how your email will look:

- **Desktop View** - See how it appears on desktop
- **Mobile Responsive** - Automatically adapts to mobile screens
- **Real-time Updates** - Changes appear instantly in preview

<!-- TODO: Add screenshot of preview panel -->

**Tip:** Always preview before sending to catch any issues!

## Step 5: Add Personalization (Optional)

Use variable placeholders to personalize content:

### Common Placeholders

- `{{.Name.First}}` - Subscriber's first name
- `{{.Email}}` - Subscriber's email address
- `{{.Club.Name}}` - Your club's name
- `{{.Campaign.Name}}` - Campaign name

### Example Usage

**Subject Line:**
```
{{.Name.First || "Friend"}}, don't miss our event!
```

**Email Body:**
```html
<p>Hi {{.Name.First || "there"}},</p>
<p>Thank you for being part of {{.Club.Name}}!</p>
```

See [Variable Placeholders](/features/variables) for complete documentation.

## Step 6: Save Your Campaign

Click "Create Campaign" to save:

- Campaign is saved as a **Draft**
- You can edit it later
- You can send it immediately or schedule it

## Step 7: Send Your Campaign

### Send Immediately

1. Go to your campaigns list
2. Find your campaign
3. Click "Send Now"
4. Confirm the send
5. Campaign will start sending immediately

### Schedule for Later

1. Go to your campaigns list
2. Find your campaign
3. Click "Schedule"
4. Select date and time
5. Confirm schedule
6. Campaign will send automatically at the scheduled time

<!-- TODO: Add screenshot of scheduling interface -->

## Editing Existing Campaigns

### Edit Draft Campaigns

1. Go to your campaigns list
2. Click on a draft campaign
3. Make your changes
4. Click "Save Changes"

### Edit Scheduled Campaigns

1. Go to your campaigns list
2. Click on a scheduled campaign
3. Make your changes
4. Click "Save Changes"
5. The scheduled send will use the updated content

**Note:** You cannot edit campaigns that are currently sending or have already been sent.

## Tips for Great Campaigns

### Content Structure

1. **Start with a Clear Heading** - Grab attention immediately
2. **Use Short Paragraphs** - Easy to scan and read
3. **Add Visual Elements** - Images break up text
4. **Include a Call-to-Action** - Clear button with a link
5. **End with Contact Info** - Social links or contact details

### Best Practices

- **Test Before Sending** - Always preview your email
- **Personalize** - Use placeholders to make emails feel personal
- **Keep It Concise** - Respect your subscribers' time
- **Mobile-Friendly** - Most emails are read on mobile devices
- **Clear CTAs** - Make it obvious what action you want

### Subject Line Tips

- Keep it under 50 characters when possible
- Be specific and clear
- Use personalization when appropriate
- Avoid spam trigger words
- Test different subject lines

## Troubleshooting

### Blocks Not Appearing

- Make sure you've clicked "Add Block" and selected a type
- Check that blocks are saved (click "Save Changes" if editing)

### Preview Not Updating

- Try refreshing the page
- Make sure you've saved your changes
- Check browser console for errors

### Can't Send Campaign

- Verify you've selected an email list
- Ensure the email list has active subscribers
- Check that your club settings are configured
- Make sure campaign is in "Draft" status

## Next Steps

- [Scheduling Campaigns](/user-guide/scheduling-campaigns) - Learn about scheduling
- [Variable Placeholders](/features/variables) - Advanced personalization
- [Analytics](/user-guide/analytics) - Track campaign performance

