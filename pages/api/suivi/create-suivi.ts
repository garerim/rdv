import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { patientProfileId, medecinProfileId, diagnostique, traitement } = req.body;

    try {
      const newSuivi = await prisma.suivi.create({
        data: {
          patientProfileId,
          medecinProfileId,
          diagnostique,
          traitement,
        },
      });

      res.status(200).json(newSuivi);
    } catch (error) {
      console.error('Error creating suivi:', error);
      res.status(500).json({ error: 'Error creating suivi' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
