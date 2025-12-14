"use client"

import {
  Home,
  FileText,
  Bookmark,
  Rss,
  Bot,
  TrendingUp,
  Tag,
  Settings,
  X,
  PlayCircle,
  GraduationCap,
  FilePen,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/lib/i18n"

type UserRole = "viewer" | "author" | "instructor"

const currentUserRole: UserRole = "instructor"

const iconColorMap = {
  Home: "text-blue-500",
  FileText: "text-purple-500",
  PlayCircle: "text-green-500",
  TrendingUp: "text-orange-500",
  Tag: "text-pink-500",
  Users: "text-cyan-500",
  Bookmark: "text-yellow-500",
  FilePen: "text-indigo-500",
  GraduationCap: "text-emerald-500",
  Rss: "text-red-500",
  Bot: "text-violet-500",
  Settings: "text-gray-500",
}

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDesktopOpen, setIsDesktopOpen] = useState(true)
  const { t } = useI18n()

  const navigationSections = {
    viewer: [
      {
        title: t("sidebar.view"),
        items: [
          { name: t("sidebar.dashboard"), href: "/", icon: Home },
          { name: t("sidebar.allArticles"), href: "/articles", icon: FileText },
          { name: t("sidebar.techTube"), href: "/techtube", icon: PlayCircle },
          { name: t("sidebar.trending"), href: "/trending", icon: TrendingUp },
          { name: t("sidebar.tags"), href: "/tags", icon: Tag },
        ],
      },
      {
        title: t("sidebar.myPage"),
        items: [{ name: t("sidebar.bookmarks"), href: "/bookmarks", icon: Bookmark }],
      },
      {
        title: t("sidebar.tools"),
        items: [
          { name: t("sidebar.aiAssistant"), href: "/ai-assistant", icon: Bot },
          { name: t("sidebar.settings"), href: "/settings", icon: Settings },
        ],
      },
    ],
    author: [
      {
        title: t("sidebar.view"),
        items: [
          { name: t("sidebar.dashboard"), href: "/", icon: Home },
          { name: t("sidebar.allArticles"), href: "/articles", icon: FileText },
          { name: t("sidebar.techTube"), href: "/techtube", icon: PlayCircle },
          { name: t("sidebar.trending"), href: "/trending", icon: TrendingUp },
          { name: t("sidebar.tags"), href: "/tags", icon: Tag },
        ],
      },
      {
        title: t("sidebar.create"),
        items: [
          { name: t("sidebar.myArticles"), href: "/my-articles", icon: FileText },
          { name: t("sidebar.drafts"), href: "/drafts", icon: FilePen },
        ],
      },
      {
        title: t("sidebar.myPage"),
        items: [{ name: t("sidebar.bookmarks"), href: "/bookmarks", icon: Bookmark }],
      },
      {
        title: t("sidebar.tools"),
        items: [
          { name: t("sidebar.rssFeeds"), href: "/rss", icon: Rss },
          { name: t("sidebar.aiAssistant"), href: "/ai-assistant", icon: Bot },
          { name: t("sidebar.settings"), href: "/settings", icon: Settings },
        ],
      },
    ],
    instructor: [
      {
        title: t("sidebar.view"),
        items: [
          { name: t("sidebar.dashboard"), href: "/", icon: Home },
          { name: t("sidebar.allArticles"), href: "/articles", icon: FileText },
          { name: t("sidebar.techTube"), href: "/techtube", icon: PlayCircle },
          { name: t("sidebar.trending"), href: "/trending", icon: TrendingUp },
          { name: t("sidebar.tags"), href: "/tags", icon: Tag },
        ],
      },
      {
        title: t("sidebar.create"),
        items: [
          { name: t("sidebar.myArticles"), href: "/my-articles", icon: FileText },
          { name: t("sidebar.drafts"), href: "/drafts", icon: FilePen },
          { name: t("sidebar.instructorCenter"), href: "/instructor", icon: GraduationCap },
        ],
      },
      {
        title: t("sidebar.myPage"),
        items: [{ name: t("sidebar.bookmarks"), href: "/bookmarks", icon: Bookmark }],
      },
      {
        title: t("sidebar.tools"),
        items: [
          { name: t("sidebar.rssFeeds"), href: "/rss", icon: Rss },
          { name: t("sidebar.aiAssistant"), href: "/ai-assistant", icon: Bot },
          { name: t("sidebar.settings"), href: "/settings", icon: Settings },
        ],
      },
    ],
  }

  const sections = navigationSections[currentUserRole]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-20 z-50 hidden md:flex gradient-primary text-white border-0 rounded-full h-10 w-10 shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsDesktopOpen(!isDesktopOpen)}
      >
        {isDesktopOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 bottom-4 z-50 md:hidden gradient-primary text-white border-0 rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-sidebar transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          !isDesktopOpen && "md:-translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-full">
          {sections.map((section, sectionIndex) => (
            <div key={section.title}>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const iconName = item.icon.name as keyof typeof iconColorMap
                const iconColor = iconColorMap[iconName] || "text-muted-foreground"

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "" : iconColor)} />
                    {item.name}
                  </Link>
                )
              })}
              {sectionIndex < sections.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </nav>
      </aside>

      {isOpen && <div className="fixed inset-0 top-14 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
