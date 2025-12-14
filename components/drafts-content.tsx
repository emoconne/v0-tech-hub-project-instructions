"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const mockDrafts = [
  {
    id: 1,
    type: "記事",
    title: "運用保守の視点",
    tags: ["Microsoft Ignite 2025 戦略レポート", "運用保守の視点"],
    summary:
      "作成日: 2025年12月 対象: JBCCグループ（特にJBCC株式会社）目的: AI時代のクラウド運用保守サービスの高度化戦略...",
    updatedAt: "2 days ago",
    content: `# Microsoft Ignite 2025 戦略レポート
## 運用保守の視点

**作成日**: 2025年12月  
**対象**: JBCCグループ（特にJBCC株式会社）  
**目的**: AI時代のクラウド運用保守サービスの高度化戦略

---

## エグゼクティブサマリー

Microsoft Ignite 2025では、「エージェンティッククラウドオペレーション」という新たな運用パラダイムが提示されました。Azure Copilotの運用系エージェント（Observability、Optimization、Resiliency、Troubleshooting）により、従来の人手に依存した運用監視から、AI駆動の自律的運用への転換が可能になります。JBCCのマネージドサービス事業にとって、これは運用効率の劇的な改善と、高付加価値サービスへの転換を実現する重要な機会です。`,
  },
  {
    id: 2,
    type: "記事",
    title: "インフラ構築の視点",
    tags: ["Microsoft Ignite 2025 戦略レポート", "インフラ構築の視点"],
    summary:
      "作成日: 2025年12月 対象: JBCCグループ（特にJBCC株式会社）目的: AI時代のクラウド運用保守サービスの高度化戦略...",
    updatedAt: "2 days ago",
    content: `# Microsoft Ignite 2025 戦略レポート
## インフラ構築の視点

Azureの新しいインフラ構築アプローチについて解説します。`,
  },
  {
    id: 3,
    type: "記事",
    title: "超高速開発の視点",
    tags: ["Microsoft Ignite 2025 戦略レポート", "超高速開発の視点"],
    summary:
      "作成日: 2025年12月 対象: JBCCグループ（特にJBCC株式会社）目的: AI時代のクラウド運用保守サービスの高度化戦略...",
    updatedAt: "2 days ago",
    content: `# Microsoft Ignite 2025 戦略レポート
## 超高速開発の視点

AI支援による開発効率化について解説します。`,
  },
]

export function DraftsContent() {
  const [selectedDraft, setSelectedDraft] = useState(mockDrafts[0])
  const [showOnlyMine, setShowOnlyMine] = useState(false)

  const handleDelete = (id: number) => {
    if (confirm("この下書きを削除してもよろしいですか？")) {
      alert("下書きを削除しました")
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
            <Edit className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              下書き一覧
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="my-drafts" checked={showOnlyMine} onCheckedChange={setShowOnlyMine} />
          <Label htmlFor="my-drafts" className="cursor-pointer">
            未投稿の下書きのみ表示
          </Label>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="articles">記事</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="discussion">意見交換</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左側：下書きリスト */}
            <div className="space-y-4">
              {mockDrafts.map((draft) => (
                <Card
                  key={draft.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-l-amber-500 ${
                    selectedDraft.id === draft.id ? "ring-2 ring-amber-500 bg-amber-50/30" : ""
                  }`}
                  onClick={() => setSelectedDraft(draft)}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                      {draft.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{draft.updatedAt}</span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{draft.title}</h3>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{draft.summary}</p>

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {draft.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                      <Link href={`/articles/edit/${draft.id}`}>
                        <Edit className="h-4 w-4" />
                        編集する
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(draft.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      下書きを削除する
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* 右側：プレビュー */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2">
                    {selectedDraft.type}
                  </Badge>
                  <h2 className="text-2xl font-bold">{selectedDraft.title}</h2>
                </div>

                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-sm">{selectedDraft.content}</div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <p className="text-muted-foreground">記事の下書きのみを表示</p>
        </TabsContent>

        <TabsContent value="qa">
          <p className="text-muted-foreground">Q&Aの下書きのみを表示</p>
        </TabsContent>

        <TabsContent value="discussion">
          <p className="text-muted-foreground">意見交換の下書きのみを表示</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
