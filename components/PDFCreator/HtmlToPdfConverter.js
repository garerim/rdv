import React, { useState } from 'react';

const HtmlToPdfConverter = () => {
  const [html, setHtml] = useState('');

  const convertToPdf = async () => {
    try {
      const response = await fetch('/api/billing/html-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert HTML to PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
    }
  };

  const handleHtmlChange = (event) => {
    setHtml(event.target.value);
  };

  return (
    <div>
      <textarea rows="10" cols="50" value={html} onChange={handleHtmlChange}></textarea>
      <br />
      <button onClick={convertToPdf}>Convert to PDF</button>
    </div>
  );
};

export default HtmlToPdfConverter;