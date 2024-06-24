import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        return getRdvByUser(req, res);
    } else {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
}

async function getRdvByUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query
        const requester = await prisma.userProfile.findFirst({
            where: {
                id: id as string
            }
        })
        var rdvs = undefined;
        if (requester?.role === "USER") {
            rdvs = await prisma.rendezVous.findMany({
                where: {
                    patientId: id as string
                }
            })
        } else if (requester?.role === "DOCTOR") {
            rdvs = await prisma.rendezVous.findMany({
                where: {
                    professionelId: id as string
                },
                include: {
                    patient: {
                        select: {
                            avatar: true,
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            })
        }

        res.status(200).json(rdvs);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération des rendez-vous" });
    }
}