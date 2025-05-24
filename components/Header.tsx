import React from 'react';
import Tooltip from './Tooltip';

interface StatProps {
  count: number;
  label: string;
  color: string;
  tooltip?: string;
}

const Stat: React.FC<StatProps> = ({ count, label, color, tooltip }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    gray: 'bg-gray-500',
  };

  const content = (
    <div className="flex items-center space-x-2">
      <span className={`w-2.5 h-2.5 rounded-full ${colorMap[color]}`}></span>
      <span className="font-bold">{count}</span>
      <span className="text-gray-400">{label}</span>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} placement="bottom">
        {content}
      </Tooltip>
    );
  }

  return content;
};

const Header: React.FC = () => {
  const stats = [
    { count: 30, label: 'Total', color: 'blue', tooltip: 'Total number of projects in gallery' },
    { count: 30, label: 'Active', color: 'green', tooltip: 'Projects marked as successful' },
    { count: 0, label: 'Hidden', color: 'yellow', tooltip: 'Projects currently hidden from view' },
    { count: 12, label: 'Apps', color: 'gray', tooltip: 'Application and software projects' },
  ];

  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">Project Gallery</h1>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Live previews of all deployed applications and custom app icons
      </p>
      
      <div className="flex flex-wrap justify-center gap-8">
        {stats.map((stat, index) => (
          <Stat key={index} {...stat} />
        ))}
      </div>
    </header>
  );
};

export default Header;