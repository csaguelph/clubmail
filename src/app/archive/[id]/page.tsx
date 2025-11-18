import { notFound } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/server";

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const campaign = await api.campaigns.getCampaignArchive({ campaignId: id });

    return (
      <PageContainer>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-6 shadow">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {campaign.subject}
            </h1>
            <p className="text-sm text-gray-600">
              {campaign.club.name} •{" "}
              {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div
            className="rounded-lg bg-white p-6 shadow"
            dangerouslySetInnerHTML={{ __html: campaign.html }}
          />
        </div>
      </PageContainer>
    );
  } catch (error) {
    notFound();
  }
}
