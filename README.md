# CSA ClubMail

> Professional email campaigns for student clubs

ClubMail is a comprehensive email marketing platform designed specifically for CSA Clubs. Create beautiful email campaigns, manage subscribers, and track engagement—all with an intuitive drag-and-drop editor.

## ✨ Features

### 📧 Email Campaigns
- **Drag-and-Drop Editor** - Build beautiful emails with a visual editor (no coding required)
- **Scheduled Sending** - Schedule campaigns for future delivery
- **Campaign Management** - Draft, edit, and track all your email campaigns
- **Email Templates** - Professional, responsive email templates powered by React Email
- **Variable Placeholders** - Personalize emails with dynamic variables (see [Variable Placeholders Documentation](./docs/VARIABLE_PLACEHOLDERS.md))

### 👥 Subscriber Management
- **Email Lists** - Organize subscribers into multiple lists
- **CSV Import/Export** - Bulk import and export subscriber data
- **Custom Fields** - Store additional subscriber information
- **Unsubscribe Handling** - Automatic unsubscribe link generation and processing

### 🎯 Club Management
- **Multi-Club Support** - Manage multiple clubs from one account
- **Role-Based Access** - Owner, Editor, and Viewer roles for team collaboration
- **Club Settings** - Customize branding, sender information, and email preferences
- **GryphLife Integration** - Optional integration with GryphLife platform

### 📊 Analytics & Tracking
- **Open Tracking** - Monitor email open rates
- **Click Tracking** - Track link clicks in your campaigns
- **Bounce Management** - Automatic handling of soft and hard bounces
- **Complaint Handling** - Process and respond to spam complaints

### 🖼️ Media Management
- **Image Uploads** - Upload and manage images for your campaigns
- **Cloudflare R2 Storage** - Scalable media storage

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Backend**: [tRPC](https://trpc.io/) for type-safe APIs
- **Database**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Email Sending**: [AWS SES](https://aws.amazon.com/ses/)
- **Queue Management**: [Upstash QStash](https://upstash.com/docs/qstash/overview)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm 10+
- PostgreSQL database
- (Optional) AWS SES credentials for sending emails
- (Optional) Upstash QStash for scheduled campaigns
- (Optional) Cloudflare R2 for media storage

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:csaguelph/clubmail.git
   cd clubmail
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory based on `.env.example`
   
   ```bash
   cp .env.example .env
   ```

4. **Set up the database**
   
   Using Docker Compose (recommended for development):
   ```bash
   docker-compose up -d
   ```
   
   Or use your own PostgreSQL instance and update `DATABASE_URL` accordingly.

5. **Run database migrations**
   ```bash
   pnpm db:generate
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:write` - Format code with Prettier
- `pnpm db:generate` - Generate Prisma client and run migrations
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm db:push` - Push schema changes to database (dev only)

## 🏗️ Project Structure

```
clubmail/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── clubs/            # Club management pages
│   │   ├── admin/            # Admin pages
│   │   └── api/              # API routes
│   ├── components/           # React components
│   ├── lib/                  # Utility functions
│   │   └── email-editor/     # Email editor components
│   ├── server/               # Server-side code
│   │   ├── api/              # tRPC routers
│   │   └── better-auth/      # Auth configuration
│   └── trpc/                 # tRPC client setup
└── public/                   # Static assets
```

## 🔐 Authentication

ClubMail uses Better Auth with Microsoft OAuth for authentication. Users can sign in with their Microsoft account to access the platform.

## 📧 Email Sending

The application uses AWS SES for sending emails. Campaigns can be sent immediately or scheduled for future delivery using Upstash QStash.

## 🗄️ Database

The application uses PostgreSQL with Prisma ORM. The schema includes models for:
- Users and authentication
- Clubs and memberships
- Email lists and subscribers
- Campaigns and email tracking
- Media uploads
- Bounce and complaint events

## 📚 Documentation

- [Variable Placeholders Guide](./docs/VARIABLE_PLACEHOLDERS.md) - Learn how to use dynamic variables in your email campaigns

## 📄 License

See [LICENSE.md](./LICENSE.md) for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by your CSA