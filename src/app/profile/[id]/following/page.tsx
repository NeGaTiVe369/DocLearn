import { FollowingPage } from "@/features/author-profile/ui/FollowingPage/FollowingPage"

export default async function Following({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FollowingPage userId={id} />;
}
