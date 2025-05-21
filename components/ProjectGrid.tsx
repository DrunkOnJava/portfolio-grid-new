import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';
import { FilterType } from './Filters';

interface ProjectGridProps {
  projects: Project[];
  filter: FilterType;
  searchQuery: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, filter, searchQuery }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    let result = [...projects];
    
    // Apply filter
    if (filter === 'success') {
      result = result.filter(project => project.status === 'success');
    } else if (filter === 'failed') {
      result = result.filter(project => project.status === 'failed');
    }
    // For 'all' and 'select-multiple', show all statuses
    
    // Show hidden items only when specifically requested
    if (filter !== 'show-hidden') {
      result = result.filter(project => !project.hidden);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        (project.title && project.title.toLowerCase().includes(query)) ||
        (project.description && project.description.toLowerCase().includes(query)) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    setFilteredProjects(result);
  }, [projects, filter, searchQuery]);

  if (filteredProjects.length === 0) {
    return (
      <div className="bg-secondary rounded-xl p-10 text-center">
        <h3 className="text-xl font-bold mb-2">No projects found</h3>
        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;