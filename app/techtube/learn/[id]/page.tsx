import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { VideoPlayerContent } from "@/components/video-player-content"

export default function VideoPlayerPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 mt-14 ml-0 lg:ml-64 overflow-auto">
          <VideoPlayerContent />
        </main>
      </div>
    </div>
  )
}
