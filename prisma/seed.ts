import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

// Helper to generate random dates in the past
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Helper to generate random items from an array
function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

// Helper to generate random number between min and max
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate realistic email design JSON
function generateDesignJson(): string {
  const blocks = [
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "heading" as const,
      content: "Welcome to Our Newsletter!",
      level: 1 as const,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "spacer" as const,
      height: 20,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "richtext" as const,
      content:
        "<p>We're excited to share the latest updates and events with you. This month has been full of amazing activities and we can't wait to tell you about them!</p>",
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "spacer" as const,
      height: 15,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "heading" as const,
      content: "Upcoming Events",
      level: 2 as const,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "richtext" as const,
      content:
        "<p>Don't miss out on these exciting events coming up:</p><ul><li>Annual General Meeting - March 15th</li><li>Social Mixer - March 22nd</li><li>Workshop Series - Every Friday</li></ul>",
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "spacer" as const,
      height: 20,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "button" as const,
      text: "Register Now",
      url: "https://example.com/register",
      align: "center" as const,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "spacer" as const,
      height: 30,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "divider" as const,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "spacer" as const,
      height: 20,
    },
    {
      id: `block-${Math.random().toString(36).substring(7)}`,
      type: "richtext" as const,
      content:
        "<p>Thank you for being part of our community! If you have any questions, feel free to reach out.</p>",
    },
  ];

  return JSON.stringify({ blocks }, null, 2);
}

