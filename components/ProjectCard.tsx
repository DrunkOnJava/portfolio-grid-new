import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import PhotoCredit from './PhotoCredit';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Placeholder image for missing images
  const imageSrc = project.image || '/images/placeholder.svg';
  const iconSrc = project.icon || '/images/placeholder.svg';
  
  // Status indicator colors
  const statusColor = project.status === 'success' 
    ? 'bg-green-500' 
    : project.status === 'failed' 
      ? 'bg-red-500' 
      : 'bg-yellow-500';
      
  // Grid size classes for different card sizes
  const getSizeClasses = (size?: string) => {
    switch (size) {
      case 'wide':
        return 'col-span-1 sm:col-span-2 row-span-1';
      case 'tall':
        return 'row-span-2';
      case 'large':
        return 'col-span-1 sm:col-span-2 row-span-3';
      default:
        return 'row-span-1';
    }
  };
  
  const sizeClasses = getSizeClasses(project.size);
  
  return (
    <div className={`card relative group h-full ${sizeClasses}`}>
      {/* Status indicator */}
      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full z-10 ${statusColor}`}></div>
      
      {project.image ? (
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Photo credit - always visible */}
          <PhotoCredit 
            photographer={project.photographer}
            photographerUrl={project.photographerUrl}
            pexelsId={project.pexelsId}
          />
          
          {/* Overlay with title and description on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold">{project.title}</h3>
            {project.description && (
              <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
            )}
            {project.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-white/20 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          {project.icon && (
            <div className="mb-4">
              <Image 
                src={iconSrc}
                alt={project.title}
                width={64}
                height={64}
                className="mx-auto"
              />
            </div>
          )}
          
          <h3 className="text-lg font-bold mb-2">{project.title}</h3>
          
          {project.description && (
            <p className="text-gray-400 text-sm mb-3">{project.description}</p>
          )}
          
          {project.tags && (
            <div className="flex flex-wrap gap-1 justify-center">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;