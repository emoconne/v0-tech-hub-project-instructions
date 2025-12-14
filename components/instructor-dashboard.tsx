"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, PlayCircle, Users, Star, MessageSquare, Plus, Edit, Eye, Settings } from "lucide-react"
import Link from "next/link"

const instructorStats = {
  totalStudents: 1247,
  totalCourses: 5,
  avgRating: 4.6,
  totalRevenue: "¥342,500",
  monthlyGrowth: "+23%",
}

const myCourses = [
  {
    id: 1,
    title: "React完全マスター講座",
    thumbnail: "/react-course-thumbnail.jpg",
    students: 523,
    rating: 4.7,
    reviews: 156,
    status: "公開中",
    lastUpdated: "2024-01-15",
    revenue: "¥124,500",
  },
  {
    id: 2,
    title: "TypeScriptデザインパターン実践",
    thumbnail: "/typescript-design-patterns.jpg",
    students: 387,
    rating: 4.5,
    reviews: 92,
    status: "公開中",
    lastUpdated: "2024-01-10",
    revenue: "¥89,200",
  },
  {
    id: 3,
    title: "Next.js 14 App Router完全ガイド",
    thumbnail: "/nextjs-app-router-course.jpg",
    students: 245,
    rating: 4.8,
    reviews: 67,
    status: "公開中",
    lastUpdated: "2024-01-20",
    revenue: "¥67,800",
  },
  {
    id: 4,
    title: "フルスタックWeb開発入門",
    thumbnail: "/fullstack-web-development.jpg",
    students: 92,
    rating: 4.4,
    reviews: 28,
    status: "下書き",
    lastUpdated: "2024-01-22",
    revenue: "¥0",
  },
]

const recentQuestions = [
  {
    id: 1,
    student: "田中太郎",
    course: "React完全マスター講座",
    question: "useEffectの依存配列について質問があります",
    timestamp: "2時間前",
    status: "未回答",
  },
  {
    id: 2,
    student: "鈴木花子",
    course: "TypeScriptデザインパターン実践",
    question: "Factoryパターンの実装例を教えてください",
    timestamp: "5時間前",
    status: "回答済み",
  },
  {
    id: 3,
    student: "佐藤次郎",
    course: "Next.js 14 App Router完全ガイド",
    question: "Server Actionsのエラーハンドリング方法",
    timestamp: "1日前",
    status: "回答済み",
  },
]

export function InstructorDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">講師ダッシュボード</h1>
          <p className="text-muted-foreground mt-1">コースの管理と分析</p>
        </div>
        <Link href="/instructor/create">
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            新しいコースを作成
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総受講生数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instructorStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">{instructorStats.monthlyGrowth}</span> 先月比
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公開コース数</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instructorStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground mt-1">4コース公開中</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均評価</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instructorStats.avgRating}</div>
            <p className="text-xs text-muted-foreground mt-1">343件のレビュー</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未回答の質問</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">できるだけ早く回答しましょう</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">マイコース</TabsTrigger>
          <TabsTrigger value="questions">質問と回答</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={course.status === "公開中" ? "default" : "secondary"}
                  >
                    {course.status}
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-2 h-12">{course.title}</h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating} ({course.reviews})
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">完成度</span>
                      <span className="font-medium">{course.status === "公開中" ? "100%" : "65%"}</span>
                    </div>
                    <Progress value={course.status === "公開中" ? 100 : 65} />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">最終更新: {course.lastUpdated}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/instructor/edit/${course.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/techtube/course/${course.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          <div className="space-y-4">
            {recentQuestions.map((q) => (
              <Card key={q.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={q.status === "未回答" ? "destructive" : "secondary"}>{q.status}</Badge>
                        <span className="text-sm font-medium">{q.student}</span>
                        <span className="text-xs text-muted-foreground">{q.timestamp}</span>
                      </div>
                      <h4 className="font-semibold">{q.question}</h4>
                      <p className="text-sm text-muted-foreground">{q.course}</p>
                    </div>
                    <Button size="sm" variant={q.status === "未回答" ? "default" : "outline"}>
                      {q.status === "未回答" ? "回答する" : "確認する"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>アクセス分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>詳細な分析データはこちらに表示されます</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
