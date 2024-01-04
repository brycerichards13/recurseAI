import React, { useEffect, useState } from 'react';

interface FileParserProps {
  file: File;
  onParsed: (content: string) => void;
}

const FileParser: React.FC<FileParserProps> = ({ file, onParsed }) => {
  const [error, setError] = useState<string>('');

  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const content = e.target?.result as string;
        // Add logic here to parse different file types
        switch (file.type) {
          case 'application/json':
            onParsed(JSON.stringify(JSON.parse(content), null, 2));
            break;
          case 'text/plain':
            onParsed(content);
            break;
          // Add cases for other file types here
          default:
            onParsed(content); // Treat all other file types as plain text
            break;
        }
      } catch (err) {
        setError('Error parsing file');
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    if (file) {
      readFile(file);
    }
  }, [file]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default FileParser;
