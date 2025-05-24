import React, { useState, useRef } from 'react';
import { Project } from '@/types';
import AdminProjectCardWrapper from './AdminProjectCardWrapper';

interface AdminProjectGridProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
}

const AdminProjectGrid: React.FC<AdminProjectGridProps> = ({ projects, onUpdate }) => {
  const [draggedProject, setDraggedProject] = useState<Project | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, project: Project) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragOverIndex(null);

    if (!draggedProject) return;

    const draggedIndex = projects.findIndex(p => p.id === draggedProject.id);
    if (draggedIndex === dropIndex) return;

    const newProjects = [...projects];
    const [removed] = newProjects.splice(draggedIndex, 1);
    newProjects.splice(dropIndex, 0, removed);

    // Update order values
    const updatedProjects = newProjects.map((project, index) => ({
      ...project,
      order: index + 1,
    }));

    onUpdate(updatedProjects);
    setDraggedProject(null);
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    const updatedProjects = projects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    );
    onUpdate(updatedProjects);
  };

  const handleDeleteProject = (projectId: number) => {
    console.log('Delete button clicked for project:', projectId);
    const updatedProjects = projects.filter(p => p.id !== projectId);
    console.log('Projects after filter:', updatedProjects.length, 'projects remaining');
    // Reorder remaining projects
    const reorderedProjects = updatedProjects.map((project, index) => ({
      ...project,
      order: index + 1,
    }));
    console.log('Calling onUpdate with reordered projects');
    onUpdate(reorderedProjects);
  };

  // Sort projects by order
  const sortedProjects = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
      {sortedProjects.map((project, index) => (
        <AdminProjectCardWrapper
          key={project.id}
          project={project}
          onUpdate={handleProjectUpdate}
          onDelete={() => handleDeleteProject(project.id)}
          onDragStart={(e) => handleDragStart(e, project)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          isDraggedOver={dragOverIndex === index}
        />
      ))}
    </div>
  );
};

export default AdminProjectGrid;