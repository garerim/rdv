import React, { useState } from 'react';

interface FileWithContent {
  name: string;
  content: string | ArrayBuffer | null;
}

const OpenFolder: React.FC = () => {
  const [files, setFiles] = useState<FileWithContent[]>([]);

  const handleOpenFolder = async () => {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker();
      const file = await fileHandle.getFile();
      const content = await readFileContent(file);
      const resizedContent = await resizeImage(content as string);
      setFiles([{ name: file.name, content: resizedContent }]);
    } catch (err) {
      console.error(err);
    }
  };

  const readFileContent = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const resizeImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > 160) {
            height *= 160 / width;
            width = 160;
          }
        } else {
          if (height > 160) {
            width *= 160 / height;
            height = 160;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      img.src = dataUrl;
    });
  };

  const handleDownloadFile = (content: string, fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <button onClick={handleOpenFolder}>Open File</button>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <h3>{file.name}</h3>
            {file.content ? <img src={String(file.content)} alt={file.name} /> : null}
            {file.content ? String(file.content) : null}
            {file.content ? (
              <button onClick={() => handleDownloadFile(String(file.content), "carre.txt")}>
                Download
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpenFolder;
