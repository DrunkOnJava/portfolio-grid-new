import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import AdminProjectGrid from '@/components/AdminProjectGrid';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { projects as initialProjects } from '@/data/projects';
import { Project } from '@/types';

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleProjectUpdate = (updatedProjects: Project[]) => {
    console.log('handleProjectUpdate called with', updatedProjects.length, 'projects');
    setProjects(updatedProjects);
    setHasChanges(true);
    console.log('hasChanges set to true');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ projects }),
      });

      if (response.ok) {
        setHasChanges(false);
        // Set flag to reload projects on main page
        localStorage.setItem('reloadProjects', 'true');
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving changes');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              {hasChanges && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              {hasChanges && (
                <Button
                  onClick={handleSave}
                  variant="primary"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
              )}
              <Button
                as="link"
                href="/"
                variant="secondary"
              >
                View Site
              </Button>
              <Button
                onClick={logout}
                variant="outline"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-8">
          <Header />
        </div>

        <div className="mb-6 p-4 bg-secondary rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-2">Admin Controls</h2>
          <p className="text-gray-400 text-sm">
            Click on any project card to edit. Drag cards to reorder them. Changes are saved locally until you click "Save Changes".
          </p>
        </div>

        <AdminProjectGrid
          projects={projects}
          onUpdate={handleProjectUpdate}
        />
      </main>
    </div>
  );
}