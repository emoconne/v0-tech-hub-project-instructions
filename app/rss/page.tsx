import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { RSSManagementContent } from "@/components/rss-management-content"

export default function RSSPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="ml-64 p-6">
        <RSSManagementContent />
      </main>
    </div>
  )
}
