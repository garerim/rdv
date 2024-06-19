import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import prisma from '../../../lib/prisma'; // Adjust the path according to your setup

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Log the entire session object for debugging
    console.log("Session object: ", session);

    // Validate session metadata
    const {
      professionelId,
      patientId,
      rendezVousId,
      prixAvantTVA,
      TVA,
      prixFinal,
      contenu,
      description,
    } = session.metadata;

    // Log metadata for debugging
    console.log("Session metadata: ", session.metadata);

    if (!professionelId || !patientId || !rendezVousId || !prixAvantTVA || !TVA || !prixFinal || !contenu) {
      return res.status(400).json({ error: "Invalid session metadata" });
    }

    // Create a new devis in your database
    const devis = await prisma.devis.create({
      data: {
        professionelId,
        patientId,
        rendezVousId,
        prixAvantTVA: parseFloat(prixAvantTVA),
        TVA: parseFloat(TVA),
        prixFinal: parseFloat(prixFinal),
        contenu,
        description,
      },
    });

    res.status(200).json(devis);
  } catch (error) {
    console.error('Error creating devis:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}