import { FollowersPage } from "@/features/author-profile/ui/FollowersPage/FollowersPage"

interface PageProps {
  params: {
    id: string
  }
}

export default function Followers({ params }: PageProps) {
  return <FollowersPage userId={params.id} />
}
