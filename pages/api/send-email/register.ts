import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, code } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: '"Rendez-vous" <rendezvous.medical.sae@gmail.com>',
      to: email,
      subject: "Votre code de vérification",
      text: `Votre code de vérification est : ${code}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de votre adresse e-mail</title>
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
            .confirmation-code {
              display: block;
              font-size: 24px;
              font-weight: bold;
              margin: 20px 0;
              text-align: center;
              color: #4CAF50;
            }
            .cta-button {
              display: block;
              width: 200px;
              margin: 20px auto;
              padding: 10px 0;
              text-align: center;
              background-color: #4CAF50;
              color: #ffffff;
              border-radius: 4px;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Bienvenue sur Rendez-vous</h1>
            </div>
            <div class="email-body">
              <p>Bonjour,</p>
              <p>Merci de vous être inscrit sur Rendez-vous. Pour compléter votre inscription, veuillez confirmer votre adresse e-mail en utilisant le code de confirmation ci-dessous :</p>
              <span class="confirmation-code">${code}</span>
              <p>Si vous n'avez pas demandé la création de ce compte, veuillez ignorer cet e-mail.</p>
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
