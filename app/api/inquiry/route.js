import { NextResponse } from "next/server";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const required = ["name", "phone", "message"];
  const missing = required.filter((k) => !data?.[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  // TODO: replace with real delivery — e.g. send to WhatsApp Business API,
  // email via nodemailer/Resend, or write to a database / Google Sheet.
  // console.log("New inquiry:", data);

  return NextResponse.json({ ok: true });
}
