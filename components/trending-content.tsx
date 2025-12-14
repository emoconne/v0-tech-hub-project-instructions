"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Eye, Heart, MessageSquare, PlayCircle, Clock, User } from "lucide-react"
import Link from "next/link"

const trendingArticles = [
  {
    id: 1,
    title: "Azure OpenAI ServiceでRAGを実装する完全ガイド",
    author: "山田太郎",
    views: 2543,
    likes: 234,
    comments: 45,
    tags: ["Azure", "AI", "RAG"],
    publishedAt: "2時間前",
    excerpt: "Azure OpenAI Serviceを使用してRetrieval-Augmented Generation (RAG)を実装する方法を詳しく解説します。",
  },
  {
    id: 2,
    title: "Next.js 15の新機能まとめと移行ガイド",
    author: "佐藤花子",
    views: 1876,
    likes: 189,
    comments: 32,
    tags: ["Next.js", "React", "フロントエンド"],
    publishedAt: "5時間前",
    excerpt: "Next.js 15で追加された新機能と、既存プロジェクトからの移行方法を実例付きで紹介します。",
  },
  {
    id: 3,
    title: "TypeScriptの高度な型システム活用術",
    author: "鈴木一郎",
    views: 1654,
    likes: 167,
    comments: 28,
    tags: ["TypeScript", "型システム"],
    publishedAt: "1日前",
    excerpt:
      "Conditional Types、Mapped Types、Template Literal Typesなど、TypeScriptの高度な型機能を実践的に活用する方法を解説します。",
  },
  {
    id: 4,
    title: "マイクロサービスアーキテクチャの設計パターン",
    author: "田中次郎",
    views: 1432,
    likes: 145,
    comments: 23,
    tags: ["アーキテクチャ", "マイクロサービス"],
    publishedAt: "2日前",
    excerpt: "マイクロサービスアーキテクチャを設計する際の主要なパターンとベストプラクティスを紹介します。",
  },
  {
    id: 5,
    title: "GitHub Actionsで実現するCI/CD完全自動化",
    author: "高橋美咲",
    views: 1298,
    likes: 132,
    comments: 19,
    tags: ["GitHub", "CI/CD", "DevOps"],
    publishedAt: "3日前",
    excerpt: "GitHub Actionsを使用してビルド、テスト、デプロイまでを完全に自動化する方法を解説します。",
  },
]

const trendingCourses = [
  {
    id: 1,
    title: "Azure AI Fundamentals完全マスター",
    instructor: "山田太郎",
    students: 456,
    rating: 4.8,
    lessons: 48,
    duration: "12時間",
    thumbnail: "/azure-ai-course.jpg",
    tags: ["Azure", "AI", "初級"],
  },
  {
    id: 2,
    title: "React完全マスターコース 2024",
    instructor: "佐藤花子",
    students: 389,
    rating: 4.9,
    lessons: 67,
    duration: "18時間",
    thumbnail: "/react-course-thumbnail.jpg",
    tags: ["React", "フロントエンド"],
  },
  {
    id: 3,
    title: "Kubernetesで学ぶコンテナオーケストレーション",
    instructor: "鈴木一郎",
    students: 312,
    rating: 4.7,
    lessons: 42,
    duration: "10時間",
    thumbnail: "/kubernetes-mastery.jpg",
    tags: ["Kubernetes", "Docker", "インフラ"],
  },
  {
    id: 4,
    title: "TypeScriptで学ぶデザインパターン",
    instructor: "田中次郎",
    students: 287,
    rating: 4.6,
    lessons: 35,
    duration: "8時間",
    thumbnail: "/typescript-design-patterns.jpg",
    tags: ["TypeScript", "設計"],
  },
]

const weeklyTopTags = [
  { name: "Azure", count: 245, growth: "+12%" },
  { name: "React", count: 198, growth: "+8%" },
  { name: "TypeScript", count: 176, growth: "+15%" },
  { name: "AI", count: 167, growth: "+23%" },
  { name: "Next.js", count: 145, growth: "+10%" },
  { name: "Docker", count: 132, growth: "+5%" },
  { name: "Kubernetes", count: 121, growth: "+18%" },
  { name: "Python", count: 109, growth: "+7%" },
]

export function TrendingContent() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            トレンド
          </h1>
          <p className="text-muted-foreground">人気の記事とコース</p>
        </div>
      </div>

      {/* 週間人気タグ */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            週間人気タグ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {weeklyTopTags.map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                <Badge className="px-4 py-2 text-sm bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                  <span className="font-medium">{tag.name}</span>
                  <span className="ml-2 text-muted-foreground">({tag.count})</span>
                  <span className="ml-2 font-semibold text-green-600">{tag.growth}</span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* タブ切り替え */}
      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles">人気記事</TabsTrigger>
          <TabsTrigger value="courses">人気コース</TabsTrigger>
        </TabsList>

        {/* 人気記事 */}
        <TabsContent value="articles" className="space-y-4">
          {trendingArticles.map((article, index) => (
            <Card key={article.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* ランキング番号 */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                          : index === 1
                            ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                            : index === 2
                              ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                              : "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* 記事情報 */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link href={`/articles/${article.id}`}>
                        <h3 className="text-xl font-semibold hover:text-primary transition-colors">{article.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {article.comments}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                          <Badge
                            variant="outline"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 人気コース */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {trendingCourses.map((course, index) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=192&width=400&query=${encodeURIComponent(course.title)}`
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 1
                            ? "bg-gray-200 text-gray-700"
                            : index === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <Link href={`/techtube/course/${course.id}`}>
                      <h3 className="text-lg font-semibold hover:text-primary transition-colors">{course.title}</h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {course.students}人が受講中
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="h-4 w-4" />
                      {course.lessons}レッスン
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/techtube/course/${course.id}`}>詳細を見る</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
