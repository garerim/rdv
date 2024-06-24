import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createRDV(req, res);
  } else if (req.method === "DELETE") {
    return deleteRDV(req, res);
  } else if (req.method === "PUT") {
    return modifyRDV(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function createRDV(req: NextApiRequest, res: NextApiResponse) {
  const { id, professionelId, patientId, startDate, duration, typeRendezVous, description, prix } = req.body;

  try {
    console.log(await existsById(id as string))
    if ((await existsById(id as string))===false) {
      const newRDV = await prisma.rendezVous.create({
        data: {
          id: id,
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
    } else {
      res.status(400)
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création du rendez-vous" });
  }
}

async function deleteRDV(req: NextApiRequest, res: NextApiResponse) {
  const { rdvId } = req.query;

  try {
    const newRDV = await prisma.rendezVous.delete({
      where: {
        id: rdvId as string
      },

    });
    res.status(200).json(newRDV);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du rendez-vous" });
  }
}

async function modifyRDV(req: NextApiRequest, res: NextApiResponse) {
  const { professionelId, patientId, startDate, duration, etat, typeRendezVous, description, prix, fichierJoint } = req.body;
  const { rdvId } = req.query;
  console.log(rdvId as string);
  try {
    const newRDV = await prisma.rendezVous.update({
      data: {
        professionelId: professionelId,
        patientId: patientId,
        startDate: startDate as string,
        duration: duration,
        etat: etat,
        typeRendezVous: typeRendezVous,
        description: description,
        prix: prix,
        fichierJoint: fichierJoint
      },
      where: {
        id: rdvId as string
      },
    });
    res.status(200).json(newRDV);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la modification du rendez-vous" });
  }
}

async function existsById(id: string) {
  try {
    const rdv = await prisma.rendezVous.count({
      where: {
        id: id
      },
    });
    return rdv > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}