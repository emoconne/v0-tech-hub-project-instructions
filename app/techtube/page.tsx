import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { TechTubeContent } from "@/components/techtube-content"

export default function TechTubePage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 p-4 md:p-6">
        <TechTubeContent />
      </main>
    </div>
  )
}
