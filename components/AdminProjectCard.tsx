import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project, ProjectSize, ProjectStatus } from '@/types';
import Dropdown from './Dropdown';
import Badge from './Badge';

interface AdminProjectCardProps {
  project: Project;
  onUpdate: (project: Project) => void;
  onDelete: () => void;
}

const AdminProjectCard: React.FC<AdminProjectCardProps> = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [tagInput, setTagInput] = useState('');
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const imageSrc = editedProject.image || '/images/placeholder.svg';
  
  const sizes: ProjectSize[] = ['square', 'tallrec', 'widerec', 'largesq', 'tinywide', 'tinytall'];
  const statuses: ProjectStatus[] = ['success', 'failed', 'hidden'];

  const sizeOptions = sizes.map(size => ({ value: size, label: size }));
  const statusOptions = statuses.map(status => ({ value: status, label: status }));

  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  const handleUpdate = (field: keyof Project, value: any) => {
    const updated = { ...editedProject, [field]: value };
    setEditedProject(updated);
    onUpdate(updated);
  };

  const handleTitleChange = () => {
    if (titleRef.current) {
      handleUpdate('title', titleRef.current.textContent || '');
    }
  };

  const handleDescChange = () => {
    if (descRef.current) {
      handleUpdate('description', descRef.current.textContent || '');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...(editedProject.tags || []), tagInput.trim()];
      handleUpdate('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = editedProject.tags?.filter((_, i) => i !== index) || [];
    handleUpdate('tags', newTags);
  };

  const handleImageUrlChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdate('image', e.currentTarget.value);
    }
  };
  
  return (
    <div 
      className={`card relative h-full cursor-move ${isEditing ? 'ring-2 ring-accent' : ''}`}
      onMouseEnter={() => setIsEditing(true)}
      onMouseLeave={() => setIsEditing(false)}
    >
      {/* Admin Controls Overlay */}
      <div className={`absolute top-0 left-0 right-0 z-20 p-2 bg-black/70 transition-opacity ${isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Order number */}
            <input
              type="number"
              value={editedProject.order || 0}
              onChange={(e) => handleUpdate('order', parseInt(e.target.value) || 0)}
              className="w-12 px-1 py-0.5 bg-black/50 border border-gray-600 rounded text-xs text-white text-center"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Size selector */}
            <div className="w-24">
              <Dropdown
                options={sizeOptions}
                value={editedProject.size}
                onChange={(value) => handleUpdate('size', value)}
                className="text-xs"
              />
            </div>

            {/* Status selector */}
            <div className="w-24">
              <Dropdown
                options={statusOptions}
                value={editedProject.status}
                onChange={(value) => handleUpdate('status', value)}
                className="text-xs"
              />
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Delete button clicked for project:', project.id);
              if (confirm('Delete this project?')) {
                console.log('Delete confirmed, calling onDelete');
                onDelete();
              }
            }}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {editedProject.image ? (
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={editedProject.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Editable overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transition-all ${isEditing ? 'pb-20' : ''}`}>
            <div
              ref={titleRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleTitleChange}
              className={`text-sm font-bold text-white mb-1 ${isEditing ? 'bg-white/10 px-2 py-1 rounded' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {editedProject.title}
            </div>
            
            {isEditing && (
              <>
                <div
                  ref={descRef}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleDescChange}
                  className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded mb-2"
                  placeholder="Add description..."
                  onClick={(e) => e.stopPropagation()}
                >
                  {editedProject.description || 'Add description...'}
                </div>

                {/* Image URL editor */}
                <input
                  type="text"
                  defaultValue={editedProject.image}
                  onKeyDown={handleImageUrlChange}
                  className="w-full text-xs bg-white/10 border border-gray-600 rounded px-2 py-1 text-white mb-2"
                  placeholder="Image URL (press Enter to update)"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {editedProject.tags?.map((tag, index) => (
                    <Badge key={index} size="sm" variant="default" className="bg-white/20 text-white border-0">
                      {tag}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(index);
                        }}
                        className="ml-1 text-xs hover:text-red-300"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="px-2 py-0.5 text-xs bg-white/10 border border-gray-600 rounded text-white w-20"
                    placeholder="Add tag..."
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div
            ref={titleRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleTitleChange}
            className={`text-lg font-bold mb-2 ${isEditing ? 'bg-white/10 px-2 py-1 rounded' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {editedProject.title}
          </div>
          
          {(editedProject.description || isEditing) && (
            <div
              ref={descRef}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleDescChange}
              className={`text-gray-400 text-sm ${isEditing ? 'bg-white/10 px-2 py-1 rounded' : ''}`}
              placeholder="Add description..."
              onClick={(e) => e.stopPropagation()}
            >
              {editedProject.description || (isEditing ? 'Add description...' : '')}
            </div>
          )}

          {isEditing && (
            <div className="mt-4 w-full">
              <input
                type="text"
                defaultValue={editedProject.image}
                onKeyDown={handleImageUrlChange}
                className="w-full text-xs bg-white/10 border border-gray-600 rounded px-2 py-1 text-white"
                placeholder="Image URL (press Enter to add)"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjectCard;