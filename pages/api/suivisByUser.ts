import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getSuivisByUser(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function getSuivisByUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const suivis = await prisma.suivi.findMany({
        where:{
            patientProfileId : id as string
        }
        })
      res.status(200).json(suivis);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des suivis" });
    }
  }