import { generatePdf} from '../../../lib/pdfGenerator';
import { NextApiResponse, NextApiRequest } from 'next';
import { createReadStream } from 'fs';
/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Generate the PDF
      const pdfBuffer = await generatePdf(req.body); // Example: Generate PDF based on request body

      // Set response headers for download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

      // Stream the PDF buffer to the response
      const stream = createReadStream(pdfBuffer);
      stream.pipe(res);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Error generating PDF' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}*/