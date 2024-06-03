import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return listAllUsers(req, res);
  } else if (req.method === "POST") {
    return createUser(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function listAllUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.userProfile.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, rawPassword, firstName, lastName, sexe, birthDate } = req.body;

  // hash password
  const password = await argon2.hash(rawPassword);

  try {
    const newUser = await prisma.userProfile.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        sexe,
        birthDate: new Date(birthDate),
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
}

async function authUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, rawPassword } = req.body;

  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (await argon2.verify(user.password, rawPassword)) {
      res.status(200).json({ message: "Authentification réussie" });
    } else {
      res.status(401).json({ error: "Mot de passe incorrect" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'authentification de l'utilisateur" });
  }
}