import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchPostBySlug, fetchPosts } from "@/lib/api"
import BlogPostClientPage from "./BlogPostClientPage"

type PageParams = { slug: string }
type PageProps = { params: Promise<PageParams> } // params can be a Promise in new Next

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await fetchPostBySlug(slug)
    if (!post) {
      return {
        title: "Post Not Found | Rankoraa Blog",
        description: "The requested blog post could not be found.",
      }
    }

    const ogImage =
      post.featuredImage?.startsWith("http://") || post.featuredImage?.startsWith("https://")
        ? post.featuredImage
        : `${SITE_URL}${post.featuredImage || "/placeholder.svg"}`

    return {
      title: post.metaTitle,
      description: post.metaDescription,
      openGraph: {
        title: post.metaTitle,
        description: post.metaDescription,
        type: "article",
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.metaTitle,
        description: post.metaDescription,
        images: [ogImage],
      },
      alternates: {
        canonical: `${SITE_URL}/posts/${post.slug}`,
      },
    }
  } catch {
    return {
      title: "Post Not Found | Rankoraa Blog",
      description: "The requested blog post could not be found.",
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)
  if (!post) return notFound()
  const related = await fetchPosts()

  // Pass fully-resolved data to the client UI (no client fetches)
  return <BlogPostClientPage post={post} related={related} />
}
