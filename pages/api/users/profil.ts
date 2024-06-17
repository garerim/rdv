import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    return putUser(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function putUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    avatar,
    firstName,
    lastName,
    email,
    tags,
    description,
    socialWebsite,
    socialYoutube,
    socialFacebook,
    socialTwitter,
    socialLinkedin,
    socialInstagram,
    video,
  } = req.body.user;

  const token = req.body.tokenBody;

  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  prisma.jWTToken
    .findFirst({
      where: {
        token: token,
        isActive: 1,
      },
    })
    .then((token) => {
      if (!token) {
        return res.status(401).json({ message: "Non autorisé" });
      }
    });

  try {
    const updatedUser = await prisma.userProfile.update({
      where: { id },
      data: {
        avatar,
        firstName,
        lastName,
        email,
        tags,
        description,
        socialWebsite,
        socialYoutube,
        socialFacebook,
        socialTwitter,
        socialLinkedin,
        socialInstagram,
        video,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
}
