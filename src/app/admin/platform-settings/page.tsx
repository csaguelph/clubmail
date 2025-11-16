import { PlatformSettingsManager } from "@/components/admin/PlatformSettingsManager";
import PageContainer from "@/components/layout/PageContainer";
import { requireAdmin } from "@/server/auth-utils";

export default async function PlatformSettingsPage() {
  await requireAdmin();

  return (
    <PageContainer>
      <PlatformSettingsManager />
    </PageContainer>
  );
}
