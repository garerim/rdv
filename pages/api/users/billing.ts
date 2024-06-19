import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return listAllCardsByUserId(req, res);
  } else if (req.method === "POST") {
    return createCard(req, res);
  } else if (req.method === "DELETE") {
    return deleteCard(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function listAllCardsByUserId(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const cards = await prisma.carteFactu.findMany({
      where: {
        userProfileId: userId as string,
      },
    });
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des cartes" });
  }
}

async function createCard(req: NextApiRequest, res: NextApiResponse) {
  const {
    userProfileId,
    nomCarte,
    numeroCarteQuatreDerniersChiffres,
    numeroCarte,
    dateExpiration,
    cvv,
  } = req.body;

  const encryptedNumeroCarte = await argon2.hash(numeroCarte);
  const encryptedDateExpiration = await argon2.hash(dateExpiration);
  const encryptedCVV = await argon2.hash(cvv);

  try {
    const createdCard = await prisma.carteFactu.create({
      data: {
        userProfileId: userProfileId as string,
        nomCarte,
        numeroCarteQuatreDerniersChiffres,
        numeroCarte: encryptedNumeroCarte,
        dateExpiration: encryptedDateExpiration,
        cvv: encryptedCVV,
      },
    });
    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de la carte" });
  }
}

async function deleteCard(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log(id)

  try {
    const deletedCard = await prisma.carteFactu.delete({
      where: {
        id: id as string,
      }
    });
    res.status(200).json(deletedCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la carte" });
  }
}
