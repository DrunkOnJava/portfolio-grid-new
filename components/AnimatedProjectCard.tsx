import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

interface AnimatedProjectCardProps {
  project: Project;
  delay?: number;
}

const AnimatedProjectCard: React.FC<AnimatedProjectCardProps> = ({ project, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, isVisible]);

  // Get size classes for the wrapper
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
      ref={elementRef}
      className={`${sizeClasses} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-600`}
    >
      <ProjectCard project={project} />
    </div>
  );
};

export default AnimatedProjectCard;