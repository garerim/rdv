import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const oneDay = 24 * 60 * 60 * 1000;
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

      rdvs.forEach(async (element) => {
        console.log(element)
        const user = await prisma.userProfile
          .findUnique({
            where: {
              id: element.patientId,
            },
          })
          .then(async (user) => {
            await prisma.userProfile
              .findUnique({
                where: {
                  id: element.professionelId,
                },
              })
              .then((docteur) => {
                // console.log(element.startDate as unknown as string),
                res.status(200).json({
                  userEmail: user?.email,
                  startDate: element?.startDate,
                  description: element?.description,
                  docName: docteur?.firstName + " " + docteur?.lastName
                });
              }).catch(() => res.status(500));
          }).catch(() => res.status(500))
      })
    } catch (error) {
      console.error("Error fetching rendezVous:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
