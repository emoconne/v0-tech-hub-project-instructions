import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { ArticleListContent } from "@/components/article-list-content"

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="ml-64 p-6">
        <ArticleListContent />
      </main>
    </div>
  )
}
