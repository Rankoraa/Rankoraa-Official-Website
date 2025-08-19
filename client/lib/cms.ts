// // client/lib/cms.ts
// import { sanity } from "./sanity";
// import groq from "groq";

// export type BlogPost = {
//   slug: string;
//   title: string;
//   excerpt?: string;
//   featuredImage?: { url: string; alt?: string } | null;
//   content: any; // Portable Text
//   tags: string[];
//   categories: string[];
//   metaTitle?: string;
//   metaDescription?: string;
//   publishedAt?: string;
//   readTime: string;
//   author?: { name?: string; avatar?: string; bio?: string };
// };

// const PROJECTION = `
//   title,
//   "slug": slug.current,
//   excerpt,
//   "featuredImage": featuredImage.asset->{
//     "url": url,
//     "alt": @.alt
//   },
//   content,
//   "tags": coalesce(tags, []),
//   "categories": coalesce(categories, []),
//   "metaTitle": coalesce(seo.title, title),
//   "metaDescription": coalesce(seo.description, excerpt),
//   publishedAt,
//   "author": {
//     "name": author->name,
//     "avatar": author->image.asset->url,
//     "bio": author->bio
//   }
// `;

// export async function fetchPosts(limit = 24): Promise<BlogPost[]> {
//   const q = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{${PROJECTION}}`;
//   const posts = await sanity.fetch(q, { limit });
//   return (posts as any[]).map(attachReadTime);
// }

// export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
//   const q = groq`*[_type == "post" && slug.current == $slug][0]{${PROJECTION}}`;
//   const p = await sanity.fetch(q, { slug });
//   if (!p) return null;
//   return attachReadTime(p as any);
// }

// function attachReadTime(p: any): BlogPost {
//   const text = JSON.stringify(p.content || "").replace(/<[^>]+>/g, " ");
//   const words = text.split(/\s+/).filter(Boolean).length;
//   const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
//   return { ...(p as BlogPost), readTime };
// }


// client/lib/cms.ts
import { sanity } from "./sanity"
import groq from "groq"

export type BlogPost = {
  slug: string
  title: string
  excerpt?: string
  featuredImage?: { url: string; alt?: string } | null
  content: any
  tags: string[]
  categories: string[]
  metaTitle?: string
  metaDescription?: string
  publishedAt?: string
  readTime: string
  author?: { name?: string; avatar?: string; bio?: string }
}

const PROJECTION = groq`
  title,
  "slug": slug.current,
  excerpt,
  "featuredImage": {
    "url": select(
      defined(featuredImage.asset) => featuredImage.asset->url,
      defined(coverImageUrl) => coverImageUrl,
      null
    ),
    "alt": featuredImage.alt
  },
  content,
  "tags": coalesce(tags, []),
  "categories": coalesce(categories, []),
  publishedAt,
  "author": {
    "name": author->name,
    "avatar": author->image.asset->url,
    "bio": author->bio
  }
`

export async function fetchPosts(limit = 24): Promise<BlogPost[]> {
  const q = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{${PROJECTION}}`
  const posts = await sanity.fetch(q, { limit })
  return (posts as any[]).map(attachReadTime)
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = groq`*[_type == "post" && slug.current == $slug][0]{${PROJECTION}}`
  const p = await sanity.fetch(q, { slug })
  if (!p) return null
  return attachReadTime(p as any)
}

function attachReadTime(p: any): BlogPost {
  const text = JSON.stringify(p.content || "").replace(/<[^>]+>/g, " ")
  const words = text.split(/\s+/).filter(Boolean).length
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`
  return { ...(p as BlogPost), readTime }
}
