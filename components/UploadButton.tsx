import React, { useState, useRef } from 'react';
import { Project } from '@/types';

interface UploadButtonProps {
  onUploadSuccess: (project: Project) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadStatus('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUploadStatus('Upload successful! Synced to GitHub.');
        onUploadSuccess(result.project);
        
        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Clear status after 3 seconds
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        setUploadStatus(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleFileSelect}
        disabled={isUploading}
        className={`
          px-6 py-3 rounded-xl font-medium transition-all duration-200
          ${isUploading 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-accent hover:bg-opacity-80 hover:shadow-lg'
          }
          text-white flex items-center gap-2
        `}
      >
        {isUploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4v16m8-8H4" />
            </svg>
            Add Photo
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {uploadStatus && (
        <div className={`
          px-4 py-2 rounded-lg text-sm font-medium
          ${uploadStatus.includes('successful') 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : uploadStatus.includes('failed') || uploadStatus.includes('error')
              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }
        `}>
          {uploadStatus}
        </div>
      )}

      <p className="text-gray-400 text-sm text-center max-w-xs">
        Upload images (max 10MB) to add them permanently to your portfolio and sync to GitHub
      </p>
    </div>
  );
};

export default UploadButton;