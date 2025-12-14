import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { TagDetailContent } from "@/components/tag-detail-content"

export const metadata = {
  title: "タグ詳細 - TechHub",
  description: "タグに関連する記事とコース",
}

export default function TagDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 pt-14">
        <TagDetailContent slug={params.slug} />
      </main>
    </div>
  )
}
