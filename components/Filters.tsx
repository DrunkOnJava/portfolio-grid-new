import React from 'react';

export type FilterType = 'all' | 'success' | 'failed' | 'select-multiple' | 'show-hidden';

interface FiltersProps {
  activeFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  activeFilter, 
  setFilter, 
  searchQuery, 
  setSearchQuery 
}) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'success', label: 'Success' },
    { id: 'failed', label: 'Failed' },
    { id: 'select-multiple', label: 'Select Multiple' },
    { id: 'show-hidden', label: 'Show Hidden' }
  ];

  return (
    <div className="flex-1 space-y-4">
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-secondary rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-xl transition-colors text-sm ${
              activeFilter === filter.id 
                ? 'bg-accent text-white' 
                : 'bg-secondary text-white hover:bg-opacity-80'
            }`}
            onClick={() => setFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;