import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { InstructorDashboard } from "@/components/instructor-dashboard"

export default function InstructorPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 pt-14">
        <InstructorDashboard />
      </main>
    </div>
  )
}
