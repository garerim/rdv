import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ amount = 1 }) => {
  const router = useRouter();

  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      const metadata = {
        professionelId: 'some-professionel-id',
        patientId: 'some-patient-id',
        rendezVousId: 'some-rendezvous-id',
        prixAvantTVA: '100',
        TVA: '0.2',
        prixFinal: '120',
        contenu: 'some-content',
        description: 'some-description'
      };

      console.log('Sending metadata:', metadata);

      const res = await fetch('/api/stripe/session', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          metadata
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const { sessionId } = await res.json();
      console.log('Session data:', sessionId);

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Error redirecting to checkout:', error);
        router.push('/checkout/error');
      }
    } catch (err) {
      console.error('Error handling checkout:', err);
      router.push('/checkout/error');
    }
  };

  return (
    <button
      onClick={handler}
      className="bg-blue-700 hover:bg-blue-800 duration-200 px-8 py-4 text-white"
    >
      Payer par carte bancaire
    </button>
  );
};

export default CheckoutButton;