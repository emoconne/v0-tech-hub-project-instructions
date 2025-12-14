"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Users, FileText, Eye, Heart, MessageSquare, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const recentArticles = [
  {
    id: 1,
    title: {
      ja: "Azure Service Busでマイクロサービスを実装する",
      en: "Implementing Microservices with Azure Service Bus",
    },
    excerpt: {
      ja: "Azure Service Busを使用して信頼性の高いメッセージキューイングでスケーラブルなマイクロサービスを構築するための包括的なガイド...",
      en: "A comprehensive guide to building scalable microservices with reliable message queuing using Azure Service Bus...",
    },
    author: { name: "田中 優樹", avatar: "/placeholder.svg?height=40&width=40" },
    tags: ["Azure", "Microservices", "Architecture"],
    stats: { views: 1245, likes: 89, comments: 23 },
    publishedAt: { ja: "2時間前", en: "2 hours ago" },
  },
  {
    id: 2,
    title: { ja: "Next.js 15 App Routerのベストプラクティス", en: "Next.js 15 App Router Best Practices" },
    excerpt: {
      ja: "Next.js 15 App Routerでパフォーマンスの高いアプリケーションを構築するための最新のベストプラクティスを探る...",
      en: "Explore the latest best practices for building high-performance applications with Next.js 15 App Router...",
    },
    author: { name: "鈴木 健", avatar: "/placeholder.svg?height=40&width=40" },
    tags: ["Next.js", "React", "Frontend"],
    stats: { views: 892, likes: 67, comments: 15 },
    publishedAt: { ja: "5時間前", en: "5 hours ago" },
  },
  {
    id: 3,
    title: { ja: "AIを活用したコードレビュー：学んだこと", en: "AI-Powered Code Review: Lessons Learned" },
    excerpt: {
      ja: "AIを活用したコードレビューツールを導入した経験と開発速度への影響について...",
      en: "Our experience implementing AI-powered code review tools and the impact on development velocity...",
    },
    author: { name: "佐藤 愛子", avatar: "/placeholder.svg?height=40&width=40" },
    tags: ["AI", "DevOps", "Code Quality"],
    stats: { views: 2103, likes: 156, comments: 42 },
    publishedAt: { ja: "1日前", en: "1 day ago" },
  },
]

const trendingTags = [
  { name: "Azure", count: 234 },
  { name: "Next.js", count: 189 },
  { name: "TypeScript", count: 167 },
  { name: "AI/ML", count: 145 },
  { name: "DevOps", count: 123 },
]

export function DashboardContent() {
  const { t, language } = useI18n()

  const stats = [
    {
      label: t("dashboard.totalArticles"),
      value: "1,234",
      icon: FileText,
      trend: "+12%",
      color: "text-purple-600",
      bgGradient: "from-purple-500/20 to-purple-600/10",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: t("dashboard.totalViews"),
      value: "45.2K",
      icon: Eye,
      trend: "+15%",
      color: "text-blue-600",
      bgGradient: "from-blue-500/20 to-blue-600/10",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: t("dashboard.followers"),
      value: "456",
      icon: Users,
      trend: "+8%",
      color: "text-green-600",
      bgGradient: "from-green-500/20 to-green-600/10",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: t("dashboard.completedCourses"),
      value: "89",
      icon: TrendingUp,
      trend: "+24%",
      color: "text-orange-600",
      bgGradient: "from-orange-500/20 to-orange-600/10",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground mt-1">
          {language === "ja"
            ? "おかえりなさい！チームの最新情報をご覧ください。"
            : "Welcome back! Check out the latest updates from your team."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={cn(
              "hover:shadow-xl transition-all duration-300 border-0 overflow-hidden relative group hover:-translate-y-1",
              "bg-gradient-to-br",
              stat.bgGradient,
            )}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-foreground/80">{stat.label}</CardTitle>
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shadow-sm", stat.iconBg)}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <span className={cn("font-semibold px-2 py-0.5 rounded-full text-xs", stat.color, "bg-white/50")}>
                  {stat.trend}
                </span>
                <span>{language === "ja" ? "先月比" : "from last month"}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("dashboard.recentArticles")}</h2>
            <Button variant="ghost" size="sm">
              {t("dashboard.viewAll")}
            </Button>
          </div>

          {recentArticles.map((article, index) => (
            <Card
              key={article.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border overflow-hidden group hover:-translate-y-0.5"
            >
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2",
                  index === 0
                    ? "bg-gradient-to-b from-purple-500 to-purple-600"
                    : index === 1
                      ? "bg-gradient-to-b from-blue-500 to-blue-600"
                      : "bg-gradient-to-b from-green-500 to-green-600",
                )}
              />
              <CardHeader className="pl-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-lg line-clamp-1 text-balance group-hover:text-primary transition-colors">
                      {article.title[language]}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-pretty">{article.excerpt[language]}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 ring-2 ring-white shadow-sm">
                      <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                      <AvatarFallback className="text-xs">{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground font-medium">{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{article.publishedAt[language]}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag, idx) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={cn(
                          "hover:shadow-md transition-all",
                          idx === 0
                            ? "hover:bg-purple-500 hover:text-white"
                            : idx === 1
                              ? "hover:bg-blue-500 hover:text-white"
                              : "hover:bg-green-500 hover:text-white",
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">{article.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-50 text-pink-700">
                      <Heart className="h-3.5 w-3.5" />
                      <span className="font-medium">{article.stats.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="font-medium">{article.stats.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                {t("dashboard.popularTags")}
              </CardTitle>
              <CardDescription>{language === "ja" ? "今週の人気トピック" : "Popular topics this week"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 relative z-10">
              {trendingTags.map((tag, index) => (
                <div
                  key={tag.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/60 transition-all group cursor-pointer"
                >
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium border-2 transition-all shadow-sm",
                      index === 0
                        ? "border-purple-300 text-purple-700 hover:bg-purple-500 hover:text-white hover:border-purple-500"
                        : index === 1
                          ? "border-blue-300 text-blue-700 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                          : index === 2
                            ? "border-green-300 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500"
                            : index === 3
                              ? "border-orange-300 text-orange-700 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                              : "border-pink-300 text-pink-700 hover:bg-pink-500 hover:text-white hover:border-pink-500",
                    )}
                  >
                    {tag.name}
                  </Badge>
                  <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {tag.count} {language === "ja" ? "件" : "posts"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-3xl" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                {language === "ja" ? "クイックアクション" : "Quick Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 relative z-10">
              <Button
                className="w-full justify-start hover:shadow-lg transition-all bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0 hover:scale-105"
                variant="default"
              >
                <FileText className="mr-2 h-4 w-4" />
                {language === "ja" ? "新規記事を作成" : "Create New Article"}
              </Button>
              <Button
                className="w-full justify-start hover:shadow-md transition-all bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-2 border-green-200 hover:border-green-400 hover:scale-105"
                variant="outline"
              >
                <Users className="mr-2 h-4 w-4" />
                {language === "ja" ? "チームメンバーを招待" : "Invite Team Members"}
              </Button>
              <Button
                className="w-full justify-start hover:shadow-md transition-all bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-2 border-orange-200 hover:border-orange-400 hover:scale-105"
                variant="outline"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                {language === "ja" ? "分析を表示" : "View Analytics"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
