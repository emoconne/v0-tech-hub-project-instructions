"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rss, Plus, Settings, Trash2, RefreshCw, CheckCircle2, XCircle, Clock } from "lucide-react"

const rssFeeds = [
  {
    id: 1,
    name: "Microsoft Azure Blog",
    url: "https://azure.microsoft.com/en-us/blog/feed/",
    status: "active",
    lastFetch: "10 minutes ago",
    itemsCount: 234,
    autoPost: true,
    category: "Cloud",
  },
  {
    id: 2,
    name: "React Blog",
    url: "https://react.dev/blog/rss.xml",
    status: "active",
    lastFetch: "1 hour ago",
    itemsCount: 89,
    autoPost: false,
    category: "Frontend",
  },
  {
    id: 3,
    name: "GitHub Engineering",
    url: "https://github.blog/engineering.rss",
    status: "error",
    lastFetch: "2 days ago",
    itemsCount: 156,
    autoPost: true,
    category: "Engineering",
  },
  {
    id: 4,
    name: "Kubernetes Blog",
    url: "https://kubernetes.io/feed.xml",
    status: "active",
    lastFetch: "30 minutes ago",
    itemsCount: 312,
    autoPost: true,
    category: "DevOps",
  },
]

const recentItems = [
  {
    id: 1,
    title: "Announcing Azure Functions 5.0",
    source: "Microsoft Azure Blog",
    publishedAt: "2 hours ago",
    summary: "Major improvements to Azure Functions including better performance and new features...",
    status: "pending",
  },
  {
    id: 2,
    title: "React 19 Beta Release",
    source: "React Blog",
    publishedAt: "5 hours ago",
    summary: "The React team announces the beta release of React 19 with exciting new features...",
    status: "posted",
  },
  {
    id: 3,
    title: "Scaling Kubernetes to 10,000 nodes",
    source: "Kubernetes Blog",
    publishedAt: "1 day ago",
    summary: "Learn how to scale Kubernetes clusters to handle massive workloads...",
    status: "pending",
  },
]

export function RSSManagementContent() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">RSS Feed Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and auto-post content from external sources</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add RSS Feed
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configured Feeds</CardTitle>
              <CardDescription>Manage your RSS feed subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rssFeeds.map((feed) => (
                <Card key={feed.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Rss className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">{feed.name}</h3>
                        {feed.status === "active" ? (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Error
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{feed.url}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Last fetch: {feed.lastFetch}</span>
                        </div>
                        <span>•</span>
                        <span>{feed.itemsCount} items</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          {feed.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Switch id={`auto-${feed.id}`} checked={feed.autoPost} />
                          <Label htmlFor={`auto-${feed.id}`} className="text-sm">
                            Auto-post
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Items</CardTitle>
                  <CardDescription>New content from your RSS feeds</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{item.publishedAt}</span>
                        </div>
                      </div>
                      {item.status === "posted" ? <Badge variant="secondary">Posted</Badge> : <Badge>Pending</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    {item.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Post Now</Button>
                        <Button size="sm" variant="outline">
                          Edit & Post
                        </Button>
                        <Button size="sm" variant="ghost">
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add RSS Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Feed URL</Label>
                <Input placeholder="https://example.com/feed.xml" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">Cloud</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="auto-post-new" />
                <Label htmlFor="auto-post-new">Enable auto-posting</Label>
              </div>
              <Button className="w-full">Add Feed</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Feeds</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Feeds</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Items This Week</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Auto-Posted</span>
                <span className="font-semibold">28</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fetch Interval</Label>
                <Select defaultValue="15">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="ai-summary" defaultChecked />
                <Label htmlFor="ai-summary">AI Summary for new items</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
