import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { NotificationsContent } from "@/components/notifications-content"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 md:ml-64">
          <NotificationsContent />
        </main>
      </div>
    </div>
  )
}
