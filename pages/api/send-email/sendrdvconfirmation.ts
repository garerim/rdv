import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const {
      professionelId,
      patientId,
      startDate,
      duration,
      typeRendezVous,
      description,
      prix,
    } = data;

    const docName = await prisma.userProfile.findUnique({
      where: { id: professionelId },
    }).then((user) => user?.firstName + " " + user?.lastName);

    const userEmail = await prisma.userProfile.findUnique({
      where: { id: patientId },
    }).then((user) => user?.email);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: '"Rendez-vous" <rendezvous.medical.sae@gmail.com>',
      to: userEmail,
      subject: `Confirmation de rendez-vous médical : le ${new Date(
        startDate
      ).toLocaleString("fr-FR")}`,
      text: `Vous avez pris un rendez-vous médical le avec le Dr. ${docName}. Veuillez consulter votre compte pour plus de détails.`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de rendez-vous médical</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 20px;
            }
            .email-container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 0 auto;
            }
            .email-header {
              text-align: center;
              padding-bottom: 20px;
            }
            .email-body {
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
            }
            .email-footer {
              text-align: center;
              padding-top: 20px;
              font-size: 14px;
              color: #777777;
            }
            .appointment-details {
              font-size: 18px;
              font-weight: bold;
              margin: 20px 0;
              text-align: center;
              color: #4CAF50;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Confirmation de rendez-vous médical</h1>
            </div>
            <div class="email-body">
              <p>Bonjour,</p>
              <p>Votre rendez-vous médical du ${new Date(
                startDate
              ).toLocaleString(
                "fr-FR"
              )} est confirmé avec le Dr. ${docName}. Voici les détails de votre rendez-vous :</p>
              <div class="appointment-details">
                <p>Date et heure: ${new Date(startDate).toLocaleString(
                  "fr-FR"
                )}</p>
                <p>Motif de consultation: ${typeRendezVous}</p>
                <p>Description: ${description}</p>
                <p>Durée: ${duration} minutes</p>
                <p>Prix: ${prix} €</p>
              </div>
              <p>Veuillez consulter votre compte pour plus de détails.</p>
              <p>Cordialement,<br>L'équipe de Rendez-vous</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Rendez-vous. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email envoyé avec succès" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de l'envoi de l'email", error });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
