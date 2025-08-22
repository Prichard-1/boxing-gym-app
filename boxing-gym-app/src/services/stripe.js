export async function createCheckoutSession(planId) {
  const response = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  const session = await response.json();
  if (session.url) {
    window.location.href = session.url;
  }
}

