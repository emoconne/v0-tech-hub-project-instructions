import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 p-4 md:p-6">
        <DashboardContent />
      </main>
    </div>
  )
}
