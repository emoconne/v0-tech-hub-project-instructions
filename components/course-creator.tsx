"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Trash2,
  GripVertical,
  Upload,
  PlayCircle,
  Eye,
  Save,
  ChevronDown,
  ChevronUp,
  LinkIcon,
  Youtube,
} from "lucide-react"
import { useState } from "react"

export function CourseCreator() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "セクション1: はじめに",
      expanded: true,
      lessons: [
        { id: 1, title: "コース紹介", duration: "", videoType: "upload" as const, videoSource: null },
        { id: 2, title: "開発環境のセットアップ", duration: "", videoType: "upload" as const, videoSource: null },
      ],
    },
  ])

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: `セクション${sections.length + 1}`,
        expanded: true,
        lessons: [],
      },
    ])
  }

  const addLesson = (sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: Date.now(),
                  title: `レッスン${section.lessons.length + 1}`,
                  duration: "",
                  videoType: "upload" as const,
                  videoSource: null,
                },
              ],
            }
          : section,
      ),
    )
  }

  const toggleSection = (sectionId: number) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, expanded: !section.expanded } : section)),
    )
  }

  const updateLessonVideoType = (sectionId: number, lessonId: number, videoType: "upload" | "youtube" | "box") => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, videoType, videoSource: null } : lesson,
              ),
            }
          : section,
      ),
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">新しいコースを作成</h1>
          <p className="text-muted-foreground mt-1">受講生に価値のあるコンテンツを提供しましょう</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            プレビュー
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            下書き保存
          </Button>
          <Button>公開する</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="curriculum">カリキュラム</TabsTrigger>
          <TabsTrigger value="settings">詳細設定</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>コース基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">コースタイトル *</Label>
                <Input id="title" placeholder="例: React完全マスター講座 - 初心者から上級者まで" className="text-lg" />
                <p className="text-sm text-muted-foreground">
                  魅力的でわかりやすいタイトルをつけましょう（最大60文字）
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">サブタイトル</Label>
                <Input id="subtitle" placeholder="例: 実践的なプロジェクトを通じてReactの基礎から応用までを学ぶ" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">コース説明 *</Label>
                <Textarea
                  id="description"
                  rows={8}
                  placeholder="コースの内容、対象者、学習目標などを詳しく記載してください..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">カテゴリ *</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="カテゴリを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web開発</SelectItem>
                      <SelectItem value="mobile">モバイル開発</SelectItem>
                      <SelectItem value="data">データサイエンス</SelectItem>
                      <SelectItem value="ai">AI・機械学習</SelectItem>
                      <SelectItem value="cloud">クラウド</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">難易度 *</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="難易度を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">初級</SelectItem>
                      <SelectItem value="intermediate">中級</SelectItem>
                      <SelectItem value="advanced">上級</SelectItem>
                      <SelectItem value="all">全レベル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">コースサムネイル *</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-1">画像をアップロード</p>
                  <p className="text-sm text-muted-foreground">推奨サイズ: 1280x720px (16:9) • 最大5MB</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    ファイルを選択
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>学習目標（最大4つ）</Label>
                <div className="space-y-3">
                  <Input placeholder="目標1: 例）Reactの基本概念を理解する" />
                  <Input placeholder="目標2: 例）コンポーネントの設計パターンを習得する" />
                  <Input placeholder="目標3: 例）実践的なアプリケーションを構築できる" />
                  <Input placeholder="目標4: 例）最新のReact機能を活用できる" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>必要な前提知識</Label>
                <div className="space-y-3">
                  <Input placeholder="例: HTML/CSSの基礎知識" />
                  <Input placeholder="例: JavaScriptの基本文法" />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    項目を追加
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>カリキュラム構成</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, sectionIndex) => (
                <Card key={section.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        <Input
                          value={section.title}
                          onChange={(e) =>
                            setSections(
                              sections.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)),
                            )
                          }
                          className="font-semibold"
                        />
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => toggleSection(section.id)}>
                        {section.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSections(sections.filter((s) => s.id !== section.id))}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>

                  {section.expanded && (
                    <CardContent className="space-y-3">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/50">
                          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move mt-2" />
                          <PlayCircle className="h-5 w-5 text-primary mt-2" />
                          <div className="flex-1 space-y-3">
                            <Input value={lesson.title} placeholder="レッスンタイトル" className="bg-background" />

                            <div className="space-y-1">
                              <Label className="text-xs">動画ソース</Label>
                              <Select
                                value={lesson.videoType}
                                onValueChange={(value: "upload" | "youtube" | "box") =>
                                  updateLessonVideoType(section.id, lesson.id, value)
                                }
                              >
                                <SelectTrigger className="bg-background">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="upload">
                                    <div className="flex items-center gap-2">
                                      <Upload className="h-4 w-4" />
                                      <span>動画をアップロード</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="youtube">
                                    <div className="flex items-center gap-2">
                                      <Youtube className="h-4 w-4" />
                                      <span>YouTubeリンク</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="box">
                                    <div className="flex items-center gap-2">
                                      <LinkIcon className="h-4 w-4" />
                                      <span>Box URL</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                {lesson.videoType === "upload" ? (
                                  <>
                                    <Label className="text-xs">動画ファイル</Label>
                                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                                      <Upload className="h-4 w-4 mr-2" />
                                      ファイルを選択
                                    </Button>
                                  </>
                                ) : lesson.videoType === "youtube" ? (
                                  <>
                                    <Label className="text-xs">YouTube URL</Label>
                                    <Input
                                      placeholder="https://www.youtube.com/watch?v=..."
                                      className="bg-background"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Label className="text-xs">Box URL</Label>
                                    <Input placeholder="https://app.box.com/..." className="bg-background" />
                                  </>
                                )}
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">動画の長さ</Label>
                                <Input placeholder="例: 10:30" className="bg-background" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">レッスンの説明（オプション）</Label>
                              <Textarea
                                rows={2}
                                placeholder="このレッスンの内容を簡単に説明..."
                                className="bg-background"
                              />
                            </div>
                          </div>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}

                      <Button variant="outline" size="sm" onClick={() => addLesson(section.id)} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        レッスンを追加
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}

              <Button onClick={addSection} variant="outline" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                セクションを追加
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>詳細設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">コースの言語</Label>
                <Select defaultValue="ja">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle-lang">字幕の言語（オプション）</Label>
                <Select>
                  <SelectTrigger id="subtitle-lang">
                    <SelectValue placeholder="字幕を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">なし</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="en">英語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Q&A機能を有効にする</p>
                  <p className="text-sm text-muted-foreground">受講生が質問できるようにします</p>
                </div>
                <Button variant="outline">有効</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">レビュー機能を有効にする</p>
                  <p className="text-sm text-muted-foreground">受講生がレビューを投稿できるようにします</p>
                </div>
                <Button variant="outline">有効</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
