interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height,
  className,
  animation = 'pulse'
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-300';
  
  const variantClasses = {
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-md'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
    none: ''
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  // Default dimensions for circular variant
  if (variant === 'circular' && !width && !height) {
    style.width = '40px';
    style.height = '40px';
  }

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className || ''}
      `}
      style={style}
    />
  );
};

// Skeleton group for loading states
interface SkeletonGroupProps {
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonGroup = ({ count = 3, className, children }: SkeletonGroupProps) => {
  if (children) return <>{children}</>;
  
  return (
    <div className={`space-y-3 ${className || ''}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default Skeleton;