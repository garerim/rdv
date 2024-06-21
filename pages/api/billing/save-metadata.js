import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { devis, rendezVous } = req.body;

    try {
      const newRendezVous = await prisma.rendezVous.create({
        data: {
          id: rendezVous.id,
          professionelId: rendezVous.professionelId,
          patientId: rendezVous.patientId,
          startDate: new Date(rendezVous.startDate),
          duration: parseFloat(rendezVous.duration),
          etat: rendezVous.etat,
          typeRendezVous: rendezVous.typeRendezVous,
          description: rendezVous.description,
          prix: parseFloat(rendezVous.prix),
          fichierJoint: rendezVous.fichierJoint,
        },
      });

      const newDevis = await prisma.devis.create({
        data: {
          id: devis.id,
          professionelId: devis.professionelId,
          patientId: devis.patientId,
          rendezVousId: devis.rendezVousId,
          prixAvantTVA: parseFloat(devis.prixAvantTVA),
          TVA: parseFloat(devis.TVA),
          prixFinal: parseFloat(devis.prixFinal),
          contenu: devis.contenu,
          description: devis.description,
        },
      });

      res.status(200).json({ newDevis, newRendezVous });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}