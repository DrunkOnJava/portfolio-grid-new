import { ProjectSize } from '@/types';

export interface ParsedFileName {
  order: number;
  size: ProjectSize;
  name: string;
  originalFileName: string;
}

export function parseFileName(fileName: string): ParsedFileName {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  // Default values
  let order = 999; // Default to end if no order found
  let size: ProjectSize = 'square';
  let name = nameWithoutExt;
  
  // Pattern: number-size-name (e.g., "4-square-LLMBuddy")
  const pattern = /^(\d+)-(square|tallrec|widerec|largesq|tinywide|tinytall)-(.+)$/;
  const match = nameWithoutExt.match(pattern);
  
  if (match) {
    order = parseInt(match[1], 10);
    size = match[2] as ProjectSize;
    name = match[3].replace(/[-_]/g, ' '); // Replace dashes/underscores with spaces
  } else {
    // Fallback: try to extract just the order number from start
    const orderMatch = nameWithoutExt.match(/^(\d+)[-_]?(.*)$/);
    if (orderMatch) {
      order = parseInt(orderMatch[1], 10);
      name = orderMatch[2] || nameWithoutExt;
    }
    
    // Try to detect size from filename if not in standard format
    if (nameWithoutExt.includes('tall')) size = 'tallrec';
    else if (nameWithoutExt.includes('wide')) size = 'widerec';
    else if (nameWithoutExt.includes('large')) size = 'largesq';
    else if (nameWithoutExt.includes('tiny')) {
      size = nameWithoutExt.includes('wide') ? 'tinywide' : 'tinytall';
    }
  }
  
  return {
    order,
    size,
    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
    originalFileName: fileName
  };
}

export function sortProjectsByOrder(projects: any[]): any[] {
  return projects.sort((a, b) => {
    const orderA = a.order || 999;
    const orderB = b.order || 999;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    // If orders are equal, sort by title
    return (a.title || '').localeCompare(b.title || '');
  });
}