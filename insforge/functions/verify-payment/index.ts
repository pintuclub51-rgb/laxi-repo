import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@insforge/sdk@latest";

const RAZORPAY_SECRET = Deno.env.get("RAZORPAY_SECRET") || "yJHnBmQZSK5tslQZ27xSwvbJ";

serve(async (req) => {
  const { method } = req;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, tenant_id, plan_name, amount } = await req.json();

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(RAZORPAY_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid signature");
    }

    // 2. Update Database
    const insforge = createClient({
      baseUrl: Deno.env.get("INSFORGE_URL") || "",
      anonKey: Deno.env.get("INSFORGE_ANON_KEY") || "",
    });

    // Update tenant plan
    await insforge.database
      .from("tenants")
      .update({ plan: plan_name, subscription_status: 'active' })
      .eq("id", tenant_id);

    // Create invoice
    await insforge.database
      .from("invoices")
      .insert([{
        tenant_id,
        amount,
        status: 'paid',
        razorpay_payment_id,
        razorpay_order_id,
      }]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
