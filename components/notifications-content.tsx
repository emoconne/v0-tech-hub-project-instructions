"use client"

import { useState } from "react"
import { MessageSquare, Heart, UserPlus, Video, MessageCircle, CheckCheck, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

type Notification = {
  id: string
  type: "comment" | "like" | "follow" | "course_update" | "question_answer" | "mention"
  title: string
  message: string
  link: string
  time: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    title: "新しいコメント",
    message:
      "田中太郎さんがあなたの記事「Next.js 14の新機能解説」にコメントしました：「とても参考になりました。特にServer Actionsの説明が分かりやすかったです。」",
    link: "/articles/1#comment-123",
    time: "5分前",
    date: "2025年1月15日",
    read: false,
  },
  {
    id: "2",
    type: "like",
    title: "いいね",
    message:
      "佐藤花子さん、山田太郎さん、鈴木一郎さん、他3人があなたの記事「TypeScriptで学ぶデザインパターン」に「いいね」しました",
    link: "/articles/2",
    time: "1時間前",
    date: "2025年1月15日",
    read: false,
  },
  {
    id: "3",
    type: "question_answer",
    title: "質問への回答",
    message: "山田先生があなたの質問「Next.jsでのSSRとSSGの使い分けについて」に回答しました",
    link: "/techtube/learn/1?tab=qa",
    time: "2時間前",
    date: "2025年1月15日",
    read: false,
  },
  {
    id: "4",
    type: "course_update",
    title: "コース更新",
    message: "「React完全マスターコース 2024」に新しいセクション「React 19の新機能」が追加されました（3レッスン追加）",
    link: "/techtube/course/1",
    time: "3時間前",
    date: "2025年1月15日",
    read: true,
  },
  {
    id: "5",
    type: "mention",
    title: "メンション",
    message: "鈴木一郎さんが記事「Azure OpenAI Serviceの活用事例」であなたをメンションしました",
    link: "/articles/5",
    time: "5時間前",
    date: "2025年1月15日",
    read: true,
  },
  {
    id: "6",
    type: "follow",
    title: "新しいフォロワー",
    message: "高橋美咲さんがあなたをフォローしました",
    link: "/profile/takahashi",
    time: "1日前",
    date: "2025年1月14日",
    read: true,
  },
  {
    id: "7",
    type: "comment",
    title: "新しいコメント",
    message: "伊藤健一さんがあなたの記事「Azure AI Searchの実践的な使い方」にコメントしました",
    link: "/articles/3#comment-456",
    time: "1日前",
    date: "2025年1月14日",
    read: true,
  },
  {
    id: "8",
    type: "course_update",
    title: "コース更新",
    message: "「TypeScriptで学ぶデザインパターン」のレッスン「Factory Pattern」が更新されました",
    link: "/techtube/course/2",
    time: "2日前",
    date: "2025年1月13日",
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

export function NotificationsContent() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              通知
            </h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount}件の未読通知があります` : "すべての通知を確認済みです"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="gap-2 bg-transparent">
            <CheckCheck className="h-4 w-4" />
            すべて既読にする
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">すべて ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">未読 {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">通知はありません</p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              return (
                <Card
                  key={notification.id}
                  className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : "border-l-4 border-l-gray-200"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center shadow-md ${
                        notification.type === "like"
                          ? "bg-gradient-to-br from-red-400 to-pink-600"
                          : notification.type === "comment" || notification.type === "mention"
                            ? "bg-gradient-to-br from-blue-400 to-indigo-600"
                            : notification.type === "follow"
                              ? "bg-gradient-to-br from-green-400 to-emerald-600"
                              : notification.type === "course_update"
                                ? "bg-gradient-to-br from-purple-400 to-violet-600"
                                : "bg-gradient-to-br from-orange-400 to-amber-600"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-base">{notification.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time} · {notification.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs"
                            >
                              既読にする
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={notification.link}>詳細を見る</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <CheckCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">未読の通知はありません</p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              return (
                <Card
                  key={notification.id}
                  className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : "border-l-4 border-l-gray-200"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center shadow-md ${
                        notification.type === "like"
                          ? "bg-gradient-to-br from-red-400 to-pink-600"
                          : notification.type === "comment" || notification.type === "mention"
                            ? "bg-gradient-to-br from-blue-400 to-indigo-600"
                            : notification.type === "follow"
                              ? "bg-gradient-to-br from-green-400 to-emerald-600"
                              : notification.type === "course_update"
                                ? "bg-gradient-to-br from-purple-400 to-violet-600"
                                : "bg-gradient-to-br from-orange-400 to-amber-600"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-base">{notification.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time} · {notification.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            既読にする
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={notification.link}>詳細を見る</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
