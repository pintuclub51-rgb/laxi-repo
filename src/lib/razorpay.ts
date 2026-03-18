export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: "50000", // Example amount in paise
  currency: "INR",
  name: "SoluGrow",
  description: "Subscription Plan Upgrade",
  image: "https://solugrow.com/logo.png",
  handler: function (response: any) {
    console.log("Payment Success:", response);
    // This will be handled in the component
  },
  prefill: {
    name: "",
    email: "",
    contact: ""
  },
  theme: {
    color: "#7A2E2E"
  }
};
