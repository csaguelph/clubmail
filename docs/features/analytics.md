---
title: "Analytics & Tracking"
description: "Track email opens, clicks, bounces, and complaints. Monitor campaign performance and subscriber engagement."
---

# Analytics & Tracking

ClubMail provides comprehensive analytics to help you understand how your email campaigns are performing. Track opens, clicks, bounces, and more.

## Key Features

### Open Tracking

Monitor email open rates:

- **Tracking Pixel** - Invisible image tracks when emails are opened
- **Open Count** - Number of times each email was opened
- **Unique Opens** - Number of subscribers who opened
- **Open Rate** - Percentage of subscribers who opened
- **Open Timestamps** - When each open occurred

### Click Tracking

Track link clicks in your campaigns:

- **Automatic Tracking** - All links in emails are automatically tracked
- **Click Count** - Total number of clicks per campaign
- **Unique Clicks** - Number of subscribers who clicked
- **Click Rate** - Percentage of subscribers who clicked
- **Click Timestamps** - When each click occurred
- **Link URLs** - Which links were clicked

## Campaign Analytics

### Overview Metrics

For each campaign, view:

- **Total Sent** - Number of emails sent
- **Delivered** - Successfully delivered emails
- **Opens** - Total and unique opens
- **Clicks** - Total and unique clicks
- **Bounces** - Soft and hard bounces
- **Complaints** - Spam complaints received

### Engagement Rates

- **Open Rate** - (Unique Opens / Sent) × 100
- **Click Rate** - (Unique Clicks / Sent) × 100
- **Click-to-Open Rate** - (Unique Clicks / Unique Opens) × 100

### Timeline

View campaign performance over time:

- Opens and clicks by day/hour
- Identify peak engagement times
- Track long-term engagement

<!-- TODO: Add screenshot of campaign analytics -->

## Subscriber Analytics

### Individual Subscriber Activity

View engagement for each subscriber:

- **Email Opens** - Which campaigns they opened
- **Link Clicks** - Which links they clicked
- **Last Activity** - Most recent engagement
- **Status** - Current subscription status

### List Performance

Compare performance across email lists:

- Open rates by list
- Click rates by list
- Subscriber engagement patterns

## Bounce Management

### Soft Bounces

Temporary delivery failures:

- **Mailbox Full** - Recipient's mailbox is full
- **Server Down** - Recipient's mail server is temporarily unavailable
- **Message Too Large** - Email exceeds size limits
- **Auto-Retry** - System may retry delivery

**Handling:**
- Tracked and logged
- Multiple soft bounces may result in blocking
- Configurable threshold in platform settings

### Hard Bounces

Permanent delivery failures:

- **Invalid Email** - Email address doesn't exist
- **Domain Doesn't Exist** - Recipient domain is invalid
- **Blocked** - Recipient server blocks your emails
- **No Retry** - Delivery will not be retried

**Handling:**
- Subscriber automatically marked as "Blocked"
- Excluded from all future campaigns
- Cannot be manually reactivated

## Complaint Management

### Spam Complaints

When subscribers mark emails as spam:

- **Automatic Unsubscribe** - Subscriber immediately unsubscribed
- **Complaint Logged** - Event recorded in analytics
- **Provider Notification** - AWS SES notified of complaint

### Complaint Types

- **Abuse** - General spam complaint
- **Fraud** - Suspected fraudulent content
- **Virus** - Suspected malicious content

## Analytics Dashboard

### Campaign List View

See all campaigns with key metrics:

- Campaign name and status
- Sent count
- Open rate
- Click rate
- Last sent date

### Campaign Detail View

Drill down into individual campaign performance:

- Detailed metrics breakdown
- Timeline of opens and clicks
- Top clicked links
- Bounce and complaint details
- Subscriber-level engagement

<!-- TODO: Add screenshot of detailed analytics -->

## Best Practices

### Monitoring Performance

- Check analytics regularly after sending campaigns
- Compare performance across different campaigns
- Identify trends in engagement
- Use data to improve future campaigns

### Improving Engagement

- Test different subject lines to improve open rates
- Use clear call-to-action buttons to increase clicks
- Segment lists to send more relevant content
- Monitor bounce rates to maintain list health

### List Health

- Regularly review bounce rates
- Remove hard-bounced addresses
- Monitor complaint rates
- Keep unsubscribe process simple and clear

### Privacy Considerations

- Tracking requires images to be loaded
- Some email clients block tracking by default
- Open rates may be lower than actual engagement
- Click tracking is more reliable than open tracking

## Understanding Metrics

### Open Rate

Open rate measures how many subscribers opened your email:

- **Industry Average:** 20-25% for newsletters
- **Factors:** Subject line, sender reputation, timing
- **Limitation:** Only tracks when images load

### Click Rate

Click rate measures how many subscribers clicked links:

- **Industry Average:** 2-5% for newsletters
- **Factors:** Content relevance, call-to-action clarity
- **More Reliable:** Less affected by email client settings

### Bounce Rate

Bounce rate measures delivery failures:

- **Acceptable:** < 2%
- **High:** > 5% indicates list quality issues
- **Action:** Clean list if bounce rate is high

## Related Guides

- [Viewing Analytics](/user-guide/analytics) - How to access and interpret analytics
- [Managing Subscribers](/user-guide/managing-subscribers) - Keep your list healthy
- [Creating Campaigns](/user-guide/creating-campaigns) - Create engaging campaigns

