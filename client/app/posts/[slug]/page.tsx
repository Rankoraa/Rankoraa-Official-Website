import BlogPostClientPage from "@/components/BlogPostClientPage"
import { fetchPostBySlug, fetchPosts } from "@/lib/cms"
import { notFound } from "next/navigation"

export const revalidate = 60 // <-- must be a number or "false" only!

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;          // ✅ destructure slug *after awaiting params*
  const post = await fetchPostBySlug(slug);
  if (!post) return notFound();

  const related = await fetchPosts(3);

  return (
    <BlogPostClientPage post={post} related={related} />
  );
}
