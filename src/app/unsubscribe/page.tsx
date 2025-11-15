import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/server";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Invalid Link</h1>
          <p className="mt-4 text-gray-600">
            This unsubscribe link is invalid or has expired.
          </p>
        </div>
      </PageContainer>
    );
  }

  // Handle test token specially
  if (token === "test") {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Test Email Unsubscribe Link
          </h1>
          <p className="mt-4 text-gray-600">
            This is a test email, so this unsubscribe link won&apos;t actually
            unsubscribe anyone. In a real campaign, clicking this link would
            unsubscribe the recipient from the mailing list.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            The unsubscribe functionality is working correctly and will be
            active when you send the campaign to your subscribers.
          </p>
        </div>
      </PageContainer>
    );
  }

  try {
    await api.subscribers.unsubscribe({ token });

    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Unsubscribed Successfully
          </h1>
          <p className="mt-4 text-gray-600">
            You have been successfully unsubscribed from this mailing list. You
            will no longer receive emails from this club.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            If you unsubscribed by mistake, please contact the club directly to
            resubscribe.
          </p>
        </div>
      </PageContainer>
    );
  } catch (error) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Unsubscribe Failed
          </h1>
          <p className="mt-4 text-gray-600">
            {error instanceof Error
              ? error.message
              : "An error occurred while processing your request."}
          </p>
        </div>
      </PageContainer>
    );
  }
}
