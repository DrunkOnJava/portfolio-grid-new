import React from 'react';
import AdminProjectCard from './AdminProjectCard';
import { Project } from '@/types';

interface AdminProjectCardWrapperProps {
  project: Project;
  onUpdate: (project: Project) => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDraggedOver: boolean;
}

const AdminProjectCardWrapper: React.FC<AdminProjectCardWrapperProps> = ({
  project,
  onUpdate,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  isDraggedOver,
}) => {
  // Get size classes for grid layout
  const getSizeClasses = (size?: string) => {
    switch (size) {
      case 'tallrec':
        return 'row-span-2';
      case 'widerec':
        return 'col-span-2 row-span-1';
      case 'largesq':
        return 'col-span-2 row-span-2';
      case 'tinywide':
        return 'col-span-2 row-span-1 min-h-[100px]';
      case 'tinytall':
        return 'col-span-1 row-span-3 max-w-[150px]';
      case 'square':
      default:
        return 'row-span-1';
    }
  };

  const sizeClasses = getSizeClasses(project.size);

  return (
    <div
      className={`relative ${sizeClasses} ${isDraggedOver ? 'opacity-50' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <AdminProjectCard
        project={project}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default AdminProjectCardWrapper;