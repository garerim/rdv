import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createRDV(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function createRDV(req: NextApiRequest, res: NextApiResponse) {
    const { professionelId, patientId, startDate, duration, typeRendezVous, description, prix } = req.body;
  
    try {
      const newRDV = await prisma.rendezVous.create({
        data: {
          professionelId: professionelId,
          patientId: patientId,
          startDate: startDate as string,
          duration: duration,
          etat: "A_VENIR",
          typeRendezVous: typeRendezVous,
          description: description,
          prix: prix,
          fichierJoint: ""
        },

      });
      res.status(200).json(newRDV);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création du rendez-vous" });
    }
  }