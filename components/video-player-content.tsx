"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PlayCircle,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Minimize,
  CheckCircle,
  Lock,
  BookOpen,
  MessageSquare,
  FileText,
  Download,
  Save,
  ThumbsUp,
  MessageCircle,
  Star,
} from "lucide-react"
import { useState } from "react"

const courseData = {
  id: 3,
  title: "Next.js 14 App Router完全ガイド",
  currentLesson: {
    id: 1,
    title: "コース紹介",
    duration: "5:30",
    videoUrl: "/modern-video-player.png",
  },
  curriculum: [
    {
      section: "セクション1: はじめに",
      lessons: [
        { id: 1, title: "コース紹介", duration: "5:30", completed: true },
        { id: 2, title: "開発環境のセットアップ", duration: "8:15", completed: false },
        { id: 3, title: "Next.js 14の新機能概要", duration: "6:45", completed: false },
        { id: 4, title: "プロジェクト構造の理解", duration: "5:20", completed: false },
        { id: 5, title: "最初のページを作成", duration: "4:10", completed: false },
      ],
    },
    {
      section: "セクション2: App Routerの基礎",
      lessons: [
        { id: 6, title: "ルーティングの基本", duration: "10:30", completed: false },
        { id: 7, title: "動的ルートとパラメータ", duration: "12:15", completed: false },
        { id: 8, title: "レイアウトとテンプレート", duration: "9:45", completed: false },
      ],
    },
  ],
  notes: [
    {
      id: 1,
      timestamp: "2:30",
      content: "App Routerは従来のPages Routerと比べて、より柔軟なルーティングが可能",
      date: "2024-01-15",
    },
    {
      id: 2,
      timestamp: "4:15",
      content: "Server Componentsがデフォルトになっている点に注意",
      date: "2024-01-15",
    },
  ],
}

const qaData = [
  {
    id: 1,
    user: "田中太郎",
    avatar: "/placeholder.svg?height=40&width=40",
    question: "App Routerと Pages Router の主な違いは何ですか？",
    timestamp: "2日前",
    likes: 12,
    replies: 3,
    answered: true,
    instructorReply: {
      content:
        "素晴らしい質問ですね！主な違いは以下の通りです：\n1. ファイルシステムベースのルーティングがより柔軟になりました\n2. Server ComponentsとClient Componentsを明示的に区別できます\n3. レイアウトやローディング状態の管理が簡単になりました",
      timestamp: "1日前",
    },
  },
  {
    id: 2,
    user: "鈴木花子",
    avatar: "/placeholder.svg?height=40&width=40",
    question: "プロジェクト作成時に TypeScript を選択すべきでしょうか？",
    timestamp: "3日前",
    likes: 8,
    replies: 2,
    answered: true,
  },
]

const resources = [
  { name: "レッスンスライド.pdf", size: "2.3 MB", type: "PDF" },
  { name: "サンプルコード.zip", size: "1.5 MB", type: "ZIP" },
  { name: "参考リンク集.md", size: "12 KB", type: "Markdown" },
  { name: "補足資料.docx", size: "850 KB", type: "Word" },
]

const savedFiles = [
  { name: "第1章の復習ノート.pdf", savedDate: "2024-01-20", size: "1.2 MB" },
  { name: "重要なコード例.zip", savedDate: "2024-01-18", size: "3.5 MB" },
]

