import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { CourseCreator } from "@/components/course-creator"

export default function CreateCoursePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <AppSidebar />
      <main className="md:ml-64 pt-14">
        <CourseCreator />
      </main>
    </div>
  )
}
