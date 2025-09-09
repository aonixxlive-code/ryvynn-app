import { useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  useEffect(() => {
    const initializeCheckout = async () => {
      const resConfig = await fetch('/api/config');
      const { publishableKey, priceId } = await resConfig.json();
      const stripe = Stripe(publishableKey);
      const btn = document.getElementById('subscribe-btn');
      if (btn) {
        btn.addEventListener('click', async () => {
          const response = await fetch('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId }),
          });
          const data = await response.json();
          if (data.id) {
            await stripe.redirectToCheckout({ sessionId: data.id });
          } else {
            alert('Error creating checkout session.');
          }
        });
      }
    };
    initializeCheckout();
  }, []);

  return (
    <>
      <Script src="https://js.stripe.com/v3/" />
      <h1>RYVYNN Plus</h1>
      <p>Subscribe to unlock all features.</p>
      <button id="subscribe-btn">Start RYVYNN Plus</button>
    </>
  );
}
