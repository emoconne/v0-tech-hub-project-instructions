import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { AIAssistantContent } from "@/components/ai-assistant-content"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <AppSidebar />
      <main className="ml-64 p-6">
        <AIAssistantContent />
      </main>
    </div>
  )
}
