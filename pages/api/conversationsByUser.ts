import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        return getConversationsByUser(req, res);
    } else {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
}

async function getConversationsByUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        membreCreateurId: req.body.id
                    },
                    {
                        membreSuiveurId: req.body.id
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                membreSuiveurId: true,
                membreCreateurId: true,
                membreSuiveur: true,
                membreCreateur: true,
                createdAt: true,
                updatedAt: true,
                messages: true
            }
        });        

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération des suivis" });
    }
}