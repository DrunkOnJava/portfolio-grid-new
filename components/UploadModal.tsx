import React from 'react';
import UploadButton from './UploadButton';
import { Project } from '@/types';
import Modal from './Modal';
import Card from './Card';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (project: Project) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const handleUploadSuccess = (project: Project) => {
    onUploadSuccess(project);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Upload Image"
      className="bg-secondary text-white"
    >
      <div className="text-center">
        <p className="text-gray-400 mb-6">
          Add your own images to the portfolio gallery
        </p>

        <UploadButton onUploadSuccess={handleUploadSuccess} />

        <Card className="mt-6 bg-primary border-gray-700" padding="sm">
          <h3 className="font-semibold mb-2 text-sm">What happens when you upload:</h3>
          <ul className="text-xs text-gray-300 space-y-1 text-left">
            <li>• Image is saved to your local photos folder</li>
            <li>• Automatically committed to your Git repository</li>
            <li>• Pushed to GitHub for permanent storage</li>
            <li>• Added to your portfolio grid immediately</li>
          </ul>
        </Card>
      </div>
    </Modal>
  );
};

export default UploadModal;