import { handleContactRequest } from "@/lib/contact/handle-contact-request.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleContactRequest(request, "booking");
}
