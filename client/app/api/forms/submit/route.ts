// client/app/api/forms/submit/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // 1) Upsert into clients table (uses email to dedupe)
  let clientId: string | null = null;
  if (body.email) {
    const { data: client, error: upsertErr } = await supabase
      .from("clients")
      .upsert(
        {
          email: body.email,
          name: body.name,
          phone: body.phone ?? null,
          company: body.company ?? null,
        },
        { onConflict: "email", ignoreDuplicates: false }
      )
      .select("id")
      .single();

    if (upsertErr) {
      console.error(upsertErr);
    }
    clientId = client?.id || null;
  }

  // 2) Insert form submission
  const { error } = await supabase.from("form_submissions").insert({
    form_name: body.form ?? "contact",
    client_id: clientId,
    payload: body,
  });

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
