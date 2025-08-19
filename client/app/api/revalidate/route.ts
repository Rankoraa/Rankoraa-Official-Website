// app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  if (sp.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath(sp.get("path") || "/blog");
  return NextResponse.json({ ok: true });
}
