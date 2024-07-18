"use client"
import { Image } from 'lucide-react';
import React, { useState, useRef } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
      <div className="w-64 h-52 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center" onClick={handleDivClick} onDrop={handleDrop} onDragOver={handleDragOver}>
        {image ? (
          <img src={image} alt="Uploaded" className="max-h-full max-w-full" />
        ) : (
          <div className='flex flex-col gap-7 items-center'>
            <Image />
            <div>
              <h1 className="text-sm font-medium">Drop your image here or select </h1>
              <span className="text-muted-foreground text-sm flex justify-center font-medium">click to browse</span>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
  );
};

export default ImageUploader;
