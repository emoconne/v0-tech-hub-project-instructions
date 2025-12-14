"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag, Search, TrendingUp, Hash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const allTags = [
  { name: "Azure", count: 245, category: "クラウド", trending: true },
  { name: "React", count: 198, category: "フロントエンド", trending: true },
  { name: "TypeScript", count: 176, category: "言語", trending: true },
  { name: "AI", count: 167, category: "機械学習", trending: true },
  { name: "Next.js", count: 145, category: "フロントエンド", trending: true },
  { name: "Docker", count: 132, category: "インフラ", trending: false },
  { name: "Kubernetes", count: 121, category: "インフラ", trending: true },
  { name: "Python", count: 109, category: "言語", trending: false },
  { name: "Node.js", count: 98, category: "バックエンド", trending: false },
  { name: "AWS", count: 87, category: "クラウド", trending: false },
  { name: "GitHub", count: 76, category: "ツール", trending: false },
  { name: "Vue.js", count: 65, category: "フロントエンド", trending: false },
  { name: "SQL", count: 54, category: "データベース", trending: false },
  { name: "PostgreSQL", count: 48, category: "データベース", trending: false },
  { name: "MongoDB", count: 42, category: "データベース", trending: false },
  { name: "GraphQL", count: 39, category: "API", trending: false },
  { name: "REST API", count: 36, category: "API", trending: false },
  { name: "CI/CD", count: 33, category: "DevOps", trending: false },
  { name: "テスト", count: 31, category: "品質管理", trending: false },
  { name: "セキュリティ", count: 28, category: "セキュリティ", trending: false },
  { name: "パフォーマンス", count: 25, category: "最適化", trending: false },
  { name: "アーキテクチャ", count: 23, category: "設計", trending: false },
  { name: "デザインパターン", count: 21, category: "設計", trending: false },
  { name: "マイクロサービス", count: 19, category: "アーキテクチャ", trending: false },
]

const categories = [
  "すべて",
  "クラウド",
  "フロントエンド",
  "バックエンド",
  "言語",
  "インフラ",
  "機械学習",
  "データベース",
  "API",
  "DevOps",
  "ツール",
  "設計",
  "セキュリティ",
  "最適化",
  "品質管理",
  "アーキテクチャ",
]

export function TagsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")

  const filteredTags = allTags.filter((tag) => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "すべて" || tag.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const trendingTags = allTags.filter((tag) => tag.trending).slice(0, 8)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg">
          <Tag className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            タグ
          </h1>
          <p className="text-muted-foreground">技術タグで記事を探す</p>
        </div>
      </div>

      {/* トレンドタグ */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            トレンドタグ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {trendingTags.map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                <Badge className="px-4 py-2 text-base bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                  <Hash className="h-4 w-4 mr-1" />
                  {tag.name}
                  <span className="ml-2 text-muted-foreground">({tag.count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 検索とフィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            タグを検索
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 検索ボックス */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="タグを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* カテゴリフィルター */}
          <div className="space-y-2">
            <p className="text-sm font-medium">カテゴリ</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* すべてのタグ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>すべてのタグ ({filteredTags.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTags.map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full group hover:-translate-y-1 border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                            <Hash className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="font-semibold group-hover:text-green-600 transition-colors">{tag.name}</h3>
                          {tag.trending && (
                            <div className="p-1 bg-gradient-to-br from-orange-500 to-red-600 rounded">
                              <TrendingUp className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{tag.category}</p>
                        <div className="mt-3 inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-sm font-medium">
                          {tag.count}件の投稿
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredTags.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>該当するタグが見つかりませんでした</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
