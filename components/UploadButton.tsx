import React, { useState, useRef } from 'react';
import { Project } from '@/types';
import Button from './Button';
import Badge from './Badge';
import Progress from './Progress';

interface UploadButtonProps {
  onUploadSuccess: (project: Project) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
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
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);

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
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleFileSelect}
        disabled={isUploading}
        variant="primary"
        className="bg-accent hover:bg-opacity-80"
      >
        {isUploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4v16m8-8H4" />
            </svg>
            Add Photo
          </>
        )}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {isUploading && (
        <div className="w-full max-w-xs">
          <Progress 
            value={uploadProgress} 
            size="sm" 
            showLabel 
            variant="default"
          />
        </div>
      )}

      {uploadStatus && (
        <Badge 
          variant={
            uploadStatus.includes('successful') ? 'success' : 
            uploadStatus.includes('failed') || uploadStatus.includes('error') ? 'error' : 
            'info'
          }
          className="px-4 py-2 text-sm"
        >
          {uploadStatus}
        </Badge>
      )}

      <p className="text-gray-400 text-sm text-center max-w-xs">
        Upload images (max 10MB) to add them permanently to your portfolio and sync to GitHub
      </p>
    </div>
  );
};

export default UploadButton;