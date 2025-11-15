# Clubs Emailing Platform – Project Outline

## 0. Context & Assumptions

- Existing stack: T3 (Next.js, tRPC, Prisma, BetterAuth, Tailwind, etc.).
- User auth is **already implemented**.
- This file is a **high-level technical and product outline**, meant to guide Copilot/Claude when generating code and tasks.
- Primary goal: let student clubs send emails to their members safely, without giving them direct access to shared Outlook/Gmail lists.

---

## 1. High-Level Goals

1. Multi-tenant “Clubs” context:
   - Platform Admins can create and manage clubs.
   - Club “primary contacts” can manage their club’s settings, lists, and campaigns.
2. Simple but robust permission model:
   - `ADMIN` role can bypass all club-level permissions.
   - Club-scoped roles for executives.
3. Per-club email list management:
   - MVP: one email list per club.
   - Designed to scale to multiple lists/segments later.
4. Visual email editor:
   - Block-based, non-technical UI.
   - Store structured design + generated HTML.
5. Email campaigns:
   - Create, preview, test-send, and send-now workflows.
   - Basic status + logs (sent / failed).
6. Security / compliance:
   - Strong club scoping, no cross-club data leaks.
   - Basic unsubscribe support and audit trails.
   - Foundation for CASL/GDPR-ish compliance later.

---

## 2. Roles, Permissions & Multi-Tenancy

### 2.1 Global Roles

- `ADMIN`
  - Can view/manage all clubs, users, lists, campaigns.
  - Can impersonate (for debugging) if desired.
  - Can configure global email provider settings.

- `USER` (default)
  - No special privileges unless tied to a club.

Assume roles stored on `User` (e.g., `role: "ADMIN" | "USER"`).

### 2.2 Club-Level Roles

Each club has its own role assignments for users. MVP can keep this simple but extendable:

- `CLUB_OWNER`
  - Typically the 2 primary contacts on the club.
  - Can manage club settings, members, lists, campaigns.
  - Can invite/remove other users from the club.

- `CLUB_EDITOR`
  - Can create/edit campaigns, manage lists.
  - Can send campaigns (MVP), or split `EDITOR` vs `SENDER` later.

- `CLUB_VIEWER` (optional for MVP)
  - Read-only access to lists and campaigns.

Implementation idea:
- `ClubMember` model with `role` field.
- A club always has at least one `CLUB_OWNER`.

### 2.3 Permission Checks

Patterns (tRPC middleware / helper functions):

- `requireAuth()`: ensures user is logged in.
- `requireAdmin()`: ensures `user.role === "ADMIN"`.
- `requireClubRole(clubId, allowedRoles)`: 
  - Checks membership: `ClubMember` with matching user + club + role in `allowedRoles`.
  - `ADMIN` bypasses this check.
- For all club-specific data access:
  - Query must be filtered by `clubId`.
  - Middleware ensures `clubId` belongs to a club the user can access.

---

## 3. Data Model (Conceptual)

Use this section to guide Prisma schema design.

### 3.1 Core Entities

- **User**
  - `id`
  - `email`
  - `name`
  - `role` (`ADMIN` / `USER`)
  - Auth-related fields (from existing setup).

- **Club**
  - `id`
  - `name`
  - `slug` (for URLs)
  - `createdByUserId`
  - `createdAt`, `updatedAt`
  - `isActive`

- **ClubMember**
  - `id`
  - `clubId` (FK)
  - `userId` (FK)
  - `role` (`CLUB_OWNER`, `CLUB_EDITOR`, `CLUB_VIEWER`, etc.)
  - `createdAt`

- **ClubSettings**
  - `id`
  - `clubId` (unique)
  - `fromName`
  - `fromEmail` (validated / enforced domain)
  - `replyToEmail`
  - `defaultSubjectPrefix` (optional, e.g., `[Club Name]`)
  - `footerText` / legal footer
  - `physicalAddress` (for compliance).

### 3.2 Lists & Subscribers

- **EmailList**
  - `id`
  - `clubId`
  - `name` (MVP: one list like `"Main list"`)
  - `description`
  - `isDefault` (for MVP, always true)
  - `createdAt`

- **Subscriber**
  - `id`
  - `email`
  - `name` (optional)
  - `clubId` (helps with segmentation and future multi-list design)
  - `status` (`SUBSCRIBED`, `UNSUBSCRIBED`, `BOUNCED`, etc.)
  - `unsubscribeToken` / `hash` for one-click unsubscribe.
  - `createdAt`, `updatedAt`

- **SubscriberListMembership** (for future multi-list support; MVP can still use it)
  - `subscriberId`
  - `emailListId`
  - (composite PK)
  - Optional: `subscribedAt`, `unsubscribedAt`.

