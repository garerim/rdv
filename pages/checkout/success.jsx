import Head from "next/head";

const Success = () => {
  return (
    <>
      <Head>
        <title>Success Page</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-white text-4xl">Success</h1>
      </div>
      <generatePdf/>
    </>
  );
};

const generatePdf = async () => {
  try {
    const response = await fetch('/api/billing/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Your data for PDF generation */ }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.pdf';
    a.click();
    URL.revokeObjectURL(url); // Clean up
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

const PdfGenerator = () => {
  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default Success;