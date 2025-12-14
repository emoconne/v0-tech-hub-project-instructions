"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hash, Eye, Heart, MessageSquare, Clock, User, BookmarkPlus, PlayCircle } from "lucide-react"
import Link from "next/link"

const tagData: Record<string, any> = {
  azure: {
    name: "Azure",
    description: "Microsoft Azureに関する記事とコース",
    category: "クラウド",
    followers: 1234,
    articles: [
      {
        id: 1,
        title: "Azure OpenAI ServiceでRAGを実装する完全ガイド",
        author: "山田太郎",
        views: 2543,
        likes: 234,
        comments: 45,
        publishedAt: "2時間前",
        excerpt: "Azure OpenAI Serviceを使用してRetrieval-Augmented Generation (RAG)を実装する方法を詳しく解説します。",
      },
      {
        id: 2,
        title: "Azure Functionsでサーバーレスアプリを構築する",
        author: "佐藤花子",
        views: 1876,
        likes: 189,
        comments: 32,
        publishedAt: "1日前",
        excerpt: "Azure Functionsを使ってスケーラブルなサーバーレスアプリケーションを構築する方法を紹介します。",
      },
    ],
    courses: [
      {
        id: 1,
        title: "Azure AI Fundamentals完全マスター",
        instructor: "山田太郎",
        students: 456,
        rating: 4.8,
        lessons: 48,
        duration: "12時間",
        thumbnail: "/azure-ai-course.jpg",
      },
    ],
  },
  react: {
    name: "React",
    description: "Reactに関する記事とコース",
    category: "フロントエンド",
    followers: 2156,
    articles: [
      {
        id: 3,
        title: "React 19の新機能を徹底解説",
        author: "鈴木一郎",
        views: 3210,
        likes: 312,
        comments: 67,
        publishedAt: "3時間前",
        excerpt: "React 19で追加された新機能と、それらを活用した実践的な使い方を紹介します。",
      },
    ],
    courses: [
      {
        id: 2,
        title: "React完全マスターコース 2024",
        instructor: "佐藤花子",
        students: 389,
        rating: 4.9,
        lessons: 67,
        duration: "18時間",
        thumbnail: "/react-course-thumbnail.jpg",
      },
    ],
  },
}

export function TagDetailContent({ slug }: { slug: string }) {
  const tag = tagData[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `${slug}に関する記事とコース`,
    category: "その他",
    followers: 0,
    articles: [],
    courses: [],
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Hash className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{tag.name}</h1>
                  <Badge variant="secondary" className="mt-1">
                    {tag.category}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{tag.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{tag.followers}人がフォロー中</span>
                <span>•</span>
                <span>{tag.articles.length + tag.courses.length}件の投稿</span>
              </div>
            </div>
            <Button>
              <BookmarkPlus className="h-4 w-4 mr-2" />
              フォロー
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* タブ切り替え */}
      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles">記事 ({tag.articles.length})</TabsTrigger>
          <TabsTrigger value="courses">コース ({tag.courses.length})</TabsTrigger>
        </TabsList>

        {/* 記事一覧 */}
        <TabsContent value="articles" className="space-y-4">
          {tag.articles.length > 0 ? (
            tag.articles.map((article: any) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
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
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>まだ記事がありません</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* コース一覧 */}
        <TabsContent value="courses" className="space-y-4">
          {tag.courses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tag.courses.map((course: any) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=192&width=400&query=${encodeURIComponent(course.title)}`
                    }}
                  />
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
                        {course.students}人
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        {course.lessons}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/techtube/course/${course.id}`}>詳細を見る</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>まだコースがありません</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
