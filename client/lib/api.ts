import type { BlogPost } from "@/types/post"

/**
 * WordPress REST shapes (subset we use)
 */
interface WordPressPost {
  id: number
  slug: string
  title?: { rendered?: string }
  content?: { rendered?: string }
  excerpt?: { rendered?: string }
  featured_media?: number
  categories?: number[]
  tags?: number[]
  date?: string
  author?: number
  yoast_head_json?: {
    title?: string
    description?: string
  }
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string
      alt_text?: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        taxonomy: "category" | "post_tag" | string
      }>
    >
    author?: Array<{
      id: number
      name?: string
      avatar_urls?: { [key: string]: string }
      description?: string
    }>
  }
}

interface WordPressCategory {
  id: number
  name: string
  slug: string
}

interface WordPressTag {
  id: number
  name: string
  slug: string
}

interface WordPressAuthor {
  id: number
  name: string
  avatar_urls: { [key: string]: string }
  description: string
}

/**
 * Base URL
 * (You can switch to process.env.WORDPRESS_URL if you prefer)
 */
const API_BASE_URL = "https://api.rankoraa.com/wp-json/wp/v2"

/**
 * Simple in-memory caches (per server instance)
 */
let categoriesCache: WordPressCategory[] | null = null
let tagsCache: WordPressTag[] | null = null
let authorsCache: WordPressAuthor[] | null = null

/**
 * Helpers
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const text = typeof content === "string" ? stripHtml(content) : ""
  const minutes = Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / wordsPerMinute))
  return `${minutes} min read`
}

/**
 * Safe, fail-open fetchers
 */
async function fetchCategories(): Promise<WordPressCategory[]> {
  if (categoriesCache) return categoriesCache
  try {
    const res = await fetch(`${API_BASE_URL}/categories?per_page=100`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    })
    if (!res.ok) return []
    categoriesCache = (await res.json()) as WordPressCategory[]
    return categoriesCache ?? []
  } catch {
    return []
  }
}

async function fetchTags(): Promise<WordPressTag[]> {
  if (tagsCache) return tagsCache
  try {
    const res = await fetch(`${API_BASE_URL}/tags?per_page=100`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    })
    if (!res.ok) return []
    tagsCache = (await res.json()) as WordPressTag[]
    return tagsCache ?? []
  } catch {
    return []
  }
}

async function fetchAuthors(): Promise<WordPressAuthor[]> {
  if (authorsCache) return authorsCache
  try {
    const res = await fetch(`${API_BASE_URL}/users?per_page=100`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    })
    if (!res.ok) return []
    authorsCache = (await res.json()) as WordPressAuthor[]
    return authorsCache ?? []
  } catch {
    return []
  }
}

/**
 * Core transformer
 * - Prefer _embedded for author/terms/featured image
 * - Fall back to /users, /categories, /tags if needed
 * - Robust fallbacks for title/content/excerpt
 */
