import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return getSpecificToken(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function getSpecificToken(req: NextApiRequest, res: NextApiResponse) {
  const { tokenBody } = req.body;

  if (!tokenBody) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const token = await prisma.jWTToken.findFirst({
      where: {
        isActive: 1,
        token: tokenBody,
      },
    });

    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    const user = await prisma.userProfile.findFirst({
      where: {
        id: token.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving token or user", error);
    res.status(500).json({ error: "Error retrieving token or user" });
  }
}
