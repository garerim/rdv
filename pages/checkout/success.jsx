import Head from "next/head";
import HtmlToPdfConverter from '../../components/PDFCreator/HtmlToPdfConverter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;

  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    if (session_id) {
      const fetchSession = async () => {
        try {
          const session = await stripe.checkout.sessions.retrieve(session_id);
          setMetadata(session.metadata);
        } catch (error) {
          console.error('Error fetching session:', error);
        }
      };

      fetchSession();
    }
  }, [session_id]);

  const handleGeneratePdf = () => {
    if (metadata) {
      generatePdf(metadata);
    }
  };

  if (!metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-white text-4xl">Success</h1>
        <h2>Metadata:</h2>
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
        <button
          onClick={handleGeneratePdf}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export const generatePdf = async (metadata) => {
  try {
    const response = await fetch('/api/billing/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metadata }),
    });

    if (!response.ok) {
      throw new Error('Error generating PDF');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export default Success;