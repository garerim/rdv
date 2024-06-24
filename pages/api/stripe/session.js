import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_HOST;

export default async function handler(req, res) {
  const { method, body } = req;
  
  if (method === 'POST') {
    try {
      const { amount, metadata } = body;

      const date = new Date().toISOString();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Consultation-' + date,
              },
              unit_amount: amount * 100 || 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        cancel_url: `${host}`,
        success_url: `${host}/success_creation_rdv?session_id={CHECKOUT_SESSION_ID}`,
        metadata: metadata
      });

      console.log('Stripe session:', session);
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error('Error creating checkout session:', err);
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}