"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ImageIcon,
  Smile,
  HelpCircle,
  FileText,
  Eye,
  Edit,
  X,
  Sparkles,
  Link2,
  Upload,
  Video,
  FileUp,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ArticleEditor() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSyncScroll, setIsSyncScroll] = useState(true)
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [visibility, setVisibility] = useState("public")
  const [charCount, setCharCount] = useState(0)

  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true)
  const [urlToSummarize, setUrlToSummarize] = useState("")
  const [writingStyle, setWritingStyle] = useState("formal")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; type: string }[]>([])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    setCharCount(newContent.length)
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSaveDraft = () => {
    alert("下書きを保存しました")
    router.push("/drafts")
  }

  const handlePublish = () => {
    alert(`記事を${visibility === "public" ? "全体公開" : "チーム限定公開"}しました`)
    router.push("/articles")
  }

  const handleSummarizeUrl = () => {
    if (!urlToSummarize) return
    const summary = `\n\n### 参考記事の要約\n\n**URL**: ${urlToSummarize}\n\n要約内容がここに表示されます...\n\n`
    setContent(content + summary)
    setUrlToSummarize("")
  }

  const handleApplyTemplate = (templateContent: string) => {
    setContent(templateContent)
    setSelectedTemplate("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const fileObj = {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
        }
        setUploadedFiles((prev) => [...prev, fileObj])
      })
    }
  }

  const insertFileIntoContent = (file: { name: string; url: string; type: string }) => {
    let insertText = ""
    if (file.type.startsWith("image/")) {
      insertText = `\n![${file.name}](${file.url})\n`
    } else {
      insertText = `\n[📎 ${file.name}](${file.url})\n`
    }
    setContent(content + insertText)
  }

  const insertVideoLink = () => {
    const videoUrl = prompt("動画のURLを入力してください（YouTube、Vimeoなど）")
    if (videoUrl) {
      const insertText = `\n[🎥 動画リンク](${videoUrl})\n`
      setContent(content + insertText)
    }
  }

  const templates = [
    {
      id: "technical",
      name: "技術記事テンプレート",
      content: `# タイトル

## 概要
この記事では...

## 背景・課題
...

## 解決策
...

## 実装方法
\`\`\`javascript
// コード例
\`\`\`

## まとめ
...`,
    },
    {
      id: "tutorial",
      name: "チュートリアルテンプレート",
      content: `# タイトル

## はじめに
このチュートリアルでは...

## 前提条件
- ...
- ...

## ステップ1: ...
...

## ステップ2: ...
...

## まとめ
...`,
    },
    {
      id: "report",
      name: "レポートテンプレート",
      content: `# タイトル

## エグゼクティブサマリー
...

## 調査内容
...

## 結果
...

## 考察
...

## 結論
...`,
    },
  ]

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* メインエディタエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{(charCount / 1024).toFixed(2)}KB / 100MB</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveDraft}>
              下書き保存
            </Button>
            <Button size="sm" onClick={() => setIsPublishDialogOpen(true)}>
              公開設定へ
            </Button>
          </div>
        </div>

        {/* タイトル */}
        <div className="border-b border-border px-6 py-4">
          <Input
            placeholder="タイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold border-0 px-0 focus-visible:ring-0"
          />
        </div>

        {/* タグ入力 */}
        <div className="border-b border-border px-6 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">タグ:</span>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
            <Input
              placeholder="タグを入力してください。スペース区切りでつづけて入力できます。"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 border-0 px-0 focus-visible:ring-0 min-w-[200px]"
            />
          </div>
        </div>

        {/* ツールバー */}
        <div className="border-b border-border px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <label htmlFor="file-upload">
              <Button variant="ghost" size="icon" title="ファイルアップロード" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.docx,.xlsx,.pptx"
            />
            <Button variant="ghost" size="icon" title="動画リンク埋め込み" onClick={insertVideoLink}>
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="画像">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="絵文字">
              <Smile className="h-4 w-4" />
            </Button>
            <div className="h-px bg-border" />
            <Button
              variant={isAiSidebarOpen ? "default" : "ghost"}
              size="sm"
              title="AIアシスタント"
              onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs">AIアシスタント</span>
            </Button>
            <Button variant="ghost" size="icon" title="ヘルプ">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">スライドモード</span>
              <Switch />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">同期スクロール</span>
              <Switch checked={isSyncScroll} onCheckedChange={setIsSyncScroll} />
            </div>
          </div>
        </div>

        {/* エディタとプレビュー */}
        <div className="flex-1 flex overflow-hidden">
          {/* 編集モード */}
          <div className={`${isPreviewMode ? "hidden" : "w-full md:w-1/2"} border-r border-border`}>
            <div className="h-full flex flex-col">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">本文</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                    {isPreviewMode ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {isPreviewMode ? "編集" : "プレビュー"}
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="本文をMarkdownで記述..."
                value={content}
                onChange={handleContentChange}
                className="flex-1 border-0 rounded-none resize-none focus-visible:ring-0 font-mono text-sm p-4"
              />
            </div>
          </div>

          {/* プレビュー */}
          <div className={`${isPreviewMode ? "w-full" : "hidden md:block md:w-1/2"} bg-muted/30`}>
            <div className="h-full flex flex-col overflow-auto">
              <div className="px-4 py-2 border-b border-border">
                <span className="text-sm font-medium">プレビュー</span>
              </div>
              <div className="flex-1 p-6 prose prose-slate max-w-none">
                {title && <h1>{title}</h1>}
                {content ? (
                  <div className="whitespace-pre-wrap">{content}</div>
                ) : (
                  <p className="text-muted-foreground">ここにプレビューが表示されます</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAiSidebarOpen && (
        <div className="w-80 border-l border-border bg-background flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">AIアシスタント</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsAiSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="url" className="text-xs">
                  URL要約
                </TabsTrigger>
                <TabsTrigger value="style" className="text-xs">
                  文体設定
                </TabsTrigger>
                <TabsTrigger value="template" className="text-xs">
                  テンプレート
                </TabsTrigger>
                <TabsTrigger value="files" className="text-xs">
                  ファイル
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="p-4 space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">参考URLの要約</Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    参考にしたい記事のURLを入力すると、AIが要約して本文に挿入します。
                  </p>
                  <div className="space-y-2">
                    <Input
                      placeholder="https://example.com/article"
                      value={urlToSummarize}
                      onChange={(e) => setUrlToSummarize(e.target.value)}
                    />
                    <Button className="w-full gap-2" onClick={handleSummarizeUrl}>
                      <Link2 className="h-4 w-4" />
                      要約して挿入
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-sm font-medium mb-2 block">最近使用したURL</Label>
                  <div className="space-y-2">
                    <div className="text-xs p-2 bg-muted rounded hover:bg-muted/80 cursor-pointer">
                      https://tech.example.com/article1
                    </div>
                    <div className="text-xs p-2 bg-muted rounded hover:bg-muted/80 cursor-pointer">
                      https://blog.example.com/post2
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="p-4 space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">執筆スタイル</Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    記事の文体を選択すると、AIが選択したスタイルで文章を生成します。
                  </p>
                  <Select value={writingStyle} onValueChange={setWritingStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">フォーマル（正式な技術文書）</SelectItem>
                      <SelectItem value="casual">カジュアル（ブログ風）</SelectItem>
                      <SelectItem value="tutorial">チュートリアル（手順説明）</SelectItem>
                      <SelectItem value="beginner">初心者向け（やさしい解説）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-sm font-medium mb-2 block">プロンプトテンプレート</Label>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => {
                        const prompt = `以下のトピックについて、${writingStyle === "formal" ? "フォーマルな" : "カジュアルな"}文体で記事を書いてください：\n\n`
                        setContent(content + prompt)
                      }}
                    >
                      記事作成プロンプト
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => {
                        const prompt = `\n\n以下の内容を${writingStyle === "formal" ? "フォーマル" : "カジュアル"}な文体で書き直してください：\n\n`
                        setContent(content + prompt)
                      }}
                    >
                      リライトプロンプト
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => {
                        const prompt = `\n\n以下の内容を要約してください：\n\n`
                        setContent(content + prompt)
                      }}
                    >
                      要約プロンプト
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-sm font-medium mb-2 block">学習済みスタイル</Label>
                  <p className="text-xs text-muted-foreground mb-2">過去の記事から学習したあなたの文体です。</p>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    自分のスタイルで生成
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="template" className="p-4 space-y-3">
                <div>
                  <Label className="text-sm font-medium mb-2 block">テンプレート</Label>
                  <p className="text-xs text-muted-foreground mb-3">定型的な記事構造をテンプレートから選択できます。</p>
                </div>

                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-border rounded-lg p-3 hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-sm">{template.name}</div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => handleApplyTemplate(template.content)}
                      >
                        適用
                      </Button>
                    </div>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-3 font-mono">
                      {template.content}
                    </pre>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="files" className="p-4 space-y-3">
                <div>
                  <Label className="text-sm font-medium mb-2 block">アップロード済みファイル</Label>
                  <p className="text-xs text-muted-foreground mb-3">ファイルをクリックすると記事に埋め込みます。</p>
                </div>

                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <FileUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>ファイルがありません</p>
                    <p className="text-xs mt-1">ツールバーからファイルをアップロードしてください</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 border border-border rounded hover:bg-muted cursor-pointer"
                        onClick={() => insertFileIntoContent(file)}
                      >
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="h-4 w-4 text-primary" />
                        ) : (
                          <FileText className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm flex-1 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      )}

      {/* 公開設定ダイアログ */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>公開設定</DialogTitle>
            <DialogDescription>記事の公開範囲を選択してください。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={visibility} onValueChange={setVisibility}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="cursor-pointer">
                  <div className="font-medium">全体に公開</div>
                  <div className="text-sm text-muted-foreground">すべてのユーザーが閲覧できます</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <RadioGroupItem value="team" id="team" />
                <Label htmlFor="team" className="cursor-pointer">
                  <div className="font-medium">チーム限定公開</div>
                  <div className="text-sm text-muted-foreground">チームメンバーのみが閲覧できます</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handlePublish}>公開する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
