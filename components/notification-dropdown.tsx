"use client"

import { Bell, MessageSquare, Heart, UserPlus, Video, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { useState } from "react"

type Notification = {
  id: string
  type: "comment" | "like" | "follow" | "course_update" | "question_answer" | "mention"
  title: string
  message: string
  link: string
  time: string
  read: boolean
  avatar?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    title: "新しいコメント",
    message: "田中太郎さんがあなたの記事「Next.js 14の新機能解説」にコメントしました",
    link: "/articles/1#comment-123",
    time: "5分前",
    read: false,
  },
  {
    id: "2",
    type: "like",
    title: "いいね",
    message: "佐藤花子さんと他3人があなたの記事に「いいね」しました",
    link: "/articles/2",
    time: "1時間前",
    read: false,
  },
  {
    id: "3",
    type: "question_answer",
    title: "質問への回答",
    message: "山田先生があなたの質問に回答しました",
    link: "/techtube/learn/1?tab=qa",
    time: "2時間前",
    read: false,
  },
  {
    id: "4",
    type: "course_update",
    title: "コース更新",
    message: "「React完全マスターコース」に新しいレッスンが追加されました",
    link: "/techtube/course/1",
    time: "3時間前",
    read: true,
  },
  {
    id: "5",
    type: "mention",
    title: "メンション",
    message: "鈴木一郎さんが記事であなたをメンションしました",
    link: "/articles/5",
    time: "1日前",
    read: true,
  },
  {
    id: "6",
    type: "follow",
    title: "新しいフォロワー",
    message: "高橋美咲さんがあなたをフォローしました",
    link: "/profile/takahashi",
    time: "2日前",
    read: true,
  },
]

const notificationIcons = {
  comment: MessageSquare,
  like: Heart,
  follow: UserPlus,
  course_update: Video,
  question_answer: MessageCircle,
  mention: MessageSquare,
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-base">通知</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                すべて既読
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link href="/notifications">すべて表示</Link>
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>通知はありません</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.slice(0, 6).map((notification) => {
                const Icon = notificationIcons[notification.type]
                return (
                  <Link
                    key={notification.id}
                    href={notification.link}
                    onClick={() => markAsRead(notification.id)}
                    className={`block p-4 hover:bg-accent transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          notification.type === "like"
                            ? "bg-red-100 text-red-600"
                            : notification.type === "comment" || notification.type === "mention"
                              ? "bg-blue-100 text-blue-600"
                              : notification.type === "follow"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "course_update"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && <div className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
