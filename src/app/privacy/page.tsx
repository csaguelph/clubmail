import PageContainer from "@/components/layout/PageContainer";

export default function PrivacyPage() {
  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-gray-500">
          Last updated: November 14, 2025
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Introduction
            </h2>
            <p className="mt-4 text-gray-600">
              ClubMail is operated by the Central Student Association (CSA) at
              the University of Guelph. This privacy policy explains how we
              collect, use, and protect your personal information when you use
              our email management platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Information We Collect
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  User Account Information
                </h3>
                <p className="mt-2 text-gray-600">
                  When you sign in, we collect your name, email address, and
                  profile information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Subscriber Information
                </h3>
                <p className="mt-2 text-gray-600">
                  Club administrators may collect subscriber email addresses and
                  names for the purpose of sending club communications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  We collect email delivery status, bounces, and complaint
                  information from AWS SES to improve deliverability and
                  compliance.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              How We Use Your Information
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              <li>To provide and maintain the ClubMail service</li>
              <li>To authenticate users and manage permissions</li>
              <li>To send email campaigns on behalf of clubs</li>
              <li>To track email delivery and compliance</li>
              <li>To improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Data Sharing
            </h2>
            <p className="mt-4 text-gray-600">
              We do not sell, rent, or share your personal information with
              third parties except:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              <li>With AWS SES for email delivery</li>
              <li>With Microsoft for authentication</li>
              <li>When required by law or legal process</li>
              <li>
                With club administrators for the clubs you&apos;re subscribed to
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Rights
            </h2>
            <p className="mt-4 text-gray-600">You have the right to:</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from email lists at any time</li>
              <li>Opt out of communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Unsubscribing
            </h2>
            <p className="mt-4 text-gray-600">
              Every email includes an unsubscribe link. Clicking this link will
              immediately remove you from that club&apos;s mailing list. You can
              also contact the club directly to request removal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Data Security
            </h2>
            <p className="mt-4 text-gray-600">
              We implement appropriate technical and organizational measures to
              protect your personal information, including:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Encrypted database connections</li>
              <li>Secure authentication via GitHub OAuth</li>
              <li>Role-based access controls</li>
              <li>Regular security updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              CAN-SPAM Compliance
            </h2>
            <p className="mt-4 text-gray-600">
              We comply with the CAN-SPAM Act requirements:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              <li>All emails include accurate sender information</li>
              <li>Subject lines reflect email content</li>
              <li>Physical addresses are included in footers</li>
              <li>Unsubscribe links are present in every email</li>
              <li>Unsubscribe requests are honored immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Changes to This Policy
            </h2>
            <p className="mt-4 text-gray-600">
              We may update this privacy policy from time to time. We will
              notify users of significant changes via email or platform
              notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-gray-600">
              If you have questions about this privacy policy or wish to
              exercise your rights, please contact:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Central Student Association</p>
              <p>University of Guelph</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:csamain@uoguelph.ca"
                  className="text-[#b1d135] hover:underline"
                >
                  csamain@uoguelph.ca
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
