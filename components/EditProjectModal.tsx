import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Project, ProjectSize, ProjectStatus } from '@/types';

interface EditProjectModalProps {
  project: Project;
  onSave: (project: Project) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  onSave,
  onDelete,
  onClose,
}) => {
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [tags, setTags] = useState<string>(project.tags?.join(', ') || '');

  const sizes: ProjectSize[] = ['square', 'tallrec', 'widerec', 'largesq', 'tinywide', 'tinytall'];
  const statuses: ProjectStatus[] = ['success', 'failed', 'progress', 'hidden'];

  const handleSave = () => {
    const updatedProject = {
      ...editedProject,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    onSave(updatedProject);
  };

  return (
    <Modal open={true} onClose={onClose} title="Edit Project">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={editedProject.title}
            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={editedProject.description || ''}
            onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={editedProject.image || ''}
            onChange={(e) => setEditedProject({ ...editedProject, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/images/filename.png"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
          <select
            value={editedProject.size}
            onChange={(e) => setEditedProject({ ...editedProject, size: e.target.value as ProjectSize })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={editedProject.status}
            onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value as ProjectStatus })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="design, modern, portfolio"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            value={editedProject.order || 0}
            onChange={(e) => setEditedProject({ ...editedProject, order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preview */}
        {editedProject.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
            <img
              src={editedProject.image}
              alt={editedProject.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={onDelete}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Delete Project
          </Button>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProjectModal;