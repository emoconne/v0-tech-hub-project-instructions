import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { EditorContent } from "@/components/editor-content"

export default function EditorPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="ml-64 p-6">
        <EditorContent />
      </main>
    </div>
  )
}
