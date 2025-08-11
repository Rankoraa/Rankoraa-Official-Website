"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, ArrowRight, X, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { fetchPosts } from "@/lib/api"
import type { BlogPost } from "@/types/post"

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  

  // Fetch posts on component mount
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        setError(null)
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.")
        console.error("Error loading posts:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Handle URL parameters for category and tag filtering
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

  // Get all unique categories from posts
  const categories = useMemo(() => {
    if (posts.length === 0) return ["All"]
    const allCategories = posts.flatMap((post) => post.categories)
    const uniqueCategories = Array.from(new Set(allCategories))
    return ["All", ...uniqueCategories.sort()]
  }, [posts])

  // Filter posts based on selected category and tag
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.categories.includes(selectedCategory))
    }

    // Filter by tag if selected
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    return filtered
  }, [posts, selectedCategory, selectedTag])

  // Get visible posts based on pagination
  const displayedPosts = filteredPosts.slice(0, visiblePosts)

  // Check if there are more posts to load
  const hasMorePosts = visiblePosts < filteredPosts.length

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedTag(null) // Reset tag filter when category changes
    setVisiblePosts(POSTS_PER_PAGE) // Reset pagination

    // Update URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("tag")
      if (category !== "All") {
        url.searchParams.set("category", category)
      } else {
        url.searchParams.delete("category")
      }
      window.history.pushState({}, "", url.toString())
    }
  }

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null) // Deselect if already selected
      // Update URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.searchParams.delete("tag")
        window.history.pushState({}, "", url.toString())
      }
    } else {
      setSelectedTag(tag)
      setVisiblePosts(POSTS_PER_PAGE) // Reset pagination
      // Update URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.searchParams.set("tag", tag)
        url.searchParams.delete("category")
        window.history.pushState({}, "", url.toString())
      }
    }
  }

  // Handle load more posts
  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedTag(null)
    setVisiblePosts(POSTS_PER_PAGE)
    // Update URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("category")
      url.searchParams.delete("tag")
      window.history.pushState({}, "", url.toString())
    }
  }

  // Get unique tags from currently filtered posts for tag display
  const availableTags = useMemo(() => {
    const tags = filteredPosts.flatMap((post) => post.tags)
    return Array.from(new Set(tags)).sort()
  }, [filteredPosts])

  // Loading state
  if (loading) {
    return (
      <div className="pt-16">
        {/* Hero */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                Stay updated with the latest trends, tips, and insights from the world of web development.
              </p>
            </div>
          </div>
        </section>

        {/* Loading */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading blog posts...</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="pt-16">
        {/* Hero */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                Stay updated with the latest trends, tips, and insights from the world of web development.
              </p>
            </div>
          </div>
        </section>

        {/* Error */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Failed to Load Posts</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                <Button onClick={() => window.location.reload()} className="gradient-bg text-white">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#0b0b0f] dark:via-slate-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Stay updated with the latest trends, tips, and insights from the world of web development.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:w-2/3">
              {/* Active Filters Display */}
              {(selectedCategory !== "All" || selectedTag) && (
                <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
                      {selectedCategory !== "All" && (
                        <span className="inline-flex items-center bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                          Category: {selectedCategory}
                        </span>
                      )}
                      {selectedTag && (
                        <span className="inline-flex items-center bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                          Tag: {selectedTag}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>
                </div>
              )}

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategorySelect(category)}
                    className={
                      category === selectedCategory
                        ? "gradient-bg text-white"
                        : "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 bg-transparent"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Tag Filters (show only when category is selected and not "All") */}
              {selectedCategory !== "All" && availableTags.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Filter by tags in {selectedCategory}:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`inline-flex items-center text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                          selectedTag === tag
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-700"
                        }`}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTag ? (
                    <>
                      Showing {filteredPosts.length} posts tagged with "{selectedTag}"
                      {selectedCategory !== "All" && ` in ${selectedCategory}`}
                    </>
                  ) : selectedCategory !== "All" ? (
                    <>
                      Showing {filteredPosts.length} posts in {selectedCategory}
                    </>
                  ) : (
                    <>
                      Showing {displayedPosts.length} of {filteredPosts.length} posts
                    </>
                  )}
                </p>
              </div>

              {/* Blog Posts Grid */}
              {displayedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {displayedPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <Link href={`/posts/${post.slug}`}>
                          <Image
                            src={post.featuredImage || "/placeholder.svg"}
                            alt={post.title}
                            width={400}
                            height={300}
                            className="w-full h-44 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                          />
                        </Link>
                        <div className="absolute top-4 left-4">
                          <button
                            onClick={() => handleCategorySelect(post.categories[0])}
                            className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-300 hover:bg-white dark:hover:bg-black transition-colors cursor-pointer"
                          >
                            {post.categories[0]}
                          </button>
                        </div>
                      </div>
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>

                        <Link href={`/posts/${post.slug}`}>
                          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleTagSelect(tag)}
                              className={`inline-flex items-center text-xs px-2 py-1 rounded transition-all duration-200 ${
                                selectedTag === tag
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300"
                              }`}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </button>
                          ))}
                        </div>

                        <Link href={`/posts/${post.slug}`}>
                          <Button
                            variant="ghost"
                            className="p-0 h-auto text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200"
                          >
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found for the selected filters.</p>
                  <Button onClick={clearAllFilters} className="mt-4 gradient-bg text-white">
                    Show All Posts
                  </Button>
                </div>
              )}

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="text-center mt-8">
                  <Button
                    onClick={handleLoadMore}
                    size="lg"
                    variant="outline"
                    className="border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                  >
                    Load More Posts ({filteredPosts.length - visiblePosts} remaining)
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6 lg:space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Stay Updated</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                      Get the latest web development tips and insights delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-200"
                      />
                      <Button className="w-full gradient-bg text-white">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Web Design",
                        "React",
                        "Next.js",
                        "SEO",
                        "Performance",
                        "E-commerce",
                        "UX/UI",
                        "JavaScript",
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedCategory("All")
                            handleTagSelect(tag)
                          }}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            selectedTag === tag
                              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
                              : "bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {posts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex gap-3">
                          <Link href={`/posts/${post.slug}`}>
                            <Image
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              width={60}
                              height={60}
                              className="w-14 h-14 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </Link>
                          <div>
                            <Link href={`/posts/${post.slug}`}>
                              <h4 className="text-sm font-medium line-clamp-2 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer transition-colors">
                                {post.title}
                              </h4>
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
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
          </div>
        </div>
      </section>
    </div>
  )
}
