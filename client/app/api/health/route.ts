import { NextResponse } from "next/server";
import { createClient as createSanityClient } from "@sanity/client";
import { createClient as createSb } from "@supabase/supabase-js";

export async function GET() {
  const missing = [
    "SANITY_PROJECT_ID","SANITY_DATASET","REVALIDATE_SECRET",
    "SUPABASE_URL","SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE"
  ].filter(k => !process.env[k]);

  // quick Sanity ping
  const sanity = createSanityClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
    apiVersion: process.env.SANITY_API_VERSION || "2023-10-01",
    useCdn: true,
    token: process.env.SANITY_READ_TOKEN
  });

  let sanityOK = true;
  try { await sanity.fetch(`count(*[])`); } catch { sanityOK = false; }

  // quick Supabase ping
  const sb = createSb(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  const { error: sbErr } = await sb.from("form_submissions").select("id").limit(1);

  return NextResponse.json({
    envMissing: missing,
    sanityOK,
    supabaseOK: !sbErr
  });
}
