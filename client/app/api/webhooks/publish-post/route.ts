// client/app/api/webhooks/publish-post/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient as createSanityClient } from "@sanity/client";

export const runtime = "nodejs";

const sanityWrite = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01",
  token: process.env.SANITY_WRITE_TOKEN!, // WRITE TOKEN, server-only
  useCdn: false,
});

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.INTERNAL_WEBHOOK_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { title, slug, excerpt, content, tags = [], categories = [], publishedAt } = await req.json();

  await sanityWrite.createOrReplace({
    _type: "post",
    _id: `post-${slug}`,
    title,
    slug: { current: slug },
    excerpt,
    content,
    tags,
    categories,
    publishedAt: publishedAt ?? new Date().toISOString(),
  });

  revalidatePath(`/posts/${slug}`);
  revalidatePath(`/blog`);

  return NextResponse.json({ ok: true, slug });
}
