const fs = require('fs');
const path = require('path');

// Get API key from environment variable or keychain
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || 'YOUR_PEXELS_API_KEY_HERE';

// Different categories for varied content
const categories = [
  'technology',
  'business',
  'nature',
  'architecture',
  'food',
  'travel',
  'art',
  'fashion',
  'sports',
  'music',
  'design',
  'workspace',
  'abstract',
  'city',
  'people'
];

const sizes = ['standard', 'wide', 'tall', 'large'];
const statuses = ['success', 'success', 'success', 'failed']; // Mostly success

async function fetchPexelsImages() {
  const projects = [];
  
  for (let i = 0; i < 45; i++) {
    const category = categories[i % categories.length];
    const page = Math.floor(i / 15) + 1; // Different pages for variety
    
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${category}&per_page=3&page=${page}`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.photos && data.photos.length > 0) {
        const photo = data.photos[i % data.photos.length];
        
        const project = {
          id: i + 1,
          title: photo.alt || `${category.charAt(0).toUpperCase() + category.slice(1)} Project ${i + 1}`,
          description: `A beautiful ${category} project showcasing modern design and functionality.`,
          image: photo.src.medium,
          status: statuses[i % statuses.length],
          size: sizes[i % sizes.length],
          tags: [category, 'design', 'modern'],
          pexelsId: photo.id,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url
        };
        
        projects.push(project);
        console.log(`Fetched project ${i + 1}: ${project.title}`);
      }
      
      // Add small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Error fetching image ${i + 1}:`, error);
      
      // Fallback project if API fails
      const project = {
        id: i + 1,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Project ${i + 1}`,
        description: `A ${category} project with placeholder content.`,
        image: '/images/placeholder.svg',
        status: 'success',
        size: sizes[i % sizes.length],
        tags: [category, 'placeholder'],
        content: true
      };
      
      projects.push(project);
    }
  }
  
  return projects;
}

async function updateProjectsFile() {
  console.log('Fetching 45 images from Pexels...');
  
  const projects = await fetchPexelsImages();
  
  const fileContent = `import { Project } from '@/types';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
  
  const filePath = path.join(__dirname, '../data/projects.ts');
  fs.writeFileSync(filePath, fileContent);
  
  console.log(`Successfully updated projects.ts with ${projects.length} projects!`);
  console.log('Projects include images from categories:', [...new Set(projects.map(p => p.tags[0]))].join(', '));
}

updateProjectsFile().catch(console.error);