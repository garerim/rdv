import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generatePdf = async (data: { name: string; email: string }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  page.drawText('PDF Generation Example', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Name: ${data.name}`, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Email: ${data.email}`, {
    x: 50,
    y: height - 8 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};