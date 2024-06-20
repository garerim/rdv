import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, details, dateAntecedent, nomMedecin, userProfileId } = req.body;

    try {
      const antecedent = await prisma.antecedent.create({
        data: {
          type,
          details,
          dateAntecedent: new Date(dateAntecedent),
          nomMedecin,
          userProfileId,
        },
      });

      res.status(201).json(antecedent);
    } catch (error) {
      console.error('Error creating antecedent:', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'antécédent' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
