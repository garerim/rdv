import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getUserByDoc(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function getUserByDoc(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const rdvs = await prisma.rendezVous.findMany({
            where: {
              professionelId: id as string,
            },
            select: {
              patientId: true,
            },
          });
      
          // Extraire les identifiants des utilisateurs (patients)
          const userIds = rdvs.map(rdv => rdv.patientId);
      
          // Récupérer les détails des utilisateurs en fonction des identifiants
          const users = await prisma.userProfile.findMany({
            where: {
              id: {
                in: userIds,
              },
            },
          });
        
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
  }