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
    <div className="pt-16">
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
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 cursor-pointer transition-colors">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>

            {/* Meta */}
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

            {/* Excerpt */}
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
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

      {/* Article Content */}
      <article className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-extrabold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-a:text-purple-600 dark:prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
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
                  <div className="glass-morphism rounded-3xl p-6 hover-glow transition-all duration-500 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">About the Author</h3>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-75"></div>
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={64}
                          height={64}
                          className="relative rounded-full border-2 border-white/50 dark:border-gray-700/50"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                          {post.author.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Share Card */}
                  <div className="glass-morphism rounded-3xl p-6 hover-glow transition-all duration-500 border border-white/20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                      <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 flex items-center">
                        <Share2 className="w-5 h-5 mr-2 text-blue-500" />
                        Share This Post
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="neomorphic-button group flex items-center justify-start p-4 rounded-2xl hover-lift transition-all duration-300">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <Twitter className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                            Share on Twitter
                          </span>
                        </div>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="neomorphic-button group flex items-center justify-start p-4 rounded-2xl hover-lift transition-all duration-300">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <Linkedin className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                            Share on LinkedIn
                          </span>
                        </div>
                      </a>
                      <div
                        className="neomorphic-button group flex items-center justify-start p-4 rounded-2xl hover-lift transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            navigator.clipboard.writeText(window.location.href)
                          }
                        }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <Copy className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                          Copy Link
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="glass-morphism rounded-3xl p-6 hover-glow transition-all duration-500 border border-white/20">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                        <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Related Posts</h3>
                      </div>
                      <div className="space-y-4">
                        {relatedPosts.map((rp, i) => (
                          <div key={rp.id} className="group animate-bounce-in" style={{ animationDelay: `${i * 150}ms` }}>
                            <Link href={`/posts/${rp.slug}`}>
                              <div className="neomorphic-button p-4 rounded-2xl hover-lift hover-glow transition-all duration-300 cursor-pointer">
                                <div className="flex gap-4">
                                  <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <Image
                                      src={rp.featuredImage || "/placeholder.svg"}
                                      alt={rp.title}
                                      width={64}
                                      height={64}
                                      className="relative w-16 h-16 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-extrabold line-clamp-2 group-hover:text-shimmer transition-all duration-300 mb-2">
                                      {rp.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                      {new Date(rp.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {rp.categories.slice(0, 2).map((c) => (
                                        <span key={c} className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full font-bold">
                                          {c}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/20 dark:border-gray-700/50">
                        <Link href="/blog">
                          <div className="neomorphic-button group flex items-center justify-center p-4 rounded-2xl hover-lift hover-glow transition-all duration-300 cursor-pointer">
                            <span className="font-extrabold text-purple-600 dark:text-purple-300 group-hover:text-shimmer transition-all duration-300">
                              View All Posts
                            </span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Categories Navigation */}
                  <div className="glass-morphism rounded-3xl p-6 hover-glow transition-all duration-500 border border-white/20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                      <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Explore Categories</h3>
                    </div>
                    <div className="space-y-3">
                      {post.categories.map((category, index) => (
                        <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                          <div
                            className="neomorphic-button group flex items-center justify-between p-4 rounded-2xl hover-lift hover-glow transition-all duration-300 cursor-pointer animate-bounce-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                              <span className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-shimmer transition-all duration-300 truncate">
                                {category}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="glass-morphism rounded-3xl p-6 hover-glow transition-all duration-500 border border-white/20 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                      <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Stay Updated</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-medium">
                      Get the latest insights delivered to your inbox. Join our community of developers!
                    </p>
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-white/30 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      <div className="neomorphic-button group p-1 rounded-xl hover-lift transition-all duration-300 cursor-pointer">
                        <div className="gradient-bg text-white font-extrabold py-3 px-4 rounded-xl text-center group-hover:opacity-90 transition-opacity">
                          Subscribe Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
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

