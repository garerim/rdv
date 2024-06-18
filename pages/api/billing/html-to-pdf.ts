import puppeteer from 'puppeteer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { html } = req.body;

    try {
      const browser = await puppeteer.launch({
        timeout: 0, // No timeout for launching the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional options as needed
      });

      const page = await browser.newPage();
      await page.setContent(html);

      // Generate PDF with custom options
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px',
        },
      });

      await browser.close();

      // Set response headers for download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

      // Send the PDF buffer as the response
      res.status(200).send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Error generating PDF' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}