"use client";

import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/react";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SubscribePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: club, isLoading: clubLoading } = api.clubs.getPublicClubInfo.useQuery(
    { slug },
    { retry: false }
  );

  const subscribeMutation = api.subscribers.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!club) return;

    subscribeMutation.mutate({
      clubId: club.id,
      email,
      name: name || undefined,
    });
  };

  if (clubLoading) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </PageContainer>
    );
  }

  if (!club) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Club Not Found</h1>
          <p className="mt-4 text-gray-600">
            The club you&apos;re looking for doesn&apos;t exist or is not accepting
            subscriptions.
          </p>
        </div>
      </PageContainer>
    );
  }

  if (submitted) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {subscribeMutation.data?.alreadySubscribed
              ? "Already Subscribed"
              : subscribeMutation.data?.resubscribed
                ? "Resubscribed Successfully"
                : "Subscribed Successfully"}
          </h1>
          <p className="mt-4 text-gray-600">
            {subscribeMutation.data?.alreadySubscribed
              ? `You&apos;re already subscribed to ${club.name}. You&apos;ll continue to receive our emails.`
              : subscribeMutation.data?.resubscribed
                ? `Welcome back! You&apos;ve been resubscribed to ${club.name}&apos;s mailing list.`
                : `Thank you for subscribing to ${club.name}! You&apos;ll start receiving our emails soon.`}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            You can unsubscribe at any time using the link in our emails.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#b1d135]">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Subscribe to {club.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Join {club._count.subscribers.toLocaleString()} other{" "}
            {club._count.subscribers === 1 ? "subscriber" : "subscribers"} and
            stay up to date with {club.settings?.fromName ?? club.name}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-[#b1d135]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-[#b1d135]"
              placeholder="Your name"
            />
            <p className="mt-1 text-sm text-gray-500">
              We&apos;ll use your name to personalize our emails.
            </p>
          </div>

          {subscribeMutation.error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {subscribeMutation.error.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="flex w-full justify-center rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a0c030] focus:outline-none focus:ring-2 focus:ring-[#b1d135] focus:ring-offset-2 disabled:opacity-50"
          >
            {subscribeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            By subscribing, you agree to receive emails from {club.name}. You
            can unsubscribe at any time.
          </p>
        </form>
      </div>
    </PageContainer>
  );
}
