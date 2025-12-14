"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sparkles, LinkIcon, MessageSquare, Send, Copy, ThumbsUp, ThumbsDown, Youtube } from "lucide-react"

const chatHistory = [
  {
    role: "user",
    content: "useMemoとuseCallbackの違いを教えてください",
    timestamp: "10:23",
  },
  {
    role: "assistant",
    content:
      "useMemoとuseCallbackはどちらもReactの最適化フックです：\n\n**useMemo** - 計算結果の値をメモ化します\n**useCallback** - 関数自体をメモ化します\n\nuseMemoは高コストな計算の結果をキャッシュしたい時に使用します。useCallbackは関数が毎回再作成されるのを防ぎたい時に使用します。",
    timestamp: "10:23",
  },
  {
    role: "user",
    content: "実用的な例を教えてください",
    timestamp: "10:25",
  },
  {
    role: "assistant",
    content:
      "```typescript\n// useMemoの例\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);\n\n// useCallbackの例\nconst handleClick = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);\n```\n\n最初の例では、`expensiveValue`は`a`か`b`が変更された時のみ再計算されます。2番目の例では、`handleClick`関数は`a`か`b`が変更された時のみ再作成されます。",
    timestamp: "10:25",
  },
]

export function AIAssistantContent() {
  const [urlInput, setUrlInput] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [transcriptText, setTranscriptText] = useState("")
  const [transcriptQuestion, setTranscriptQuestion] = useState("")

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AIアシスタント</h1>
        <p className="text-muted-foreground mt-1">執筆、調査、技術的な質問をサポートします</p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="chat">チャット</TabsTrigger>
          <TabsTrigger value="url-summary">URL要約</TabsTrigger>
          <TabsTrigger value="writing">執筆サポート</TabsTrigger>
          <TabsTrigger value="youtube">YouTube文字起こし</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>技術Q&Aアシスタント</CardTitle>
              </div>
              <CardDescription>プログラミング、アーキテクチャ、ベストプラクティスについて質問できます</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((message, i) => (
                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] space-y-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                      <span>{message.timestamp}</span>
                      {message.role === "assistant" && (
                        <>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea placeholder="質問を入力してください..." className="min-h-[60px] resize-none" />
                <Button size="icon" className="h-[60px] w-[60px]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="url-summary" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                <CardTitle>URL要約</CardTitle>
              </div>
              <CardDescription>Webページや技術記事をAIが要約します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/article..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  要約
                </Button>
              </div>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">最近の要約</h3>
                  </div>
                </div>

                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Reactサーバーコンポーネントを理解する</h4>
                          <a href="#" className="text-xs text-primary hover:underline">
                            https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working...
                          </a>
                        </div>
                        <Badge variant="secondary">2時間前</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        この記事では、新しいReactサーバーコンポーネント機能について説明しています。サーバー上でコンポーネントをレンダリングし、JavaScriptをクライアントに送信しない仕組みです。主なメリットは、パフォーマンスの向上とバンドルサイズの削減です。
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-3 w-3" />
                          記事作成
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="mr-2 h-3 w-3" />
                          コピー
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="writing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>文章改善</CardTitle>
                <CardDescription>明瞭性、文法、スタイルを向上させます</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="改善したいテキストを貼り付けてください..."
                  className="min-h-[200px]"
                  defaultValue="新しい機能を実装して、ユーザーが記事をもっと簡単にシェアできるようになりました。"
                />
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  文章を改善
                </Button>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">改善案：</p>
                  <p className="text-sm">「新機能により、ユーザーは記事をより簡単に共有できるようになりました。」</p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      文法修正
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      明瞭性向上
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>要約生成</CardTitle>
                <CardDescription>長文コンテンツの簡潔な要約を作成します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="記事や長文を貼り付けてください..." className="min-h-[200px]" />
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  要約生成
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>タグ提案</CardTitle>
                <CardDescription>記事に適したタグを提案します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="記事の内容を貼り付けてください..." className="min-h-[150px]" />
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  タグを提案
                </Button>
                <div className="flex gap-2 flex-wrap">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Web開発</Badge>
                  <Badge>フロントエンド</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>翻訳</CardTitle>
                <CardDescription>コンテンツを他の言語に翻訳します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="翻訳したいテキストを入力してください..." className="min-h-[150px]" />
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  翻訳
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-primary" />
                <CardTitle>YouTube文字起こし</CardTitle>
              </div>
              <CardDescription>YouTubeの動画を文字起こしして、内容について質問できます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  文字起こし
                </Button>
              </div>

              {transcriptText && (
                <div className="space-y-4 mt-6">
                  <div className="p-4 bg-muted rounded-lg max-h-[300px] overflow-y-auto">
                    <h3 className="font-semibold mb-2">文字起こし結果</h3>
                    <p className="text-sm whitespace-pre-wrap">
                      {transcriptText ||
                        "こんにちは、今日はReact 19の新機能について解説します。まず、Server Componentsの改善点ですが、以前のバージョンと比較して大幅にパフォーマンスが向上しています。特に注目すべきは、データフェッチングの最適化です。従来はクライアント側で行っていた処理を、サーバー側で完結できるようになりました。これにより、初期ロード時間が50%以上短縮される場合もあります。次に、新しいuse APIについて説明します..."}
                    </p>
                  </div>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">文字起こし内容に質問</h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="例：この動画の要点を3つにまとめてください"
                        value={transcriptQuestion}
                        onChange={(e) => setTranscriptQuestion(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        質問する
                      </Button>

                      {transcriptQuestion && (
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm font-medium mb-2">AIの回答：</p>
                          <div className="text-sm space-y-2">
                            <p>この動画の主要なポイントは以下の3つです：</p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                              <li>React 19のServer Componentsはパフォーマンスが大幅に向上</li>
                              <li>データフェッチングをサーバー側で完結できるようになった</li>
                              <li>初期ロード時間が最大50%以上短縮される可能性がある</li>
                            </ol>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm">
                              <Copy className="mr-2 h-3 w-3" />
                              コピー
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-2 h-3 w-3" />
                              記事に追加
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              <div className="space-y-4 mt-6">
                <h3 className="font-semibold">最近の文字起こし</h3>
                {[
                  {
                    title: "React 19の新機能解説",
                    url: "https://www.youtube.com/watch?v=abc123",
                    duration: "15:32",
                    date: "1時間前",
                  },
                  {
                    title: "TypeScriptの型安全性を極める",
                    url: "https://www.youtube.com/watch?v=def456",
                    duration: "22:18",
                    date: "3時間前",
                  },
                  {
                    title: "Next.js App Routerベストプラクティス",
                    url: "https://www.youtube.com/watch?v=ghi789",
                    duration: "18:45",
                    date: "1日前",
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">{item.title}</h4>
                        </div>
                        <a href={item.url} className="text-xs text-primary hover:underline block mb-2">
                          {item.url}
                        </a>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>長さ: {item.duration}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          表示
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
