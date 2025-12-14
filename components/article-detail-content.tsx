"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Bookmark,
  Share2,
  Edit,
  MoreHorizontal,
  Sparkles,
  Send,
  X,
} from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function ArticleDetailContent() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [aiTab, setAiTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "この記事について質問してください。内容の説明や要約、関連情報の提供など、お手伝いします。",
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
      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300", isAiOpen && "max-w-[calc(100%-25rem)]")}>
        <div className="space-y-6">
          <div className="flex justify-end">
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

          <div className="space-y-4">
            <Badge variant="outline">Backend</Badge>
            <h1 className="text-4xl font-bold leading-tight">Building Scalable APIs with Azure Functions</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/author-writing.png" />
                  <AvatarFallback>YT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Yamada Taro</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Published 3 hours ago</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mr-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>3,421</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>234</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>45</span>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="prose prose-invert max-w-none p-8">
              <h2>Introduction</h2>
              <p>
                Azure Functions provide a serverless compute service that enables you to run code on-demand without
                having to explicitly provision or manage infrastructure. In this comprehensive guide, we'll explore how
                to build scalable APIs using Azure Functions.
              </p>

              <h2>Key Benefits of Serverless APIs</h2>
              <ul>
                <li>Automatic scaling based on demand</li>
                <li>Pay only for what you use</li>
                <li>Built-in high availability</li>
                <li>Simplified deployment and management</li>
              </ul>

              <h2>Architecture Overview</h2>
              <p>
                Our API architecture leverages Azure Functions with HTTP triggers, connected to Azure Cosmos DB for data
                persistence and Azure Service Bus for asynchronous processing.
              </p>

              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.')
  
  const name = req.query.name || (req.body && req.body.name)
  
  if (name) {
    context.res = {
      status: 200,
      body: { message: \`Hello, \${name}!\` }
    }
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    }
  }
}

export default httpTrigger`}</code>
              </pre>

              <h2>Best Practices</h2>
              <ol>
                <li>
                  <strong>Keep functions small and focused</strong> - Each function should do one thing well
                </li>
                <li>
                  <strong>Use dependency injection</strong> - Makes testing easier and improves code reusability
                </li>
                <li>
                  <strong>Implement proper error handling</strong> - Always handle exceptions gracefully
                </li>
                <li>
                  <strong>Monitor and log</strong> - Use Application Insights for comprehensive monitoring
                </li>
              </ol>

              <h2>Conclusion</h2>
              <p>
                Azure Functions provide a powerful platform for building scalable APIs. By following these best
                practices and patterns, you can create robust serverless applications that scale automatically with your
                needs.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-2 flex-wrap">
            <Badge>Azure</Badge>
            <Badge>Serverless</Badge>
            <Badge>API</Badge>
            <Badge>Cloud Computing</Badge>
            <Badge>Backend</Badge>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Comments (45)</h3>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Write Comment
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <Textarea placeholder="Add your comment..." rows={3} />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">Post Comment</Button>
                  </div>
                </div>

                <Separator />

                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=user${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">User {i}</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great article! This really helped me understand Azure Functions better. I particularly liked
                          the section on best practices.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Heart className="mr-1 h-3 w-3" />
                            12
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Panel */}
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
                  <TabsTrigger value="summary">要約</TabsTrigger>
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
                      placeholder="記事について質問する..."
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
                        記事の要約
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        この記事では、Azure
                        Functionsを使用してスケーラブルなAPIを構築する方法について解説しています。サーバーレスアーキテクチャの利点、ベストプラクティス、実装パターンを網羅しています。
                      </p>
                      <Separator className="my-4" />
                      <h4 className="font-semibold mb-3">主要なポイント</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5" />
                          <span>自動スケーリングと従量課金モデル</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5" />
                          <span>関数は小さく、単一責任を持たせる</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5" />
                          <span>依存性注入とエラーハンドリングの重要性</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5" />
                          <span>Application Insightsでの監視</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