async function transformWordPressPost(wpPost: WordPressPost): Promise<BlogPost> {
  // Title
  const rawTitle = wpPost?.title?.rendered ?? "Untitled Post"
  const title = decodeHtml(rawTitle)

  // Content
  const contentHtml =
    wpPost?.content?.rendered && typeof wpPost.content.rendered === "string"
      ? wpPost.content.rendered
      : "<p>Content not available.</p>"

  // Excerpt
  let cleanExcerpt = "Read more about this topic..."
  if (wpPost?.excerpt?.rendered && typeof wpPost.excerpt.rendered === "string") {
    cleanExcerpt = stripHtml(
      wpPost.excerpt.rendered.replace(/\[&hellip;\]/g, "...").replace(/&nbsp;/g, " "),
    )
  } else {
    const text = stripHtml(contentHtml)
    cleanExcerpt = text.length > 160 ? `${text.slice(0, 160)}...` : text
  }

  // Featured image
  let featuredImage = "/placeholder.svg"
  const embeddedFeatured = wpPost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url
  if (embeddedFeatured && typeof embeddedFeatured === "string") {
    featuredImage = embeddedFeatured
  }

  // Terms (categories/tags)
  let postCategories: string[] = []
  let postTags: string[] = []

  const embeddedTerms = wpPost?._embedded?.["wp:term"] || []
  if (embeddedTerms.length) {
    const flat = embeddedTerms.flat().filter(Boolean)
    postCategories = flat.filter((t) => t.taxonomy === "category").map((t) => t.name)
    postTags = flat.filter((t) => t.taxonomy === "post_tag").map((t) => t.name)
  }

  if (postCategories.length === 0 && Array.isArray(wpPost?.categories) && wpPost.categories.length) {
    const allCats = await fetchCategories()
    postCategories = wpPost.categories
      .map((id) => allCats.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[]
  }
  if (postTags.length === 0 && Array.isArray(wpPost?.tags) && wpPost.tags.length) {
    const allTags = await fetchTags()
    postTags = wpPost.tags
      .map((id) => allTags.find((t) => t.id === id)?.name)
      .filter(Boolean) as string[]
  }

  // Author (prefer embedded; fall back to /users)
  const embeddedAuthor = wpPost?._embedded?.author?.[0]
  let authorName = embeddedAuthor?.name
  let authorAvatar =
    embeddedAuthor?.avatar_urls?.["96"] ||
    embeddedAuthor?.avatar_urls?.["48"] ||
    "/professional-developer-headshot.png"
  let authorBio = embeddedAuthor?.description

  if (!authorName && typeof wpPost?.author === "number") {
    const authors = await fetchAuthors() // may be []
    const a = authors.find((x) => x.id === wpPost.author)
    if (a) {
      authorName = a.name
      authorAvatar = a.avatar_urls?.["96"] || a.avatar_urls?.["48"] || authorAvatar
      authorBio = a.description || authorBio
    }
  }

  const publishedAt = wpPost?.date || new Date().toISOString()

  return {
    id: wpPost?.id || Math.random(),
    slug: wpPost?.slug || `post-${wpPost?.id ?? Math.floor(Math.random() * 1e6)}`,
    title,
    content: contentHtml,
    excerpt: cleanExcerpt,
    featuredImage,
    tags: postTags,
    categories: postCategories.length ? postCategories : ["General"],
    metaTitle: wpPost?.yoast_head_json?.title || title,
    metaDescription: wpPost?.yoast_head_json?.description || cleanExcerpt,
    publishedAt,
    readTime: calculateReadingTime(contentHtml),
    author: {
      name: authorName || "Rankoraa Team",
      avatar: authorAvatar || "/professional-developer-headshot.png",
      bio: authorBio || "Content creator at Rankoraa",
    },
  }
}

/**
 * Public API
 */
export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    // Force full fields + view context to avoid trimmed responses by security plugins
    const url = `${API_BASE_URL}/posts?per_page=100&_embed=1&status=publish&orderby=date&order=desc&context=view&_fields=id,slug,title,content,excerpt,date,author,_embedded,yoast_head_json`

    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5m ISR
      headers: { Accept: "application/json" },
    })

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
      return []
    }

    const data = (await res.json()) as unknown
    if (!Array.isArray(data)) {
      console.warn("WordPress API /posts did not return an array")
      return []
    }

    const valid = (data as WordPressPost[]).filter((p) => p && typeof p === "object" && p.id && p.slug)
    if (!valid.length) return []

    const transformed = await Promise.all(valid.map((p) => transformWordPressPost(p)))

    // Dev hint if something is missing
    if (process.env.NODE_ENV !== "production") {
      transformed.forEach((t) => {
        if (!t.title) console.warn("WP title missing for", t.slug || t.id)
        if (!t.content) console.warn("WP content missing for", t.slug || t.id)
      })
    }

    return transformed
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!slug || typeof slug !== "string") return null

    // Use a REAL slug here (your example slug works)
    const url = `${API_BASE_URL}/posts?slug=${encodeURIComponent(
      slug,
    )}&_embed=1&status=publish&context=view&_fields=id,slug,title,content,excerpt,date,author,_embedded,yoast_head_json`

    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5m ISR
      headers: { Accept: "application/json" },
    })

    if (!res.ok) {
      console.error(`Failed to fetch post: ${res.status} ${res.statusText}`)
      return null
    }

    const arr = (await res.json()) as unknown
    if (!Array.isArray(arr) || arr.length === 0) return null

    const wpPost = arr[0] as WordPressPost
    if (!wpPost || !wpPost.id) return null

    const transformed = await transformWordPressPost(wpPost)

    if (process.env.NODE_ENV !== "production") {
      if (!transformed.title) console.warn("WP title missing for", slug)
      if (!transformed.content) console.warn("WP content missing for", slug)
    }

    return transformed
  } catch (error) {
    console.error("Error fetching post by slug:", error)
    return null
  }
}

export async function fetchAllCategories(): Promise<string[]> {
  const categories = await fetchCategories()
  return categories.map((c) => c.name).sort()
}

export async function fetchAllTags(): Promise<string[]> {
  const tags = await fetchTags()
  return tags.map((t) => t.name).sort()
}
