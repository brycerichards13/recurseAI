// App.tsx
'use client';
import React, { useState, useCallback } from 'react';
import FileParser from '../../components/ParseFile'; // Adjust the import path as needed

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileContents, setFileContents] = useState<string[]>([]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length) {
      const validFiles = Array.from(droppedFiles).filter(file => 
        ['application/json', 'text/plain'].includes(file.type) // Filter supported file types
      );
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      readFiles(validFiles);
    }
  }, []);
  const readFiles = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setFileContents(prevContents => [...prevContents, text as string]);
      };
      reader.readAsText(file);
    });
  };
  return (
    <div>
      <div 
        id="drop-area" 
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        Drag and drop a file here
      </div>
      <div id="file-list" style={{ marginTop: '20px' }}>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div id="output" style={{ marginTop: '20px' }}>
        {fileContents.map((content, index) => (
          <pre key={index}>{content}</pre>
        ))}
      </div>
    </div>
  );
}
