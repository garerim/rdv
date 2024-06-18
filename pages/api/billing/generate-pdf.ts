import { generatePdf } from '../../../lib/pdfGenerator';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const pdfBytes = await generatePdf(req.body);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

      res.status(200).send(pdfBytes);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Error generating PDF' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}