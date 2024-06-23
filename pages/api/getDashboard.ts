import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        return getDashboard(req, res);
    } else {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
}

async function getDashboard(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const totalRevenus = await prisma.rendezVous.count({
            where: {
                AND: [
                    {
                        professionelId: id as string
                    },
                    {
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                        }
                    },
                    {
                        etat: "PASSE"
                    }
                ]
            }
        })
        const lastTotalRevenus = await prisma.rendezVous.count({
            where: {
                AND: [
                    {
                        professionelId: id as string
                    },
                    {
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        }
                    },
                    {
                        etat: "PASSE"
                    }
                ]
            }
        })

        const totalsubscriptions = await prisma.rendezVous.count({
            where: {
                AND: [
                    {
                        professionelId: id as string
                    },
                    {
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                        }
                    }
                ]
            }
        })

        const lastTotalsubscriptions = await prisma.rendezVous.count({
            where: {
                AND: [
                    {
                        professionelId: id as string
                    },
                    {
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        }
                    }
                ]
            }
        })

        var overview = [] as number[];

        for (let i = 0; i < 12; i++) {
            const total = await prisma.rendezVous.count({
                where: {
                    AND: [
                        {
                            professionelId: id as string
                        },
                        {
                            createdAt: {
                                gte: new Date(new Date().getFullYear(), i, 1),
                                lt: new Date(new Date().getFullYear(), i + 1, 1)
                            }
                        },
                        {
                            etat: "PASSE"
                        }
                    ]
                }
            })
            overview.push(total);
        }

        res.status(200).json({
            "totalRevenus": totalRevenus,
            "lastTotalRevenus": lastTotalRevenus,
            "totalSubscriptions": totalsubscriptions,
            "lastTotalSubscriptions": lastTotalsubscriptions,
            "overview": overview
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération des suivis" });
    }
}