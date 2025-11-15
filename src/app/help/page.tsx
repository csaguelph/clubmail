import PageContainer from "@/components/layout/PageContainer";

export default function HelpPage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Help & Documentation</h1>
        <p className="mt-4 text-gray-600">
          Learn how to use ClubsMail to manage your club's email communications.
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Getting Started
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  For Club Administrators
                </h3>
                <p className="mt-2 text-gray-600">
                  Contact a platform administrator to create a club account for your
                  organization. You'll need to provide your club name and primary
                  contact email addresses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  For Platform Administrators
                </h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600">
                  <li>Navigate to the Admin Dashboard</li>
                  <li>Click "Create Club"</li>
                  <li>Enter club details and primary contact emails</li>
                  <li>Primary contacts will receive CLUB_OWNER permissions</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Managing Subscribers
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-600">
                Build your email list by adding subscribers individually or importing
                from CSV:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>
                  <strong>Individual:</strong> Click "Add Subscriber" and enter their
                  email and name
                </li>
                <li>
                  <strong>CSV Import:</strong> Prepare a CSV file with "email,name"
                  format and use the "Import CSV" button
                </li>
                <li>
                  <strong>Unsubscribes:</strong> Handled automatically via links in
                  campaign emails
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Creating Campaigns
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-600">
                Send email campaigns to your subscribers:
              </p>
              <ol className="list-inside list-decimal space-y-2 text-gray-600">
                <li>Configure your club's email settings (sender info, footer, etc.)</li>
                <li>Build your subscriber list</li>
                <li>Create a new campaign with subject and content</li>
                <li>Send a test email to verify appearance</li>
                <li>Schedule or send immediately</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Email Settings
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-600">
                Configure how emails are sent from your club:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>
                  <strong>From Email:</strong> Must be verified in AWS SES
                </li>
                <li>
                  <strong>Reply-To:</strong> Optional separate address for replies
                </li>
                <li>
                  <strong>Footer:</strong> Required for CAN-SPAM compliance
                </li>
                <li>
                  <strong>Physical Address:</strong> Required for commercial emails
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Roles & Permissions
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-600">
                ClubsMail uses a role-based permission system:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>
                  <strong>ADMIN:</strong> Full platform access, can create clubs
                </li>
                <li>
                  <strong>CLUB_OWNER:</strong> Full club access, can manage members
                </li>
                <li>
                  <strong>CLUB_EDITOR:</strong> Can create campaigns and manage
                  subscribers
                </li>
                <li>
                  <strong>CLUB_VIEWER:</strong> Read-only access to club data
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Need More Help?
            </h2>
            <p className="mt-4 text-gray-600">
              For technical support or feature requests, please contact the CSA IT team
              or visit our{" "}
              <a
                href="https://github.com/csaguelph/clubs-mail"
                className="text-[#b1d135] hover:underline"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
