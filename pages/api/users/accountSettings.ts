import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

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
  // console.log(req.body)
  const { id, password } = req.body.user;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

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

  if (!(await argon2.verify(password, oldPassword))) {
    return res.status(401).json({ message: "Ancien mot de passe incorrect" });
  } else {
    try {
      const updatedUser = await prisma.userProfile.update({
        where: { id },
        data: {
          password: await argon2.hash(newPassword),
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
}
