import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const oneDay = 60 * 60 * 1000;
      const now = new Date();
      const tomorrow = new Date(now.getTime() + oneDay);
      const tomorrowMinus1m = new Date(tomorrow.getTime() - 60 * 1000);

      const rdvs = await prisma.rendezVous.findMany({
        where: {
          startDate: {
            gte: tomorrowMinus1m,
            lte: tomorrow,
          },
        },
      });

      const result = await Promise.all(rdvs.map(async (element) => {
        const user = await prisma.userProfile.findUnique({
          where: { id: element.patientId },
        });

        const docteur = await prisma.userProfile.findUnique({
          where: { id: element.professionelId },
        });

        return {
          userEmail: user?.email,
          startDate: element?.startDate,
          description: element?.description,
          docName: docteur?.firstName + " " + docteur?.lastName
        };
      }));

      res.status(200).json(result)
    } catch {
      res.status(400)
    }
  }
}