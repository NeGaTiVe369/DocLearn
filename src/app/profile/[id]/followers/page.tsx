import { FollowersPage } from "@/features/author-profile/ui/FollowersPage/FollowersPage"

export default async function Followers({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FollowersPage userId={id} />;
}
