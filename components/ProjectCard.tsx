import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import PhotoCredit from './PhotoCredit';
import Badge from './Badge';
import Tooltip from './Tooltip';
import ImageGalleryModal from './ImageGalleryModal';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  // Placeholder image for missing images
  const imageSrc = project.image || '/images/placeholder.svg';
  const iconSrc = project.icon || '/images/placeholder.svg';
  
  // Status configuration
  const statusConfig: Record<string, { color: string; tooltip: string }> = {
    success: { color: 'bg-green-500', tooltip: 'Project completed successfully' },
    failed: { color: 'bg-red-500', tooltip: 'Project encountered issues' },
    progress: { color: 'bg-yellow-500', tooltip: 'Project in progress' },
    hidden: { color: 'bg-gray-500', tooltip: 'Project is hidden' }
  };
  
  const status = statusConfig[project.status] || statusConfig.progress;
      
  // Grid size classes for different card sizes
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
    <div className={`card relative group h-full ${sizeClasses}`}>
      {/* Status indicator with tooltip */}
      <div className="absolute top-3 right-3 z-10">
        <Tooltip content={status.tooltip} placement="bottom">
          <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
        </Tooltip>
      </div>
      
      {project.image ? (
        <div 
          className="relative h-full w-full cursor-pointer"
          onClick={() => setGalleryOpen(true)}
        >
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
                  <Badge key={index} size="sm" variant="default" className="bg-white/20 text-white border-0">
                    {tag}
                  </Badge>
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
                <Badge key={index} size="sm" variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Image Gallery Modal */}
      {project.image && (
        <ImageGalleryModal
          visible={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={[project.image]}
          title={project.title}
          captions={project.description ? [project.description] : undefined}
        />
      )}
    </div>
  );
};

export default ProjectCard;