### 3.3 Email Content & Campaigns

- **EmailTemplate** (optional for MVP, but useful)
  - `id`
  - `clubId`
  - `name`
  - `description`
  - `designJson` (block-based definition)
  - `html` (rendered output)
  - `createdByUserId`
  - `createdAt`, `updatedAt`

- **Campaign**
  - `id`
  - `clubId`
  - `emailListId`
  - `name` (internal label)
  - `subject`
  - `preheaderText`
  - `fromName`, `fromEmail` (snapshot from `ClubSettings` at time of creation)
  - `designJson`
  - `html`
  - `status` (`DRAFT`, `SCHEDULED`, `SENDING`, `SENT`, `FAILED`, `CANCELLED`)
  - `scheduledAt` (nullable)
  - `startedAt`, `finishedAt`
  - `createdByUserId`

- **EmailEvent / DeliveryLog**
  - `id`
  - `campaignId`
  - `subscriberId`
  - `providerMessageId`
  - `status` (`QUEUED`, `SENT`, `DELIVERED`, `BOUNCED`, `COMPLAINED`, etc.)
  - `errorMessage` (nullable)
  - `timestamp`

---

## 4. Email Provider Integration

### 4.1 MVP Choice

- Use a single, centrally configured email provider (e.g., Resend, SES, Postmark, SendGrid, etc.).
- Store API keys in environment variables; no UI needed for provider config in MVP.

### 4.2 Sending Approach

- For MVP:
  - Simple backend function to iterate over subscribers and send emails synchronously, with basic throttling.
- Next step:
  - Introduce a queue / background job system (Inngest, background queue, etc.) to:
    - Avoid timeouts on large lists.
    - Retry on failure.
    - Track progress.

### 4.3 Tracking & Unsubscribe

- Embed unsubscribe link in footer:
  - Unique URL: `/unsubscribe?token=...`
  - Marks `Subscriber.status = "UNSUBSCRIBED"` and removes from active mailings.
- Optionally:
  - Track open/click events via provider webhooks (future enhancement).

---

## 5. Visual Email Editor

### 5.1 Requirements

- Easy for non-technical club execs.
- Basic set of blocks:
  - Heading (H1/H2)
  - Paragraph
  - Button (URL)
  - Image (URL)
  - Divider
  - Spacer
  - Simple 1-column layout (MVP).
- Live preview of desktop view (mobile can be a later improvement).

### 5.2 Storage Strategy

- `designJson`:
  - Library-specific or custom JSON representation of blocks.
  - Used to re-open editor with same structure.
- `html`:
  - Rendered HTML output (responsive).
  - Used for actual sending.

### 5.3 Usage Flow

1. User creates new Campaign.
2. User opens visual editor:
   - Adds/edits blocks, subject, preheader, etc.
3. On save:
   - Save `designJson` + generated `html` to `Campaign`.
4. Testing:
   - Button to send test email to self / fixed test address.

---

## 6. Club Admin Workflows

### 6.1 Platform Admin: Create Club

1. Admin visits `/admin/clubs`.
2. Click “Create club”:
   - Provide: `name`, `slug`, initial `primaryContactsEmails`.
3. System flow:
   - Create `Club`.
   - Create `ClubSettings` with default values.
   - Ensure each primary contact has a `User` record:
     - If not, create a stub user and send an invite email.
   - Create `ClubMember` records with role `CLUB_OWNER`.
   - Create default `EmailList` (`"Main List"`).

### 6.2 Club Owner: Setup Club

1. Log in and select club from dashboard.
2. Complete onboarding form:
   - Set `fromName`, `fromEmail`, `replyToEmail`.
   - Configure footer / legal text.
3. Confirm email address if required (future: verification flow with provider).

---

## 7. List & Subscriber Management

### 7.1 MVP Features

- View subscribers table:
  - Email, name, status, createdAt, lastUpdated.
- Add subscriber:
  - Simple form: email, optional name.
- Bulk import:
  - Upload CSV with columns: `email`, `name`.
  - Validate, show summary, confirm import.
- Unsubscribe:
  - Manually from UI.
  - Via unsubscribe link in emails.

### 7.2 Future Enhancements

- Multiple lists per club.
- Segments (e.g., “first-year only”, “attended event X”).
- Custom fields per subscriber (program, grad year, etc.).

---

## 8. Campaign Lifecycle

### 8.1 MVP Flow

1. **Create Campaign**
   - From club dashboard, click “New Campaign”.
   - Choose list (MVP: default list), set internal name.

2. **Edit Content**
   - Open visual editor for subject, preheader, content blocks.

3. **Review & Test**
   - Summary page:
     - Subject, from, preheader, list size estimate.
   - Send test email(s).

