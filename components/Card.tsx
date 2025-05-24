interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  className, 
  children, 
  hoverable = false,
  onClick,
  padding = 'md'
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${paddingClasses[padding]}
        ${hoverable ? 'transition-all duration-200 hover:shadow-md hover:border-gray-300 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className || ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;