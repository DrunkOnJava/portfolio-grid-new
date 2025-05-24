import React, { useState, useEffect } from 'react';
import AnimatedProjectCard from './AnimatedProjectCard';
import { Project } from '@/types';
import { FilterType } from './Filters';
import { sortProjectsByOrder } from '@/utils/fileNameParser';
import Animation from './Animation';
import Skeleton from './Skeleton';
import Loading from './Loading';

interface ProjectGridProps {
  projects: Project[];
  filter: FilterType;
  searchQuery: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, filter, searchQuery }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    
    // Sort by order from filename
    const sortedResult = sortProjectsByOrder(result);
    setFilteredProjects(sortedResult);
    
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [projects, filter, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="card relative">
            <Skeleton variant="rectangular" height={200} className="rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <Animation animateIn="fadeInUp">
        <div className="bg-secondary rounded-xl p-10 text-center">
          <h3 className="text-xl font-bold mb-2">No projects found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      </Animation>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
      {filteredProjects.map((project, index) => (
        <AnimatedProjectCard 
          key={project.id} 
          project={project} 
          delay={index * 50}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;