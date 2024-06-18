import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getAllDoc(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function getAllDoc(req: NextApiRequest, res: NextApiResponse) {
    try {
        const docs = await prisma.userProfile.findMany({
        where:{
            role: "DOCTOR"
        }
        })
      res.status(200).json(docs);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des médecins" });
    }
  }