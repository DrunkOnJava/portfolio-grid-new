import React from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import Tabs from './Tabs';

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

  // Convert filters for dropdown
  const dropdownOptions = filters.map(f => ({ value: f.id, label: f.label }));
  
  // Tab content for categorized view
  const categoryTabs = [
    {
      id: 'status',
      label: 'By Status',
      content: (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Projects
          </Button>
          <Button 
            variant={activeFilter === 'success' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('success')}
          >
            ✓ Success
          </Button>
          <Button 
            variant={activeFilter === 'failed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('failed')}
          >
            ✗ Failed
          </Button>
        </div>
      )
    },
    {
      id: 'options',
      label: 'View Options',
      content: (
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant={activeFilter === 'select-multiple' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('select-multiple')}
          >
            Select Multiple
          </Button>
          <Button 
            variant={activeFilter === 'show-hidden' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('show-hidden')}
          >
            Show Hidden
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 space-y-4">
      <div className="flex gap-4 items-start">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        
        {/* Dropdown for mobile/compact view */}
        <div className="md:hidden">
          <Dropdown
            options={dropdownOptions}
            value={activeFilter}
            onChange={(value) => setFilter(value as FilterType)}
            placeholder="Filter projects"
            className="min-w-[180px]"
          />
        </div>
      </div>
      
      {/* Tabs for desktop view */}
      <div className="hidden md:block bg-secondary rounded-xl p-4">
        <Tabs tabs={categoryTabs} defaultTab="status" />
      </div>
      
      {/* Simple buttons for mobile */}
      <div className="md:hidden flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filters;