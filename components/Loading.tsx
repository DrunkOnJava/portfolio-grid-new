type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Loading = ({ size = 'md', className }: LoadingProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const barSizes = {
    sm: 'w-0.5 h-1',
    md: 'w-0.5 h-1.5',
    lg: 'w-1 h-2'
  };

  return (
    <div className={`relative ${sizes[size]} ${className || ''}`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
        <div
          key={rotation}
          className={`absolute inset-0 origin-center`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            animation: `fadeDown 0.9s ${-index * 0.1}s infinite`
          }}
        >
          <div 
            className={`absolute top-0 left-1/2 ${barSizes[size]} -translate-x-1/2 bg-current rounded-sm`}
          />
        </div>
      ))}
    </div>
  );
};

export default Loading;