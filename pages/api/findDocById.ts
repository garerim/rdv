import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return findDocById(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function findDocById(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    console.log("test : " + id)
    try {
        const doc = await prisma.userProfile.findFirst({
        where:{
            id : id as string
        }
        })
      res.status(200).json(doc);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du médecin" });
    }
  }