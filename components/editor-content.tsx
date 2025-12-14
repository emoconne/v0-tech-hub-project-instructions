"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Bold,
  Italic,
  LinkIcon,
  Code,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Eye,
  Save,
  Send,
  Sparkles,
  X,
} from "lucide-react"

export function EditorContent() {
  const [tags, setTags] = useState<string[]>(["Azure", "TypeScript"])
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter article title..."
                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue="backend">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 flex-wrap mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Tabs defaultValue="write" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <TabsContent value="write" className="mt-0">
                <Textarea
                  placeholder="Write your article in Markdown..."
                  className="min-h-[500px] font-mono text-sm"
                  defaultValue={`# Introduction

Write your content here using Markdown syntax...

## Section 1

Content here...

\`\`\`typescript
// Code example
const example = "Hello, World!";
console.log(example);
\`\`\`

## Section 2

More content...`}
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <Card className="min-h-[500px] p-6">
                  <div className="prose prose-invert max-w-none">
                    <h1>Introduction</h1>
                    <p>Write your content here using Markdown syntax...</p>
                    <h2>Section 1</h2>
                    <p>Content here...</p>
                    <pre className="bg-secondary p-4 rounded-lg">
                      <code>{`// Code example
const example = "Hello, World!";
console.log(example);`}</code>
                    </pre>
                    <h2>Section 2</h2>
                    <p>More content...</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2 bg-transparent">
                Improve Writing
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2 bg-transparent">
                Generate Summary
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2 bg-transparent">
                Suggest Tags
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-auto py-2 bg-transparent">
                Check Grammar
              </Button>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="font-semibold">Templates</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Technical Tutorial
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Project Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Code Review
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Release Notes
              </Button>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Publishing Options</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibility</span>
                <Select defaultValue="public">
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Comments</span>
                <Select defaultValue="enabled">
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