// Generate simple HTML for campaigns
function generateHTML(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #b1d135;">Welcome to Our Newsletter!</h1>
  <p>We're excited to share the latest updates and events with you. This month has been full of amazing activities and we can't wait to tell you about them!</p>
  <h2>Upcoming Events</h2>
  <p>Don't miss out on these exciting events coming up:</p>
  <ul>
    <li>Annual General Meeting - March 15th</li>
    <li>Social Mixer - March 22nd</li>
    <li>Workshop Series - Every Friday</li>
  </ul>
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://example.com/register" style="background-color: #b1d135; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Register Now</a>
  </div>
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p>Thank you for being part of our community! If you have any questions, feel free to reach out.</p>
</body>
</html>
  `.trim();
}

async function main() {
  console.log("🌱 Starting seed...");

  // Clean up existing demo data
  // Find and delete the demo club if it exists (cascade deletes will handle related data)
  console.log("🧹 Cleaning up existing demo data...");
  const existingDemoClub = await prisma.club.findUnique({
    where: { slug: "csa-demo" },
  });

  if (existingDemoClub) {
    // Delete the club (cascade will handle related data: campaigns, subscribers, email lists, etc.)
    await prisma.club.delete({
      where: { id: existingDemoClub.id },
    });
  }

  // Create demo user
  console.log("👤 Creating demo user...");
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      id: `demo_user_${Date.now()}`,
      email: "demo@example.com",
      name: "Demo User",
      emailVerified: true,
      role: "USER",
      lastLoginAt: new Date(),
    },
  });

  // Create demo club
  console.log("🏢 Creating demo club...");
  const demoClub = await prisma.club.create({
    data: {
      name: "Demo Club",
      slug: "demo",
      organizationEmail: "democlub@example.com",
      isActive: true,
      createdById: demoUser.id,
      settings: {
        create: {
          fromName: "Demo Club",
          fromEmailSlug: "demo",
          replyToEmail: "democlub@example.com",
          defaultSubjectPrefix: "[Demo Club]",
          brandColor: "#b1d135",
          enableTracking: true,
          socialLinks: {
            instagram: "https://instagram.com/csaguelph",
            tiktok: "https://tiktok.com/@csaguelph",
            twitter: "https://twitter.com/csaguelph",
          },
        },
      },
      members: {
        create: {
          userId: demoUser.id,
          role: "CLUB_OWNER",
        },
      },
    },
  });

  // Create email lists
  console.log("📋 Creating email lists...");
  const defaultList = await prisma.emailList.create({
    data: {
      name: "All Members",
      description: "Default list for all club members",
      isDefault: true,
      clubId: demoClub.id,
    },
  });

  const newsletterList = await prisma.emailList.create({
    data: {
      name: "Newsletter Subscribers",
      description: "Members who opted in for monthly newsletters",
      isDefault: false,
      clubId: demoClub.id,
    },
  });

  const eventsList = await prisma.emailList.create({
    data: {
      name: "Event Notifications",
      description: "Members interested in event updates",
      isDefault: false,
      clubId: demoClub.id,
    },
  });

  // Create subscribers
  console.log("👥 Creating subscribers...");
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Avery",
    "Quinn",
    "Sage",
    "River",
    "Sam",
    "Cameron",
    "Dakota",
    "Emery",
    "Finley",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Wilson",
    "Anderson",
    "Thomas",
  ];

  const subscribers = [];
  const subscriberCount = 50;

  for (let i = 0; i < subscriberCount; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@uoguelph.ca`;
    const status = randomItem([
      "SUBSCRIBED",
      "SUBSCRIBED",
      "SUBSCRIBED",
      "SUBSCRIBED",
      "UNSUBSCRIBED",
      "BOUNCED",
    ]) as "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED" | "BLOCKED";

    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        status,
        clubId: demoClub.id,
        customFields: {
          year: randomItem(["1", "2", "3", "4", "Graduate"]),
          major: randomItem([
            "Computer Science",
            "Software Engineering",
            "Data Science",
            "Cybersecurity",
          ]),
        },
        listMemberships: {
          create: [
            {
              emailListId: defaultList.id,
              subscribedAt: randomDate(
                new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                new Date(),
              ),
            },
            ...(Math.random() > 0.3
              ? [
                  {
                    emailListId: newsletterList.id,
                    subscribedAt: randomDate(
                      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                      new Date(),
                    ),
                  },
                ]
              : []),
            ...(Math.random() > 0.5
              ? [
                  {
                    emailListId: eventsList.id,
                    subscribedAt: randomDate(
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                      new Date(),
                    ),
                  },
                ]
              : []),
          ],
        },
      },
    });

    subscribers.push(subscriber);
  }

  // Create campaigns
  console.log("📧 Creating campaigns...");
  const campaignNames = [
    "Welcome Newsletter - Spring 2024",
    "Weekly Update #42",
    "Event Announcement: Hackathon 2024",
    "Monthly Newsletter - March",
    "Important: AGM Reminder",
    "Workshop Series Launch",
    "Social Mixer Invitation",
    "End of Semester Wrap-up",
  ];

  const campaigns = [];

  for (let i = 0; i < campaignNames.length; i++) {
    const name = campaignNames[i]!;
    const createdAt = randomDate(
      new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      new Date(),
    );
    const status = randomItem([
      "DRAFT",
      "DRAFT",
      "SENT",
      "SENT",
      "SENT",
      "SCHEDULED",
    ]) as "DRAFT" | "SCHEDULED" | "SENDING" | "SENT" | "FAILED" | "CANCELLED";

    let startedAt: Date | null = null;
    let finishedAt: Date | null = null;
    let scheduledFor: Date | null = null;

    if (status === "SENT") {
      startedAt = new Date(createdAt.getTime() + 60 * 60 * 1000); // 1 hour after creation
      finishedAt = new Date(startedAt.getTime() + 30 * 60 * 1000); // 30 minutes later
    } else if (status === "SCHEDULED") {
      scheduledFor = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        subject: name.includes("Welcome")
          ? "Welcome to CSA! 🎉"
          : name.includes("Event")
            ? "🎯 New Event: Hackathon 2024"
            : name.includes("AGM")
              ? "[Important] Annual General Meeting Reminder"
              : name.includes("Workshop")
                ? "🚀 New Workshop Series Starting Soon"
                : name.includes("Social")
                  ? "🍕 Join Us for a Social Mixer!"
                  : "CSA Newsletter Update",
        preheaderText: randomItem([
          "Your weekly dose of CSA updates",
          "Don't miss out on upcoming events",
          "Important announcements inside",
          "See what's happening this month",
          null,
        ]),
        fromName: "CSA Team",
        fromEmail: "csa@uoguelph.ca",
        designJson: generateDesignJson(),
        html: generateHTML(),
        status,
        scheduledFor,
        startedAt,
        finishedAt,
        tags: randomItem([
          ["newsletter"],
          ["event"],
          ["announcement"],
          ["newsletter", "update"],
          [],
        ]),
        createdAt,
        clubId: demoClub.id,
        emailListId: randomItem([defaultList.id, newsletterList.id]),
        createdById: demoUser.id,
      },
    });

    campaigns.push(campaign);
  }

  // Create email sends (Email records) for sent campaigns
  console.log("📨 Creating email sends...");
  const sentCampaigns = campaigns.filter((c) => c.status === "SENT");
  const emails = [];

  for (const campaign of sentCampaigns) {
    // Get subscribers from the campaign's email list
    const listMemberships = await prisma.subscriberListMembership.findMany({
      where: {
        emailListId: campaign.emailListId,
        unsubscribedAt: null,
      },
      include: {
        subscriber: true,
      },
    });

    const activeSubscribers = listMemberships
      .map((m) => m.subscriber)
      .filter((s) => s.status === "SUBSCRIBED");

    // Create email records for a random subset (70-100% of subscribers)
    const sendCount = Math.floor(
      activeSubscribers.length * (0.7 + Math.random() * 0.3),
    );
    const selectedSubscribers = activeSubscribers
      .sort(() => Math.random() - 0.5)
      .slice(0, sendCount);

    for (const subscriber of selectedSubscribers) {
      const sentAt = campaign.startedAt
        ? randomDate(campaign.startedAt, campaign.finishedAt || new Date())
        : null;

      const emailStatus = randomItem([
        "SENT",
        "SENT",
        "SENT",
        "DELIVERED",
        "DELIVERED",
        "DELIVERED",
        "BOUNCED",
        "COMPLAINED",
      ]) as
        | "QUEUED"
        | "SENT"
        | "DELIVERED"
        | "BOUNCED"
        | "COMPLAINED"
        | "FAILED";

      const email = await prisma.email.create({
        data: {
          status: emailStatus,
          sentAt,
          campaignId: campaign.id,
          subscriberId: subscriber.id,
          providerMessageId: `ses-${Math.random().toString(36).substring(2, 15)}`,
        },
      });

      emails.push({ email, subscriber, campaign });
    }
  }

  // Create tracking events (opens, clicks)
  // Only create events for DELIVERED emails to match calculation logic
  console.log("📊 Creating tracking events...");
  for (const { email, subscriber } of emails) {
    if (email.status === "DELIVERED") {
      // 30-60% open rate
      const willOpen = Math.random() < 0.4 + Math.random() * 0.2;
      if (willOpen) {
        const openCount = randomInt(1, 3); // Some people open multiple times
        for (let i = 0; i < openCount; i++) {
          await prisma.emailOpen.create({
            data: {
              emailId: email.id,
              userAgent: randomItem([
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
              ]),
              ipAddress: `192.168.${randomInt(1, 255)}.${randomInt(1, 255)}`,
              openedAt: randomDate(email.sentAt || new Date(), new Date()),
            },
          });
        }

        // 20-40% click rate (of those who opened)
        const willClick = Math.random() < 0.3;
        if (willClick) {
          const clickCount = randomInt(1, 2);
          const urls = [
            "https://example.com/register",
            "https://example.com/events",
            "https://example.com/workshops",
          ];

          for (let i = 0; i < clickCount; i++) {
            await prisma.emailClick.create({
              data: {
                emailId: email.id,
                url: randomItem(urls),
                userAgent: randomItem([
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                ]),
                ipAddress: `192.168.${randomInt(1, 255)}.${randomInt(1, 255)}`,
                clickedAt: randomDate(email.sentAt || new Date(), new Date()),
              },
            });
          }
        }
      }
    }

    // Create bounce events for bounced emails
    if (email.status === "BOUNCED") {
      await prisma.bounceEvent.create({
        data: {
          emailId: email.id,
          subscriberId: subscriber.id,
          bounceType: randomItem(["SOFT", "HARD"]) as "SOFT" | "HARD",
          bounceSubType: randomItem([
            "General",
            "MailboxFull",
            "MessageTooLarge",
            "ContentRejected",
          ]),
          diagnosticCode: randomItem([
            "550 5.1.1 User unknown",
            "550 5.2.2 Mailbox full",
            "550 5.7.1 Message rejected",
          ]),
          providerMessageId: email.providerMessageId || undefined,
          action: "failed",
          status: "5.0.0",
          createdAt: email.sentAt || new Date(),
        },
      });
    }

    // Create complaint events for complained emails
    if (email.status === "COMPLAINED") {
      await prisma.complaintEvent.create({
        data: {
          emailId: email.id,
          subscriberId: subscriber.id,
          complaintFeedbackType: randomItem(["abuse", "fraud", null]),
          providerMessageId: email.providerMessageId || undefined,
          arrivalDate: email.sentAt || undefined,
          createdAt: email.sentAt || new Date(),
        },
      });
    }
  }

  console.log("✅ Seed completed successfully!");
  console.log(`
📊 Summary:
  - 1 Demo User (${demoUser.email})
  - 1 Demo Club (${demoClub.name})
  - 3 Email Lists
  - ${subscribers.length} Subscribers
  - ${campaigns.length} Campaigns
  - ${emails.length} Email Sends
  - Tracking events (opens, clicks, bounces, complaints)

You can now log in with: ${demoUser.email}
Club slug: ${demoClub.slug}
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
