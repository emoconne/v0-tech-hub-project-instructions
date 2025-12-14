import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { ArticleDetailContent } from "@/components/article-detail-content"

export default function ArticleDetailPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="ml-64 p-6">
        <ArticleDetailContent />
      </main>
    </div>
  )
}
