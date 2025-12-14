"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ja" | "en"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  ja: {
    // Header
    "header.search": "記事、タグ、ユーザーを検索...",
    "header.newArticle": "新規記事",
    "header.myAccount": "マイアカウント",
    "header.profile": "プロフィール",
    "header.myArticles": "自分の記事",
    "header.bookmarks": "ブックマーク",
    "header.settings": "設定",
    "header.logout": "ログアウト",

    // Sidebar
    "sidebar.view": "閲覧",
    "sidebar.dashboard": "ダッシュボード",
    "sidebar.allArticles": "すべての記事",
    "sidebar.techTube": "TechTube",
    "sidebar.rssFeeds": "RSSフィード",
    "sidebar.trending": "トレンド",
    "sidebar.tags": "タグ",
    "sidebar.team": "チーム",
    "sidebar.bookmarks": "ブックマーク",

    "sidebar.create": "作成・管理",
    "sidebar.drafts": "下書き",
    "sidebar.myArticles": "自分の記事",
    "sidebar.instructorCenter": "講師センター",

    "sidebar.myPage": "マイページ",
    "sidebar.profile": "プロフィール",
    "sidebar.notifications": "通知",

    "sidebar.tools": "ツール",
    "sidebar.aiAssistant": "AIアシスタント",
    "sidebar.settings": "設定",

    // Dashboard
    "dashboard.title": "ダッシュボード",
    "dashboard.totalArticles": "総記事数",
    "dashboard.totalViews": "総閲覧数",
    "dashboard.followers": "フォロワー",
    "dashboard.completedCourses": "完了コース",
    "dashboard.recentArticles": "最近の記事",
    "dashboard.viewAll": "すべて表示",
    "dashboard.popularTags": "人気のタグ",
    "dashboard.learningProgress": "学習進捗",

    // Articles
    "articles.title": "すべての記事",
    "articles.latest": "最新",
    "articles.popular": "人気",
    "articles.following": "フォロー中",
    "articles.views": "閲覧",
    "articles.likes": "いいね",
    "articles.comments": "コメント",
    "articles.readMore": "続きを読む",
    "articles.publishedBy": "投稿者",
    "articles.tags": "タグ",

    // TechTube
    "techtube.title": "TechTube",
    "techtube.myLearning": "マイラーニング",
    "techtube.allCourses": "すべてのコース",
    "techtube.trending": "トレンド",
    "techtube.continueWatch": "続きから再生",
    "techtube.progress": "進捗",
    "techtube.lessons": "レッスン",
    "techtube.students": "受講生",
    "techtube.rating": "評価",
    "techtube.instructor": "講師",
    "techtube.enroll": "受講を開始",

    // Instructor
    "instructor.dashboard": "講師ダッシュボード",
    "instructor.totalStudents": "総受講生数",
    "instructor.totalCourses": "総コース数",
    "instructor.avgRating": "平均評価",
    "instructor.questions": "質問",
    "instructor.createCourse": "新規コース作成",
    "instructor.myCourses": "マイコース",
    "instructor.recentQuestions": "最近の質問",

    // AI Assistant
    "ai.title": "AIアシスタント",
    "ai.writingHelp": "執筆支援",
    "ai.youtubeTranscript": "YouTube文字起こし",
    "ai.urlSummarizer": "URL要約",
    "ai.chatPlaceholder": "AIアシスタントに質問してください...",
    "ai.send": "送信",
    "ai.summarize": "要約",
    "ai.transcribe": "文字起こし",
    "ai.enterUrl": "URLを入力してください",

    // Notifications
    "notifications.title": "通知",
    "notifications.all": "すべて",
    "notifications.unread": "未読",
    "notifications.markAsRead": "既読にする",
    "notifications.delete": "削除",
    "notifications.viewAll": "すべて表示",
    "notifications.markAllRead": "すべて既読にする",

    // Common
    "common.save": "保存",
    "common.cancel": "キャンセル",
    "common.edit": "編集",
    "common.delete": "削除",
    "common.publish": "公開",
    "common.draft": "下書き",
    "common.search": "検索",
    "common.filter": "フィルター",
    "common.sort": "並び替え",
    "common.loading": "読み込み中...",
    "common.noResults": "結果が見つかりません",
  },
  en: {
    // Header
    "header.search": "Search articles, tags, users...",
    "header.newArticle": "New Article",
    "header.myAccount": "My Account",
    "header.profile": "Profile",
    "header.myArticles": "My Articles",
    "header.bookmarks": "Bookmarks",
    "header.settings": "Settings",
    "header.logout": "Logout",

    // Sidebar
    "sidebar.view": "View",
    "sidebar.dashboard": "Dashboard",
    "sidebar.allArticles": "All Articles",
    "sidebar.techTube": "TechTube",
    "sidebar.rssFeeds": "RSS Feeds",
    "sidebar.trending": "Trending",
    "sidebar.tags": "Tags",
    "sidebar.team": "Team",
    "sidebar.bookmarks": "Bookmarks",

    "sidebar.create": "Create & Manage",
    "sidebar.drafts": "Drafts",
    "sidebar.myArticles": "My Articles",
    "sidebar.instructorCenter": "Instructor Center",

    "sidebar.myPage": "My Page",
    "sidebar.profile": "Profile",
    "sidebar.notifications": "Notifications",

    "sidebar.tools": "Tools",
    "sidebar.aiAssistant": "AI Assistant",
    "sidebar.settings": "Settings",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.totalArticles": "Total Articles",
    "dashboard.totalViews": "Total Views",
    "dashboard.followers": "Followers",
    "dashboard.completedCourses": "Completed Courses",
    "dashboard.recentArticles": "Recent Articles",
    "dashboard.viewAll": "View All",
    "dashboard.popularTags": "Popular Tags",
    "dashboard.learningProgress": "Learning Progress",

    // Articles
    "articles.title": "All Articles",
    "articles.latest": "Latest",
    "articles.popular": "Popular",
    "articles.following": "Following",
    "articles.views": "views",
    "articles.likes": "likes",
    "articles.comments": "comments",
    "articles.readMore": "Read More",
    "articles.publishedBy": "Published by",
    "articles.tags": "Tags",

    // TechTube
    "techtube.title": "TechTube",
    "techtube.myLearning": "My Learning",
    "techtube.allCourses": "All Courses",
    "techtube.trending": "Trending",
    "techtube.continueWatch": "Continue Watching",
    "techtube.progress": "Progress",
    "techtube.lessons": "lessons",
    "techtube.students": "students",
    "techtube.rating": "rating",
    "techtube.instructor": "Instructor",
    "techtube.enroll": "Enroll Now",

    // Instructor
    "instructor.dashboard": "Instructor Dashboard",
    "instructor.totalStudents": "Total Students",
    "instructor.totalCourses": "Total Courses",
    "instructor.avgRating": "Avg Rating",
    "instructor.questions": "Questions",
    "instructor.createCourse": "Create New Course",
    "instructor.myCourses": "My Courses",
    "instructor.recentQuestions": "Recent Questions",

    // AI Assistant
    "ai.title": "AI Assistant",
    "ai.writingHelp": "Writing Help",
    "ai.youtubeTranscript": "YouTube Transcript",
    "ai.urlSummarizer": "URL Summarizer",
    "ai.chatPlaceholder": "Ask AI Assistant...",
    "ai.send": "Send",
    "ai.summarize": "Summarize",
    "ai.transcribe": "Transcribe",
    "ai.enterUrl": "Enter URL",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.all": "All",
    "notifications.unread": "Unread",
    "notifications.markAsRead": "Mark as Read",
    "notifications.delete": "Delete",
    "notifications.viewAll": "View All",
    "notifications.markAllRead": "Mark All as Read",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.publish": "Publish",
    "common.draft": "Draft",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.loading": "Loading...",
    "common.noResults": "No results found",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ja")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "ja" || savedLang === "en")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ja] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export const useLanguage = useI18n
