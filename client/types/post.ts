export interface BlogPost {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  tags: string[]
  categories: string[]
  metaTitle: string
  metaDescription: string
  publishedAt: string
  readTime: string
  author: {
    name: string
    avatar: string
    bio: string
  }
}

export interface BlogPostsData {
  posts: BlogPost[]
}
