"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, ArrowRight, X, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import type { BlogPost } from "@/lib/cms"     // ✅ your correct Sanity BlogPost type
import { fetchPosts } from "@/lib/cms"       // ✅ your Sanity data fetcher
console.log("DEBUG | SANITY_PROJECT_ID:", process.env.SANITY_PROJECT_ID);


const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error(err)
        setError("Failed to load blog posts. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const tagParam = searchParams.get("tag")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
      setSelectedTag(null)
    } else if (tagParam) {
      setSelectedCategory("All")
      setSelectedTag(tagParam)
    }
  }, [searchParams])

  const categories = useMemo(() => {
    if (posts.length === 0) return ["All"]
    const allCategories = posts.flatMap(p => p.categories)
    return ["All", ...new Set(allCategories)]
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.categories.includes(selectedCategory))
    }
    if (selectedTag) {
      filtered = filtered.filter(p => p.tags.includes(selectedTag))
    }
    return filtered
  }, [posts, selectedCategory, selectedTag])

  const displayedPosts = filteredPosts.slice(0, visiblePosts)
  const hasMorePosts = visiblePosts < filteredPosts.length

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedTag(null)
    setVisiblePosts(POSTS_PER_PAGE)

    const url = new URL(window.location.href)
    url.searchParams.delete("tag")
    if (category !== "All") url.searchParams.set("category", category)
    else url.searchParams.delete("category")
    window.history.pushState({}, "", url.toString())
  }

  const handleTagSelect = (tag: string) => {
    const url = new URL(window.location.href)
    if (selectedTag === tag) {
      setSelectedTag(null)
      url.searchParams.delete("tag")
    } else {
      setSelectedTag(tag)
      setVisiblePosts(POSTS_PER_PAGE)
      url.searchParams.set("tag", tag)
      url.searchParams.delete("category")
    }
    window.history.pushState({}, "", url.toString())
  }

  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedTag(null)
    setVisiblePosts(POSTS_PER_PAGE)
    const url = new URL(window.location.href)
    url.searchParams.delete("category")
    url.searchParams.delete("tag")
    window.history.pushState({}, "", url.toString())
  }

  const availableTags = useMemo(() => {
    const tags = filteredPosts.flatMap(p => p.tags)
    return [...new Set(tags)]
  }, [filteredPosts])

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4 text-purple-600" />
        <p className="text-gray-600">Loading blog posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Our <span className="gradient-text">Blog</span></h1>
            <p className="text-gray-600 dark:text-gray-300">Stay updated with the latest trends in web development.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            {(selectedCategory !== "All" || selectedTag) && (
              <div className="mb-6 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  {selectedCategory !== "All" && (
                    <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-700 text-sm">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-700 text-sm">
                      Tag: {selectedTag}
                    </span>
                  )}
                </div>
                <Button size="sm" variant="ghost" onClick={clearAllFilters}>
                  <X className="w-4 h-4 mr-1" /> Clear
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={cat === selectedCategory ? "default" : "outline"}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {selectedCategory !== "All" && availableTags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm mb-3">Filter by tags in {selectedCategory}:</h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full border text-xs ${
                        selectedTag === tag
                          ? "bg-purple-100 text-purple-700 border-purple-400"
                          : "bg-gray-100 hover:bg-purple-50 border-gray-200"
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      <Tag className="w-3 h-3 mr-1" /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {displayedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedPosts.map((post) => (
                  <Card key={post.slug} className="group overflow-hidden hover:-translate-y-1 transition">
                    <Link href={`/posts/${post.slug}`}>
                      <div className="relative h-44 w-full">
                        <Image
                          src={post.featuredImage?.url || "/placeholder.svg"}
                          alt={post.featuredImage?.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt ?? "").toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      <Link href={`/posts/${post.slug}`}>
                        <h3 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="line-clamp-3 text-sm text-gray-600 mb-4">{post.excerpt}</p>
                      <Link href={`/posts/${post.slug}`}>
                        <Button variant="ghost" className="p-0 text-purple-600">
                          Read more <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No posts match your filters.</p>
            )}

            {hasMorePosts && (
              <div className="mt-8 text-center">
                <Button onClick={() => setVisiblePosts((v) => v + POSTS_PER_PAGE)}>
                  Load More ({filteredPosts.length - visiblePosts} remaining)
                </Button>
              </div>
            )}
          </div>

          <div className="lg:w-1/3 space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
                <p className="text-gray-600 mb-3">Get web development insights in your inbox.</p>
                <input
                  className="w-full border px-3 py-2 mb-3 rounded"
                  type="email"
                  placeholder="Enter your email"
                />
                <Button className="w-full gradient-bg text-white">Subscribe</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-3">Recent Posts</h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.slug} className="flex gap-3">
                      <Link href={`/posts/${post.slug}`}>
                        <Image src={post.featuredImage?.url || "/placeholder.svg"} alt={post.title} width={60} height={60} className="rounded-lg object-cover" />
                      </Link>
                      <div>
                        <Link href={`/posts/${post.slug}`}>
                          <h4 className="text-sm hover:text-purple-600 transition">{post.title}</h4>
                        </Link>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt ?? "").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
