import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

const RAZORPAY_KEY = Deno.env.get("RAZORPAY_KEY_ID") || "rzp_test_SS6ATCngAC8vhJ";
const RAZORPAY_SECRET = Deno.env.get("RAZORPAY_SECRET") || "yJHnBmQZSK5tslQZ27xSwvbJ";

serve(async (req) => {
  const { method } = req;
  
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    const { amount, currency = "INR", receipt } = await req.json();

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`)}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
      }),
    });

    const order = await response.json();

    return new Response(JSON.stringify(order), {
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
