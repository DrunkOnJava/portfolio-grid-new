import Head from 'next/head';
import { useState } from 'react';
import Header from '@/components/Header';
import Filters, { FilterType } from '@/components/Filters';
import ProjectGrid from '@/components/ProjectGrid';
import { projects } from '@/data/projects';

export default function Home() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
        
        <Filters 
          activeFilter={filter} 
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <ProjectGrid 
          projects={projects}
          filter={filter} 
          searchQuery={searchQuery} 
        />
      </main>
    </div>
  );
}