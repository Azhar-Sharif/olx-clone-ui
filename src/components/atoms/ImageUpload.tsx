import React from 'react';
import { AlertCircle, Upload, X } from 'lucide-react';

interface IImageUploadProps {
  previewImg: string | null;
  error?: string;
  onImageChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const ImageUpload: React.FC<IImageUploadProps> = ({
  previewImg,
  error,
  onImageChange,
  onRemoveImage,
}) => (
  <div>
    {previewImg ? (
      <div className="relative">
        <img
          src={previewImg}
          alt="Preview"
          className="w-full max-h-96 object-cover rounded-xl border-2 border-gray-200"
        />
        <button
          type="button"
          onClick={onRemoveImage}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
        >
          <X size={20} />
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
        <Upload size={48} className="text-gray-400 mb-3" />
        <span className="text-lg font-semibold text-gray-700 mb-1">
          Click to upload product image
        </span>
        <span className="text-sm text-gray-500 mb-4">
          Supported formats: PNG, JPG, WebP (Max 5MB)
        </span>
        <input
          type="file"
          name="product_img"
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
      </label>
    )}
    {error && (
      <p className="text-red-600 text-sm mt-3 flex items-center gap-1">
        <AlertCircle size={16} />
        {error}
      </p>
    )}
  </div>
);
