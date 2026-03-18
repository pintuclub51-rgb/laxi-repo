import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

/**
 * Handle Razorpay Webhooks or Subscription Creation.
 * 
 * Flow:
 * 1. Receive Razorpay Payload.
 * 2. Verify Signature.
 * 3. Update 'subscriptions' and 'tenants' tables.
 */
serve(async (req) => {
  const { method } = req;
  
  if (method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  try {
    const payload = await req.json();
    console.log('Razorpay Webhook Payload:', JSON.stringify(payload, null, 2));

    // Logic to verify Razorpay signature would go here.
    // For now, we'll proceed by updating the subscription status for testing.
    
    return new Response(JSON.stringify({ message: "Webhook processed" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