export function VideoPlayerContent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [newQuestion, setNewQuestion] = useState("")

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
      {/* 左側：動画プレイヤーとタブコンテンツ */}
      <div className={`flex flex-col bg-background ${isMaximized ? "fixed inset-0 z-50" : "flex-1"}`}>
        {/* 動画プレイヤー */}
        <div
          className={`relative bg-black flex items-center justify-center ${isMaximized ? "h-screen" : "aspect-video max-h-[60vh]"}`}
        >
          <img src="/modern-video-player.png" alt="Video" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-16 w-16 text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-10 w-10" /> : <PlayCircle className="h-10 w-10" />}
            </Button>
          </div>

          {/* 動画コントロール */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <div className="flex items-center gap-4 text-white mb-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <SkipForward className="h-5 w-5" />
              </Button>
              <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer hover:h-1.5 transition-all">
                <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
              </div>
              <span className="text-sm font-medium">1:55 / 5:30</span>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Volume2 className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {!isMaximized && (
          <div className="flex-1 bg-background p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <Badge className="mb-2">セクション1</Badge>
                <h1 className="text-3xl font-bold mb-2">{courseData.currentLesson.title}</h1>
                <p className="text-muted-foreground">{courseData.title}</p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">
                    <BookOpen className="h-4 w-4 mr-2" />
                    概要
                  </TabsTrigger>
                  <TabsTrigger value="qa">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Q&A
                  </TabsTrigger>
                  <TabsTrigger value="notes">
                    <FileText className="h-4 w-4 mr-2" />
                    メモ
                  </TabsTrigger>
                  <TabsTrigger value="resources">
                    <Download className="h-4 w-4 mr-2" />
                    リソース
                  </TabsTrigger>
                  <TabsTrigger value="saved">
                    <Save className="h-4 w-4 mr-2" />
                    保存済み
                  </TabsTrigger>
                </TabsList>

                {/* 概要タブ */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>このレッスンで学ぶこと</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p>Next.js 14の新機能とApp Routerの概要を理解する</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p>プロジェクトの基本構造とファイル配置について学ぶ</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p>Server ComponentsとClient Componentsの違いを理解する</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>レッスンの詳細</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p>
                        このレッスンでは、Next.js 14の新しいApp Routerについて学びます。従来のPages
                        Routerと比較しながら、新しい機能と改善点を理解していきましょう。
                      </p>
                      <p>
                        App Routerは、より柔軟なルーティングと、Server ComponentsとClient
                        Componentsの明確な分離を実現しています。これにより、パフォーマンスの最適化が容易になりました。
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Q&Aタブ */}
                <TabsContent value="qa" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>講師に質問する</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Input placeholder="質問のタイトルを入力..." className="mb-3" />
                        <Textarea
                          placeholder="詳細な質問内容を入力してください...&#10;&#10;・困っている点&#10;・試したこと&#10;・エラーメッセージ（あれば）"
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">質問は全ての受講生に公開されます</span>
                        <Button>質問を投稿</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">すべての質問（{qaData.length}）</h3>
                    {qaData.map((qa) => (
                      <Card key={qa.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={qa.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{qa.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{qa.user}</span>
                                  <span className="text-sm text-muted-foreground">{qa.timestamp}</span>
                                  {qa.answered && (
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      回答済み
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-base">{qa.question}</p>
                              </div>

                              {qa.instructorReply && (
                                <Card className="bg-primary/5 border-primary/20">
                                  <CardContent className="pt-4">
                                    <div className="flex gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                        <AvatarFallback>講</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="font-semibold text-sm">山田太郎（講師）</span>
                                          <Badge variant="secondary" className="text-xs">
                                            <Star className="h-3 w-3 mr-1 fill-current" />
                                            講師
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            {qa.instructorReply.timestamp}
                                          </span>
                                        </div>
                                        <p className="text-sm whitespace-pre-line">{qa.instructorReply.content}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Button variant="ghost" size="sm" className="h-8">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  役に立った（{qa.likes}）
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  返信（{qa.replies}）
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* メモタブ */}
                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>新しいメモを追加</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="動画の内容についてメモを残しましょう...&#10;&#10;重要なポイントや気づいたことを記録しておくと、後で復習するときに便利です。"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={4}
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">現在の時刻: 1:55</span>
                        <Button>メモを保存</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {courseData.notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                              {note.timestamp}
                            </Button>
                            <span className="text-xs text-muted-foreground">{note.date}</span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* リソースタブ */}
                <TabsContent value="resources" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>このレッスンのリソース</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Save className="h-4 w-4 mr-2" />
                              保存
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              ダウンロード
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 保存済みタブ */}
                <TabsContent value="saved" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>保存したファイル</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {savedFiles.length > 0 ? (
                        <div className="space-y-3">
                          {savedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Save className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    保存日: {file.savedDate} • {file.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  ダウンロード
                                </Button>
                                <Button size="sm" variant="ghost">
                                  削除
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <Save className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>まだファイルを保存していません</p>
                          <p className="text-sm mt-1">リソースタブから必要なファイルを保存しましょう</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {!isMaximized && (
        <aside className="w-full lg:w-96 border-l bg-card overflow-auto">
          <div className="p-4 border-b bg-muted/50 sticky top-0 z-10">
            <h2 className="font-semibold mb-1">コースコンテンツ</h2>
            <div className="text-sm text-muted-foreground">1 / 48 レッスン完了 • 進捗率: 2%</div>
          </div>

          <div className="divide-y">
            {courseData.curriculum.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="p-4 bg-muted/30 sticky top-[72px] z-[5]">
                  <h3 className="font-semibold text-sm">{section.section}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{section.lessons.length} レッスン</p>
                </div>
                <div>
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`w-full p-4 text-left hover:bg-accent/70 transition-colors border-b ${
                        lesson.id === courseData.currentLesson.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        ) : lesson.id <= courseData.currentLesson.id ? (
                          <PlayCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2 mb-1">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}
