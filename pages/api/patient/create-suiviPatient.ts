import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { patientProfileId, diagnostique, traitement, medecinProfileId } = req.body;

  if (!patientProfileId || !diagnostique || !medecinProfileId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSuivi = await prisma.suivi.create({
      data: {
        patientProfileId,
        diagnostique,
        traitement,
        medecinProfileId,
      },
    });

    return res.status(200).json(newSuivi);
  } catch (error) {
    console.error('Error creating suivi:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
