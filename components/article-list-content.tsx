"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Heart, MessageSquare, Clock, SlidersHorizontal, FileText } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"

const articles = [
  {
    id: 1,
    title: "Building Scalable APIs with Azure Functions",
    excerpt: "Learn how to design and implement serverless APIs that scale automatically with demand...",
    author: { name: "Yamada Taro", avatar: "/man.jpg" },
    tags: ["Azure", "Serverless", "API"],
    stats: { views: 3421, likes: 234, comments: 45 },
    publishedAt: "3 hours ago",
    category: "Backend",
  },
  {
    id: 2,
    title: "React Server Components Deep Dive",
    excerpt: "Understanding the fundamentals of React Server Components and when to use them effectively...",
    author: { name: "Tanaka Hanako", avatar: "/diverse-woman-portrait.png" },
    tags: ["React", "Next.js", "Frontend"],
    stats: { views: 2891, likes: 187, comments: 32 },
    publishedAt: "6 hours ago",
    category: "Frontend",
  },
  {
    id: 3,
    title: "Kubernetes Security Best Practices 2024",
    excerpt: "Essential security practices for running production Kubernetes clusters in enterprise environments...",
    author: { name: "Kobayashi Jun", avatar: "/diverse-engineers-meeting.png" },
    tags: ["Kubernetes", "Security", "DevOps"],
    stats: { views: 4512, likes: 321, comments: 67 },
    publishedAt: "1 day ago",
    category: "DevOps",
  },
  {
    id: 4,
    title: "Fine-tuning GPT Models for Enterprise Use",
    excerpt: "A practical guide to customizing large language models for specific business requirements...",
    author: { name: "Watanabe Yuki", avatar: "/abstract-ai-network.png" },
    tags: ["AI", "Machine Learning", "Azure OpenAI"],
    stats: { views: 5234, likes: 456, comments: 89 },
    publishedAt: "2 days ago",
    category: "AI/ML",
  },
  {
    id: 5,
    title: "TypeScript 5.5 New Features Overview",
    excerpt: "Exploring the latest type system improvements and developer experience enhancements...",
    author: { name: "Sato Kenji", avatar: "/developer-working.png" },
    tags: ["TypeScript", "JavaScript", "Frontend"],
    stats: { views: 1823, likes: 123, comments: 28 },
    publishedAt: "3 days ago",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Database Sharding Strategies at Scale",
    excerpt: "Lessons learned from implementing horizontal partitioning across multiple database instances...",
    author: { name: "Ito Akira", avatar: "/database-concept.png" },
    tags: ["Database", "PostgreSQL", "Architecture"],
    stats: { views: 2945, likes: 198, comments: 41 },
    publishedAt: "4 days ago",
    category: "Backend",
  },
]

export function ArticleListContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("allArticles")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("exploreKnowledge")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Articles</h1>
          <p className="text-muted-foreground mt-1">Explore knowledge shared by your team</p>
        </div>
        <Button size="sm">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input placeholder="Search articles..." />
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="ai">AI/ML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 hover:-translate-y-1 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 ring-2 ring-blue-500/20">
                      <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                      <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{article.publishedAt}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">{article.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-md">
                      <Heart className="h-4 w-4" />
                      <span className="font-medium">{article.stats.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-md">
                      <MessageSquare className="h-4 w-4" />
                      <span className="font-medium">{article.stats.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Articles</Button>
      </div>
    </div>
  )
}
