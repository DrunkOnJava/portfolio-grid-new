interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const Progress = ({ 
  value, 
  max = 100, 
  variant = 'default',
  size = 'md',
  showLabel = false,
  animated = false,
  className 
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={className}>
      <div className={`relative w-full ${sizes[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`
            ${sizes[size]} ${variants[variant]} rounded-full transition-all duration-500
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default Progress;