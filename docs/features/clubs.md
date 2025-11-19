---
title: "Club Management"
description: "Manage multiple clubs, team members, roles, and settings. Customize branding and email preferences for each club."
---

# Club Management

ClubMail supports managing multiple clubs from a single account. Each club has its own settings, subscribers, campaigns, and team members.

<!-- TODO: Add screenshot of the clubs dashboard -->

## Key Features

### Multi-Club Support

- **Multiple Clubs** - Manage several clubs from one account
- **Independent Data** - Each club has separate subscribers, campaigns, and settings
- **Quick Switching** - Switch between clubs easily from the dashboard
- **Club Dashboard** - Overview of each club's activity and statistics

### Club Settings

Customize each club's email appearance and behavior:

- **Branding** - Set brand color for email templates
- **Sender Information** - Configure from name and email
- **Reply-To Address** - Set reply-to email for campaigns
- **Subject Prefix** - Optional prefix for all campaign subjects
- **Social Links** - Add social media links to email footers
- **Tracking** - Enable/disable open and click tracking

### Team Collaboration

Invite team members with different permission levels:

- **Club Owner** - Full access to all club features
- **Club Editor** - Can create campaigns and manage subscribers
- **Club Viewer** - Read-only access to view campaigns and analytics

## Club Information

### Basic Details

- **Club Name** - Display name for the club
- **Slug** - URL-friendly identifier (used in email addresses)
- **Organization Email** - Primary contact email
- **GryphLife ID** - Optional integration with GryphLife platform
- **Active Status** - Enable/disable club (inactive clubs are hidden)

### Email Configuration

- **From Name** - Display name shown in email clients
- **From Email Slug** - Part before @clubmail.csaonline.ca (e.g., "newsletter" → newsletter@clubmail.csaonline.ca)
- **Reply-To Email** - Where replies should be sent
- **Default Subject Prefix** - Optional prefix for all subjects (e.g., "[Newsletter]")

### Branding

- **Brand Color** - Primary color used in email templates (hex code)
- **Social Links** - Facebook, Twitter, Instagram, etc. (displayed in email footer)

## Team Management

### Roles

**Club Owner:**
- Full access to all features
- Can manage team members
- Can modify club settings
- Can delete the club

**Club Editor:**
- Can create and edit campaigns
- Can manage subscribers and email lists
- Can view analytics
- Cannot modify club settings or team members

**Club Viewer:**
- Can view campaigns and analytics
- Read-only access
- Cannot create or edit content

### Adding Team Members

1. Navigate to club settings
2. Go to "Team Members" section
3. Enter email address of new member
4. Select role (Editor or Viewer)
5. Send invitation

**Note:** The invited user must have a ClubMail account. If they don't have an account, they'll need to sign up first.

### Managing Team Members

- **Change Role** - Update a member's permission level
- **Remove Member** - Remove a member from the club
- **View Activity** - See when members last accessed the club

## Club Settings

### Email Settings

Configure how emails are sent from this club:

- **From Name** - How the sender appears in email clients
- **From Email** - Sender email address format
- **Reply-To** - Where replies are directed
- **Subject Prefix** - Optional prefix for all subjects

### Branding Settings

Customize the visual appearance:

- **Brand Color** - Primary color (default: #b1d135)
- **Social Links** - Add social media profiles

### Tracking Settings

- **Enable Tracking** - Toggle open and click tracking
- When disabled, no tracking pixels or click tracking URLs are added

## Creating a Club

1. Navigate to "My Clubs" from the main menu
2. Click "Create New Club"
3. Enter club name (slug is auto-generated)
4. Optionally add organization email and GryphLife ID
5. Save

A default email list is automatically created for new clubs.

## Club Dashboard

View overview statistics for each club:

- **Total Subscribers** - Number of active subscribers
- **Email Lists** - Number of lists
- **Campaigns** - Total campaigns (by status)
- **Team Members** - Number of members and their roles

<!-- TODO: Add screenshot of club dashboard -->

## Best Practices

### Club Organization

- Use clear, descriptive club names
- Keep slugs short and memorable
- Set organization email for important communications

### Team Management

- Assign appropriate roles based on responsibilities
- Use Viewer role for stakeholders who need visibility
- Regularly review team member access

### Branding

- Use your club's official brand color
- Add social links to increase engagement
- Keep from name consistent with your club's identity

### Settings

- Configure reply-to email for better communication
- Use subject prefixes to help subscribers identify emails
- Enable tracking to measure engagement

## Related Guides

- [Setting Up Your Club](/user-guide/club-settings) - Step-by-step setup guide
- [Managing Team Members](/user-guide/team-management) - Team collaboration guide
- [Creating Campaigns](/user-guide/creating-campaigns) - Create your first campaign