4. **Send**
   - Click “Send now”.
   - Backend sends to all `SUBSCRIBED` subscribers on list.
   - Campaign status transitions:
     - `DRAFT` → `SENDING` → `SENT` or `FAILED`.

5. **View Results**
   - Basic stats:
     - Total recipients.
     - Sent vs failed count.
     - (Future: opens, clicks).

### 8.2 Scheduling (Optional for MVP)

- Add `scheduledAt` field.
- Background job that polls and dispatches due campaigns.

---

## 9. API / tRPC Structure (Conceptual)

### 9.1 Routers

- `auth` (existing)
- `admin` (for global admin operations)
  - `admin.clubs`:
    - `listClubs`
    - `createClub`
    - `getClub` / `updateClub`
  - `admin.users` (optional)
- `clubs`:
  - `listMyClubs`
  - `getClubDetails(clubId)`
- `clubMembers`:
  - `listMembers(clubId)`
  - `addMember(clubId, userEmail, role)`
  - `updateMemberRole`
  - `removeMember`
- `clubSettings`:
  - `getSettings(clubId)`
  - `updateSettings(clubId, data)`
- `emailLists`:
  - `getDefaultList(clubId)`
  - `listLists(clubId)`
  - `createList` (future)
- `subscribers`:
  - `listSubscribers(clubId, listId)`
  - `createSubscriber`
  - `bulkImport`
  - `updateSubscriber`
  - `unsubscribe`
- `campaigns`:
  - `listCampaigns(clubId)`
  - `getCampaign(clubId, campaignId)`
  - `createCampaign`
  - `updateCampaign`
  - `deleteCampaign` (if draft)
  - `sendTest`
  - `sendCampaign`

Each router should:
- Use middleware to require auth.
- Use `requireAdmin` or `requireClubRole` as appropriate.
- Always scope queries by `clubId`.

---

## 10. Security & Compliance Considerations

- **Club isolation**:
  - Every query / mutation that touches club data must be scoped by `clubId` and checked against membership.
  - Never trust client-provided `clubId` without verifying membership.
- **Email safety**:
  - Avoid exposure of full lists to unauthorized users.
  - Avoid exporting lists (or log access if allowed).
- **Audit logging**:
  - Log key actions:
    - Creating/deleting clubs, lists, campaigns.
    - Sending campaigns.
  - Store basic `who/what/when` data.
- **Unsubscribe compliance**:
  - Unsubscribe link must be present on all emails (enforced in rendering).
  - Ensure unsubscribed users are not included in sends.

---

## 11. MVP Scope vs Future Enhancements

### 11.1 MVP (First Release)

- Roles:
  - Global: `ADMIN`, `USER`.
  - Club: `CLUB_OWNER`, `CLUB_EDITOR`.
- Features:
  - Admin UI to create clubs, assign primary contacts.
  - Club onboarding + settings.
  - Single default email list per club.
  - Subscriber CRUD + CSV import.
  - Visual editor with basic blocks.
  - Campaign CRUD, test sending, send-now.
  - Single global email provider integration.
  - Unsubscribe links and basic status tracking.
  - Simple campaign stats (total recipients, sent, failed).

### 11.2 Future Features

- Multiple lists and segments per club.
- Advanced analytics (opens, clicks, provider webhooks).
- Scheduling / recurring campaigns.
- Public subscription forms per club.
- Deep integration with campus systems (e.g., auto-sync members).
- Template gallery (CSA-branded templates for clubs).
- Per-club domain / from-address management + verification.
- More granular roles (`CLUB_SENDER`, `CLUB_ANALYST`, etc.).

---

## 12. Suggested Implementation Order

1. **Data models & Prisma migrations** for:
   - `Club`, `ClubMember`, `ClubSettings`
   - `EmailList`, `Subscriber`, `SubscriberListMembership`
   - `Campaign`, `EmailEvent`
2. **Permission middleware**:
   - `requireAuth`, `requireAdmin`, `requireClubRole`.
3. **Admin UI**:
   - Create/list clubs.
   - Set primary contacts.
4. **Club dashboard**:
   - Switch clubs.
   - Basic overview.
5. **Club settings UI**.
6. **List & subscriber management UI**:
   - Table, add/edit, import.
7. **Visual email editor integration**.
8. **Campaign creation + sending**:
   - Test send.
   - Send-now with simple sending loop.
9. **Unsubscribe endpoint & footer enforcement**.
10. **Basic analytics & logs UI**.

Use this outline as the “master plan” and have Copilot/Claude generate:
- Prisma schemas.
- tRPC routers with middleware.
- React components for admin/club dashboards.
- Integration with the chosen email provider.
- Tests for permission logic and sending logic.

