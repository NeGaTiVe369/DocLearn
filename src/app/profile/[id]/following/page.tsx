import { FollowingPage } from "@/features/author-profile/ui/FollowingPage/FollowingPage"

interface PageProps {
  params: {
    id: string
  }
}

export default function Following({ params }: PageProps) {
  return <FollowingPage userId={params.id} />
}
