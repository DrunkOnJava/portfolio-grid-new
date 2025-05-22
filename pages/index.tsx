import Head from 'next/head';
import { useState } from 'react';
import Header from '@/components/Header';
import Filters, { FilterType } from '@/components/Filters';
import ProjectGrid from '@/components/ProjectGrid';
import UploadModal from '@/components/UploadModal';
import { projects as initialProjects } from '@/data/projects';
import { Project } from '@/types';

export default function Home() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
          
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4v16m8-8H4" />
            </svg>
            Add Photo
          </button>
        </div>
        
        <ProjectGrid 
          projects={projects}
          filter={filter} 
          searchQuery={searchQuery} 
        />
      </main>
      
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}