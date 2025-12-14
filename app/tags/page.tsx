import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { TagsContent } from "@/components/tags-content"

export const metadata = {
  title: "タグ - TechHub",
  description: "すべてのタグ一覧",
}

export default function TagsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 pt-14">
        <TagsContent />
      </main>
    </div>
  )
}
