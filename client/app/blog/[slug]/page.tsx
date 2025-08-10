// app/blog/[slug]/page.tsx

interface BlogProps {
    params: { slug: string };
  }
  
  export default async function BlogPost({ params }: BlogProps) {
    const res = await fetch(`https://80.225.225.60/wp-json/wp/v2/posts?slug=${params.slug}`);
    const post = (await res.json())[0];
  
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    );
  }