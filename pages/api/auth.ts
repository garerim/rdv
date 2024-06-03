import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { JWTToken } from "@prisma/client";
var jwt = require('jsonwebtoken');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return test(req, res);
  } else if (req.method === "POST") {
    return authUser(req, res);
  } else if (req.method === "DELETE") {
    return disconnect(req, res);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

async function test(req: NextApiRequest, res: NextApiResponse) {
  const email = "mathis.sportiello@gmail.com";
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
    
    await prisma.jWTToken.create({
      data: {
        token: token,
        user: {
          connect: {
            id: user.id,
          },
        },
        validUntilTimeStamp: (new Date().getTime() + 60*60*24*7).toString(),
      },
    });

    const jWTToken = await prisma.jWTToken.findMany();
    res.status(200).json(jWTToken);
  } catch (error) {
    console.error("Error creating JWT token:", error);
    res.status(500).json({ error: "Erreur lors de la création du JWT token" });
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
      var token;

      const existingJWT = await prisma.jWTToken.findFirst({
        where: {
          userId: user.id,
          isActive: 1
        }
      })
      
      if (existingJWT) {
        token = existingJWT.token
      } else {
        try {
          token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, 
            {
              expiresIn: 60*60*24*7,
            }
          );
          
          const dateFinValidite = (new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toString();
          // console.log(dateFinValidite)

          await prisma.jWTToken.create({
            data: {
              token: token,
              user: {
                connect: {
                  id: user.id,
                },
              },
              validUntilTimeStamp: dateFinValidite,
            },
          });
      
          res.status(200).json({ message: "Authentification réussie", user: user, jwtToken: token, jwtExp: dateFinValidite });
        } catch (error) {
          console.error("Error creating JWT token:", error);
          res.status(500).json({ error: "Erreur lors de la création du JWT token" });
        }
      }

      res.status(200).json({ message: "Authentification réussie", user: user, jwtToken: token, jwtExp: existingJWT?.validUntilTimeStamp });
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

async function disconnect(req: NextApiRequest, res: NextApiResponse) {
  const token = req.body;

  try {
    const jwtToken = await prisma.jWTToken.findFirst({
      where: {
        token
      }
    })

    if (jwtToken?.isActive === 1) {
      await prisma.jWTToken.updateMany({
        where: {
          token: jwtToken.token
        },
        data: {
          isActive: 0
        }
      })
    }
    res.json("JWT désactivé")
  } catch {
    console.log("This token you tried to delete don't exist.")
  }
}