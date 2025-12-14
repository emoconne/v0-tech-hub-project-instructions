import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { TrendingContent } from "@/components/trending-content"

export const metadata = {
  title: "トレンド - TechHub",
  description: "人気の記事とコース",
}

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 pt-14">
        <TrendingContent />
      </main>
    </div>
  )
}
