import React from 'react';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function createPdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 24;

  page.drawText(data.title, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(data.content, {
    x: 50,
    y: height - 8 * fontSize,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}