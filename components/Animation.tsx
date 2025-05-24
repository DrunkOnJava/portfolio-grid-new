import { useEffect, useRef, useState } from 'react';

type AnimationProps = {
  className?: string;
  animateIn?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

const Animation = ({
  className,
  animateIn = 'fadeIn',
  delay = 0,
  duration = 1000,
  children,
}: AnimationProps) => {
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

  const animations = {
    fadeIn: 'opacity-0 animate-fadeIn',
    fadeInUp: 'opacity-0 translate-y-8 animate-fadeInUp',
    fadeInDown: 'opacity-0 -translate-y-8 animate-fadeInDown',
    fadeInLeft: 'opacity-0 translate-x-8 animate-fadeInLeft',
    fadeInRight: 'opacity-0 -translate-x-8 animate-fadeInRight',
    zoomIn: 'opacity-0 scale-95 animate-zoomIn',
    slideInUp: 'opacity-0 translate-y-full animate-slideInUp',
  };

  return (
    <div
      ref={elementRef}
      className={`${className || ''} ${
        isVisible ? 'opacity-100' : animations[animateIn]
      } transition-all`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default Animation;