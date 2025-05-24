import { projects } from '@/data/projects';

export default function Debug() {
  return (
    <div className="min-h-screen bg-primary p-8 text-white">
      <h1 className="text-2xl mb-4">Debug Page</h1>
      <p className="mb-4">Total projects: {projects.length}</p>
      <div className="space-y-4">
        {projects.slice(0, 5).map((project) => (
          <div key={project.id} className="bg-secondary p-4 rounded">
            <p>ID: {project.id}</p>
            <p>Title: {project.title}</p>
            <p>Image: {project.image}</p>
            <p>Size: {project.size}</p>
            <p>Order: {project.order}</p>
            {/* Test image loading */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-32 h-32 object-cover mt-2"
              onError={(e) => console.error('Image failed to load:', project.image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}