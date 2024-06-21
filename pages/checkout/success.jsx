import Head from "next/head";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import Devis from '../../components/checkout/devis';
import RendezVous from '../../components/checkout/rendezvous';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [devis, setDevis] = useState(null);
  const [rendezVous, setRendezVous] = useState(null);

  useEffect(() => {
    if (session_id) {
      const fetchSession = async () => {
        try {
          const session = await stripe.checkout.sessions.retrieve(session_id);
          const { id, professionelId, patientId, rendezVousId, prixAvantTVA, TVA, prixFinal, contenu, description, startDate, duration, etat, typeRendezVous, prix, fichierJoint } = session.metadata;

          const fetchedDevis = new Devis({
            id,
            professionelId,
            patientId,
            rendezVousId,
            prixAvantTVA: parseFloat(prixAvantTVA),
            TVA: parseFloat(TVA),
            prixFinal: parseFloat(prixFinal),
            contenu,
            description,
          });

          const fetchedRendezVous = new RendezVous({
            id,
            professionelId,
            patientId,
            startDate: new Date(startDate),
            duration: parseFloat(duration),
            etat,
            typeRendezVous,
            description,
            prix: parseFloat(prix),
            fichierJoint,
          });

          setRendezVous(fetchedRendezVous);
          setDevis(fetchedDevis);
        } catch (error) {
          console.error('Error fetching session:', error);
        }
      };

      fetchSession();
    }
  }, [session_id]);

  const handleSaveMetadata = async () => {
    try {
      const response = await fetch('/api/billing/save-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devis: devis.toJSON(),
          rendezVous: rendezVous.toJSON(),
        }),
      });

      if (response.ok) {
        console.log('Metadata saved successfully');
      } else {
        console.error('Failed to save metadata');
      }
    } catch (error) {
      console.error('Error saving metadata:', error);
    }
  };

  const handleGeneratePDF = () => {
    if (devis) {
      generatePdf({ devis });
    } else {
      console.error('Metadata is not available to generate PDF');
    }
  };

  const generatePdf = async (metadata) => {
    try {
      const response = await fetch('/api/billing/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata, null, 2),
      });

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

  if (!devis || !rendezVous) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-white text-4xl">Success</h1>
        <h2>Devis:</h2>
        <pre>{devis.toString()}</pre>
        <h2>RendezVous:</h2>
        <pre>{rendezVous.toString()}</pre>
        <button onClick={handleSaveMetadata}>Save Metadata to Database</button>
        <button onClick={handleGeneratePDF}>Generate PDF</button>
      </div>
    </div>
  );
};

export default Success;