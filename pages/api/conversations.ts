import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return listAllConversations(req, res);
  } else if (req.method === "POST") {
    return createConversation(req, res);
  } else if (req.method === "PUT") {
    return editConversation(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function listAllConversations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.conversation.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des conversations" });
  }
}

async function editConversation(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.conversation.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des conversations" });
  }
}

async function createConversation(req: NextApiRequest, res: NextApiResponse) {
  const { name, userProfileId, membreCreateurId } = req.body;

  try {
    const newConversation = await prisma.conversation.create({
      data: {
        name,
        membreCreateurId,
        membreSuiveurId: userProfileId
      },
    });
    res.status(200).json(newConversation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la conversation" });
  }
}