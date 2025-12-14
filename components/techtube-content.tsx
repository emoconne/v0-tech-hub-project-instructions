"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, PlayCircle, Clock, Star, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const categories = [
  { name: "すべて", count: 156 },
  { name: "フロントエンド", count: 45 },
  { name: "バックエンド", count: 38 },
  { name: "DevOps", count: 22 },
  { name: "データベース", count: 18 },
  { name: "セキュリティ", count: 15 },
  { name: "AI/ML", count: 18 },
]

const myLearningCourses = [
  {
    id: 1,
    title: "React完全マスターコース 2024",
    instructor: "山田太郎",
    thumbnail: "/react-course-thumbnail.jpg",
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    duration: "12時間",
    lastWatched: "2日前",
  },
  {
    id: 2,
    title: "TypeScriptで学ぶデザインパターン",
    instructor: "佐藤花子",
    thumbnail: "/typescript-design-patterns.jpg",
    progress: 35,
    totalLessons: 32,
    completedLessons: 11,
    duration: "8時間",
    lastWatched: "1週間前",
  },
]

const recommendedCourses = [
  {
    id: 3,
    title: "Next.js 14 App Router完全ガイド",
    instructor: "鈴木一郎",
    thumbnail: "/nextjs-app-router-course.jpg",
    rating: 4.8,
    students: 1250,
    duration: "10時間",
    level: "中級",
    category: "フロントエンド",
  },
  {
    id: 4,
    title: "Dockerで学ぶコンテナ技術",
    instructor: "高橋健",
    thumbnail: "/docker-container-course.jpg",
    rating: 4.9,
    students: 2100,
    duration: "15時間",
    level: "初級",
    category: "DevOps",
  },
  {
    id: 5,
    title: "AWSソリューションアーキテクト対策",
    instructor: "伊藤美咲",
    thumbnail: "/aws-architect-certification.jpg",
    rating: 4.7,
    students: 890,
    duration: "20時間",
    level: "上級",
    category: "DevOps",
  },
  {
    id: 6,
    title: "Python機械学習入門",
    instructor: "田中美紀",
    thumbnail: "/python-machine-learning-course.jpg",
    rating: 4.9,
    students: 3200,
    duration: "18時間",
    level: "初級",
    category: "AI/ML",
  },
  {
    id: 7,
    title: "GraphQL API設計マスター",
    instructor: "中村直樹",
    thumbnail: "/graphql-api-design.jpg",
    rating: 4.6,
    students: 650,
    duration: "9時間",
    level: "中級",
    category: "バックエンド",
  },
  {
    id: 8,
    title: "Kubernetesクラスタ構築実践",
    instructor: "小林誠",
    thumbnail: "/kubernetes-cluster-course.jpg",
    rating: 4.8,
    students: 1450,
    duration: "16時間",
    level: "上級",
    category: "DevOps",
  },
]

const trendingCourses = [
  {
    id: 9,
    title: "Azure OpenAI Serviceで作るAIアプリ",
    instructor: "渡辺亮介",
    thumbnail: "/azure-openai-application.jpg",
    rating: 4.9,
    students: 850,
    duration: "11時間",
    level: "中級",
    category: "AI/ML",
    trending: true,
  },
  {
    id: 10,
    title: "モダンWebセキュリティ対策",
    instructor: "林由美",
    thumbnail: "/web-security-course.jpg",
    rating: 4.7,
    students: 1120,
    duration: "13時間",
    level: "中級",
    category: "セキュリティ",
    trending: true,
  },
]

export function TechTubeContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
          <PlayCircle className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TechTube
          </h1>
          <p className="text-muted-foreground mt-1">{t("improveSkills")}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="コースを検索..." className="pl-9" />
        </div>
        <Button>
          <PlayCircle className="h-4 w-4 mr-2" />
          新規コース作成
        </Button>
      </div>

      <Tabs defaultValue="my-learning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-learning">マイラーニング</TabsTrigger>
          <TabsTrigger value="courses">すべてのコース</TabsTrigger>
          <TabsTrigger value="trending">トレンド</TabsTrigger>
        </TabsList>

        <TabsContent value="my-learning" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{t("coursesInProgress")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myLearningCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative aspect-video">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/techtube/learn/${course.id}`}>
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">
                          <PlayCircle className="h-5 w-5 mr-2" />
                          {t("continueWatching")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {course.completedLessons} / {course.totalLessons} {t("lessons")}
                      </span>
                      <span className="font-semibold text-purple-600">
                        {course.progress}%{t("complete")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </div>
                      <span className="text-muted-foreground">
                        {t("lastWatched")}: {course.lastWatched}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">{t("recommendedCourses")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
                >
                  <Link href={`/techtube/course/${course.id}`}>
                    <div className="relative aspect-video">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                        {course.level}
                      </Badge>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-md font-semibold">
                          <Star className="h-4 w-4 fill-white" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="pt-2">
                        <Badge variant="secondary" className="hover:bg-purple-500 hover:text-white transition-colors">
                          {course.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">{t("trendingCourses")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/techtube/course/${course.id}`}>
                  <div className="relative aspect-video">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      トレンド
                    </Badge>
                    <Badge className="absolute top-2 right-2">{course.level}</Badge>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="text-sm">{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="pt-2">
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
