import React, { useState } from 'react';
import UploadButton from './UploadButton';
import { Project } from '@/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (project: Project) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  if (!isOpen) return null;

  const handleUploadSuccess = (project: Project) => {
    onUploadSuccess(project);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-2xl p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Upload Image</h2>
          <p className="text-gray-400 mb-6">
            Add your own images to the portfolio gallery
          </p>

          <UploadButton onUploadSuccess={handleUploadSuccess} />

          <div className="mt-6 p-4 bg-primary rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">What happens when you upload:</h3>
            <ul className="text-xs text-gray-300 space-y-1 text-left">
              <li>• Image is saved to your local photos folder</li>
              <li>• Automatically committed to your Git repository</li>
              <li>• Pushed to GitHub for permanent storage</li>
              <li>• Added to your portfolio grid immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;