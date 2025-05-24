import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Filters, { FilterType } from '@/components/Filters';
import ProjectGrid from '@/components/ProjectGrid';
import UploadModal from '@/components/UploadModal';
import Button from '@/components/Button';
import { projects as initialProjects } from '@/data/projects';
import { Project } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  // Reload projects when returning from admin
  useEffect(() => {
    // Simple solution: reload the page if changes were made
    if (typeof window !== 'undefined') {
      const shouldReload = localStorage.getItem('reloadProjects');
      if (shouldReload === 'true') {
        localStorage.removeItem('reloadProjects');
        // Force a full page reload to get fresh data
        window.location.reload();
      }
    }
  }, []);

  const handleUploadSuccess = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>Project Gallery - Portfolio</title>
        <meta name="description" content="Live previews of all deployed applications and custom app icons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <Header />
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <Filters 
            activeFilter={filter} 
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 4v16m8-8H4" />
              </svg>
              Add Photo
            </Button>
            <Button
              as="link"
              href="/components-demo"
              variant="secondary"
              className="whitespace-nowrap"
            >
              View Components
            </Button>
            {isAdmin && (
              <Button
                as="link"
                href="/admin"
                variant="primary"
                className="bg-accent whitespace-nowrap"
              >
                Admin Panel
              </Button>
            )}
          </div>
        </div>
        
        <ProjectGrid 
          projects={projects}
          filter={filter} 
          searchQuery={searchQuery} 
        />
      </main>
      
      {/* Admin login link - subtle footer */}
      {!isAdmin && (
        <footer className="mt-20 pb-8 text-center">
          <a 
            href="/admin/login" 
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            •
          </a>
        </footer>
      )}
      
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}