import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { CourseDetailContent } from "@/components/course-detail-content"

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 p-4 md:p-6">
        <CourseDetailContent />
      </main>
    </div>
  )
}
