import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

      const rdvs = await prisma.rendezVous.findMany({
        where: {
          startDate: {
            gte: thirtyMinutesAgo,
            lte: now
          }
        }
      })

      rdvs.forEach(async (element) => {
        if (element.etat === "A_VENIR") {
            await prisma.rendezVous.update({
                data: {
                    etat: "PASSE"
                },
                where: {
                    id: element.id as string
                }
            })
        }
      });

      res.status(200).json(rdvs);
    } catch (error) {
      console.error("Error fetching rendezVous:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}