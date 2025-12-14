"use client"

import { Input } from "@/components/ui/input"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PlayCircle,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  BookOpen,
  Award,
  SeparatorVertical as Separator,
} from "lucide-react"
import Link from "next/link"
import { Sparkles, Send, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const courseData = {
  id: 3,
  title: "Next.js 14 App Router完全ガイド",
  subtitle: "最新のNext.js App Routerを使って、プロダクション対応のフルスタックアプリケーションを構築",
  instructor: {
    name: "鈴木一郎",
    avatar: "/instructor-avatar.png",
    title: "シニアフロントエンジニア",
    bio: "10年以上のWeb開発経験を持ち、React、Next.js、TypeScriptのエキスパート。大手IT企業での実務経験をもとに、実践的なコース内容を提供しています。",
    courses: 12,
    students: 15000,
    rating: 4.8,
  },
  thumbnail: "/nextjs-course-banner.jpg",
  rating: 4.8,
  reviews: 245,
  students: 1250,
  duration: "10時間",
  level: "中級",
  category: "フロントエンド",
  lastUpdated: "2024年1月",
  language: "日本語",
  features: [
    "10時間のオンデマンド動画",
    "48個のレッスン",
    "15個の演習プロジェクト",
    "修了証明書",
    "モバイル・PC対応",
    "無制限アクセス",
  ],
  whatYouWillLearn: [
    "Next.js 14 App Routerの基礎から応用まで",
    "Server ComponentsとClient Componentsの使い分け",
    "データフェッチングとキャッシング戦略",
    "認証・認可の実装（NextAuth.js）",
    "データベース統合（Prisma + PostgreSQL）",
    "デプロイとパフォーマンス最適化",
  ],
  requirements: ["JavaScriptの基礎知識", "Reactの基本的な理解", "Node.jsのインストール"],
  curriculum: [
    {
      section: "セクション1: はじめに",
      lectures: 5,
      duration: "30分",
      lessons: [
        { id: 1, title: "コース紹介", duration: "5:30", preview: true, completed: false },
        { id: 2, title: "開発環境のセットアップ", duration: "8:15", preview: true, completed: false },
        { id: 3, title: "Next.js 14の新機能概要", duration: "6:45", preview: false, completed: false },
        { id: 4, title: "プロジェクト構造の理解", duration: "5:20", preview: false, completed: false },
        { id: 5, title: "最初のページを作成", duration: "4:10", preview: false, completed: false },
      ],
    },
    {
      section: "セクション2: App Routerの基礎",
      lectures: 8,
      duration: "1時間20分",
      lessons: [
        { id: 6, title: "ルーティングの基本", duration: "10:30", preview: false, completed: false },
        { id: 7, title: "動的ルートとパラメータ", duration: "12:15", preview: false, completed: false },
        { id: 8, title: "レイアウトとテンプレート", duration: "9:45", preview: false, completed: false },
        { id: 9, title: "ローディングとエラーハンドリング", duration: "11:20", preview: false, completed: false },
        { id: 10, title: "メタデータとSEO", duration: "8:50", preview: false, completed: false },
        { id: 11, title: "Server Componentsの活用", duration: "13:30", preview: false, completed: false },
        { id: 12, title: "Client Componentsの使い方", duration: "10:15", preview: false, completed: false },
        { id: 13, title: "実践演習: ブログシステムの構築", duration: "14:35", preview: false, completed: false },
      ],
    },
    {
      section: "セクション3: データフェッチングとキャッシング",
      lectures: 10,
      duration: "1時間50分",
      lessons: [
        { id: 14, title: "fetch APIとキャッシング", duration: "12:20", preview: false, completed: false },
        { id: 15, title: "Revalidateの使い方", duration: "9:15", preview: false, completed: false },
        { id: 16, title: "Server Actionsの基本", duration: "11:40", preview: false, completed: false },
        { id: 17, title: "フォームとミューテーション", duration: "13:25", preview: false, completed: false },
        { id: 18, title: "楽観的更新の実装", duration: "10:30", preview: false, completed: false },
        { id: 19, title: "ストリーミングとSuspense", duration: "12:50", preview: false, completed: false },
        { id: 20, title: "並列データフェッチング", duration: "8:45", preview: false, completed: false },
        { id: 21, title: "キャッシュ戦略の最適化", duration: "11:20", preview: false, completed: false },
        { id: 22, title: "ISRとOn-Demand Revalidation", duration: "10:15", preview: false, completed: false },
        { id: 23, title: "実践演習: リアルタイムダッシュボード", duration: "19:40", preview: false, completed: false },
      ],
    },
    {
      section: "セクション4: 認証と認可",
      lectures: 7,
      duration: "1時間15分",
      lessons: [
        { id: 24, title: "NextAuth.jsのセットアップ", duration: "10:30", preview: false, completed: false },
        { id: 25, title: "認証プロバイダーの設定", duration: "12:15", preview: false, completed: false },
        { id: 26, title: "セッション管理", duration: "9:45", preview: false, completed: false },
        { id: 27, title: "保護されたルートの実装", duration: "11:20", preview: false, completed: false },
        { id: 28, title: "ロールベースアクセス制御", duration: "13:50", preview: false, completed: false },
        { id: 29, title: "JWTとセキュリティベストプラクティス", duration: "10:15", preview: false, completed: false },
        { id: 30, title: "実践演習: ログインシステムの実装", duration: "17:05", preview: false, completed: false },
      ],
    },
    {
      section: "セクション5: データベース統合",
      lectures: 9,
      duration: "1時間40分",
      lessons: [
        { id: 31, title: "Prismaのセットアップ", duration: "11:30", preview: false, completed: false },
        { id: 32, title: "スキーマ定義とマイグレーション", duration: "12:15", preview: false, completed: false },
        { id: 33, title: "CRUDオペレーションの実装", duration: "13:45", preview: false, completed: false },
        { id: 34, title: "リレーションとクエリ最適化", duration: "14:20", preview: false, completed: false },
        { id: 35, title: "トランザクション処理", duration: "9:50", preview: false, completed: false },
        { id: 36, title: "PostgreSQLとの統合", duration: "10:30", preview: false, completed: false },
        { id: 37, title: "データベースシーディング", duration: "8:15", preview: false, completed: false },
        { id: 38, title: "エラーハンドリングとバリデーション", duration: "11:45", preview: false, completed: false },
        { id: 39, title: "実践演習: ECサイトのデータモデル", duration: "17:50", preview: false, completed: false },
      ],
    },
    {
      section: "セクション6: デプロイとパフォーマンス最適化",
      lectures: 9,
      duration: "1時間30分",
      lessons: [
        { id: 40, title: "Vercelへのデプロイ", duration: "10:30", preview: false, completed: false },
        { id: 41, title: "環境変数の管理", duration: "8:15", preview: false, completed: false },
        { id: 42, title: "画像最適化（next/image）", duration: "11:45", preview: false, completed: false },
        { id: 43, title: "フォント最適化", duration: "7:20", preview: false, completed: false },
        { id: 44, title: "バンドルサイズの最適化", duration: "12:50", preview: false, completed: false },
        { id: 45, title: "Lighthouseスコアの改善", duration: "9:30", preview: false, completed: false },
        { id: 46, title: "CDNとエッジネットワーク", duration: "10:15", preview: false, completed: false },
        { id: 47, title: "モニタリングとエラー追跡", duration: "11:35", preview: false, completed: false },
        {
          id: 48,
          title: "最終プロジェクト: フルスタックアプリの完成",
          duration: "18:00",
          preview: false,
          completed: false,
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: "田中健太",
      avatar: "/user-avatar-1.png",
      rating: 5,
      date: "1週間前",
      comment:
        "非常にわかりやすい説明で、Next.js 14の理解が深まりました。特にServer Actionsの部分が実践的で役立ちました。",
    },
    {
      id: 2,
      user: "佐藤美咲",
      avatar: "/diverse-user-avatar-set-2.png",
      rating: 5,
      date: "2週間前",
      comment: "演習プロジェクトが充実していて、実際の開発に活かせる内容ばかりです。鈴木先生の説明もとても丁寧でした。",
    },
    {
      id: 3,
      user: "伊藤大輔",
      avatar: "/diverse-user-avatars-3.png",
      rating: 4,
      date: "3週間前",
      comment:
        "App Routerの基礎から応用まで網羅されています。もう少しTypeScriptの型定義について詳しく知りたかったです。",
    },
  ],
}

export function CourseDetailContent() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [aiTab, setAiTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "このコースについて質問してください。内容の説明や学習方法のアドバイスなど、お手伝いします。",
    },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages([...chatMessages, { role: "user", content: chatInput }])
    setChatInput("")
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "これは模擬的な返答です。実際のAI実装では、ここにAIの応答が表示されます。" },
      ])
    }, 500)
  }

  return (
    <div className="flex gap-6">
      <div className={cn("flex-1 transition-all duration-300", isAiOpen && "max-w-[calc(100%-25rem)]")}>
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button
              variant={isAiOpen ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAiOpen(!isAiOpen)}
              className={cn(isAiOpen && "gradient-primary text-white border-0")}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AIアシスタント
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group">
                <img
                  src={courseData.thumbnail || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent flex items-center justify-center">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 shadow-2xl">
                    <PlayCircle className="h-6 w-6 mr-2" />
                    プレビューを見る
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                    {courseData.level}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                    {courseData.category}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {courseData.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">{courseData.subtitle}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold shadow-md">
                    <Star className="h-4 w-4 fill-white" />
                    <span>{courseData.rating}</span>
                    <span>({courseData.reviews}件のレビュー)</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{courseData.students.toLocaleString()}人の受講生</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{courseData.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <span>最終更新: {courseData.lastUpdated}</span>
                  <span>•</span>
                  <span>{courseData.language}</span>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">概要</TabsTrigger>
                  <TabsTrigger value="curriculum">カリキュラム</TabsTrigger>
                  <TabsTrigger value="reviews">レビュー</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>このコースで学べること</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {courseData.whatYouWillLearn.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>受講条件</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {courseData.requirements.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>講師紹介</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{courseData.instructor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{courseData.instructor.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{courseData.instructor.title}</p>
                          <p className="text-sm mb-3">{courseData.instructor.bio}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span>{courseData.instructor.rating} 講師評価</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{courseData.instructor.students.toLocaleString()}人の受講生</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{courseData.instructor.courses}コース</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  {courseData.curriculum.map((section, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{section.section}</CardTitle>
                          <CardDescription>
                            {section.lectures}レッスン • {section.duration}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="flex items-center justify-between py-2 border-b last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                ) : lesson.preview ? (
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="text-xs">
                                    プレビュー
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold">{courseData.rating}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">コース評価</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{courseData.reviews}件のレビュー</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {courseData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{review.user}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              ))}
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 border-2 border-purple-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-xl">受講を開始</CardTitle>
                  <CardDescription>すべての社員が受講できます</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <Link href={`/techtube/learn/${courseData.id}`}>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                      size="lg"
                    >
                      <PlayCircle className="h-5 w-5 mr-2" />
                      今すぐ受講開始
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    ブックマークに追加
                  </Button>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">このコースに含まれるもの：</h4>
                    <ul className="space-y-2 text-sm">
                      {courseData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <Button variant="ghost" className="w-full">
                      <Award className="h-4 w-4 mr-2" />
                      修了証明書を取得
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {isAiOpen && (
        <div className="w-96 shrink-0">
          <Card className="sticky top-20 h-[calc(100vh-6rem)] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">AIアシスタント</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAiOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <Tabs value={aiTab} onValueChange={setAiTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
                <TabsTrigger value="chat">チャット</TabsTrigger>
                <TabsTrigger value="summary">概要</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 flex flex-col mt-4 px-4">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                        <div
                          className={cn(
                            "rounded-lg px-4 py-2 max-w-[80%]",
                            msg.role === "user"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-muted",
                          )}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 mb-4 flex gap-2">
                  <Input
                    placeholder="コースについて質問する..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon" className="gradient-primary text-white border-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="summary" className="flex-1 mt-4 px-4 pb-4 overflow-auto">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      コースの概要
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">{courseData.subtitle}</p>
                    <Separator className="my-4" />
                    <h4 className="font-semibold mb-3">学習内容</h4>
                    <ul className="space-y-2 text-sm">
                      {courseData.whatYouWillLearn.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  )
}
