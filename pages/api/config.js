export default function handler(req, res) {
  res.status(200).json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
