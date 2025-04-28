import React, { useState } from 'react';
import { ImageUploadResponse } from '@/lib/types';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  response: ImageUploadResponse;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, response }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Validate image file
  const isValidImageFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a valid image (JPEG, PNG, GIF, WebP)");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      alert("Image must be less than 10MB");
      return false;
    }

    return true;
  };

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (isValidImageFile(file)) {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload image
        onImageUpload(file);
      }
    }
  };

  // Clear image
  const clearImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input 
          type="file" 
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md"
          disabled={response.loading}
        />
      </div>

      {imagePreview && (
        <div className="mb-4 relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-w-full h-64 object-contain rounded-md mx-auto"
          />
          <button 
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {response.loading && (
        <div className="text-center text-blue-500 mb-4">
          Processing image...
        </div>
      )}

      {response.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {response.error}
        </div>
      )}

      {response.text && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Extracted Text:</h3>
          <p className="whitespace-pre-wrap">{response.text}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;