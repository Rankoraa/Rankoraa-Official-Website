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
import { PortableText } from "@portabletext/react"

function ensureArray<T>(value: any): T[] {
  return Array.isArray(value) ? value : []
}

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter((p) => p.id !== currentPost.id)
    .map((p) => {
      let score = 0
      const sharedCategories = ensureArray(p.categories).filter((c) => ensureArray(currentPost.categories).includes(c)).length
      score += sharedCategories * 3
      const sharedTags = ensureArray(p.tags).filter((t) => ensureArray(currentPost.tags).includes(t)).length
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
    <div className="pt-20 bg-white dark:bg-[#0F1521] text-gray-800 dark:text-gray-200 transition-colors">
      {/* Back Button */}
      <div className="container mx-auto px-4">
        <Link href="/blog">
          <Button variant="ghost" className="hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-10 border-b border-gray-200 dark:border-white/15">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {ensureArray(post.categories).map((category) => (
              <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 cursor-pointer">
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">{post.excerpt}</p>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2"><User className="w-4 h-4"/> {post.author?.name}</span>
            <span>•</span>
            <span>{publishedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 py-12">
        {/* Content */}
        <div className="lg:w-2/3">
          {post.featuredImage?.url && (
            <div className="relative h-80 w-full mb-8 overflow-hidden rounded-xl border border-gray-200 dark:border-white/15">
              <Image src={post.featuredImage.url} alt={post.featuredImage.alt ?? ""} fill className="object-cover"/>
            </div>
          )}

          <article className="prose max-w-none prose-purple dark:prose-invert">
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">
          {/* Author Card */}
          {post.author?.name && (
            <div className="p-5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/15">
              <h3 className="font-semibold mb-3">About the Author</h3>
              <div className="flex gap-3 items-center">
                {post.author.avatar && (
                  <Image src={post.author.avatar} width={48} height={48} alt={post.author.name} className="rounded-full"/>
                )}
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.bio?? ""}</p>
                </div>
              </div>
            </div>
          )}

          {/* Share Card */}
          <div className="p-5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/15">
            <h3 className="font-semibold mb-4 flex items-center"><Share2 className="w-4 h-4 mr-2"/> Share this post</h3>
            <div className="flex flex-col space-y-2">
              <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" className="btn-share">Share on Twitter</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" className="btn-share">Share on LinkedIn</a>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="p-5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/15">
              <h3 className="font-semibold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map(r => (
                  <Link key={r.slug} href={`/posts/${r.slug}`} className="flex gap-3 group">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-white/15">
                      {r.featuredImage?.url ? (
                        <Image src={r.featuredImage.url} alt={r.title} fill className="object-cover"/>
                      ) : <div className="w-full h-full bg-gray-300 dark:bg-gray-700"/>}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-300">{r.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(r.publishedAt??"").toLocaleDateString("en-US",{year:"numeric", month:"short", day:"numeric"})}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>

      <style jsx>{`
        .btn-share {
          @apply px-4 py-2 rounded-lg text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 transition dark:bg-purple-700/30 dark:text-purple-200 dark:hover:bg-purple-700/50;
        }
        article :global(img) {
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}
