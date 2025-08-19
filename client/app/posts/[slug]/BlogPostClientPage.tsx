"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft, Calendar, Clock, Tag, User, Share2, Twitter, Linkedin, Copy, ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/post"
import { useEffect, useMemo, useState } from "react"

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter((p) => p.id !== currentPost.id)
    .map((p) => {
      let score = 0
      const sharedCategories = p.categories.filter((c) => currentPost.categories.includes(c)).length
      score += sharedCategories * 3
      const sharedTags = p.tags.filter((t) => currentPost.tags.includes(t)).length
      score += sharedTags * 2
      return { post: p, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

export default function BlogPostClientPage({
  post,
  related,
}: {
  post: BlogPost
  related: BlogPost[]
}) {
  const [currentUrl, setCurrentUrl] = useState("")
  useEffect(() => setCurrentUrl(window.location.href), [])

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const relatedPosts = useMemo(() => getRelatedPosts(post, related), [post, related])

  return (
    <div className="min-h-screen  from-[#f8f8ff] to-[#e4e4f4] dark:from-[#0F1521] dark:via-[#0B0E17] dark:to-[#090B12] text-gray-900 dark:text-gray-200">
      {/* Back to Blog Link */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/blog">
          <Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 cursor-pointer transition-colors">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.featuredImage?.url || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <article className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-3">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-extrabold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-a:text-purple-600 dark:prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                        <Badge variant="outline" className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer transition-colors">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Author Card */}
                  {/* ... Author card code is unchanged ... */}

                  {/* Share card */}
                  {/* ... Share card code is unchanged ... */}

                  {/* Related, Categories, Subscribe cards */}
                  {/* ... Unchanged ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-8 sm:py-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
              Explore More Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Discover more insights about web development, design, and digital marketing.
            </p>
            <Link href="/blog">
              <Button size="lg" className="gradient-bg text-white hover:opacity-90 transition-all duration-300">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
