import React from 'react';

interface PhotoCreditProps {
  photographer?: string;
  photographerUrl?: string;
  pexelsId?: number;
}

const PhotoCredit: React.FC<PhotoCreditProps> = ({ photographer, photographerUrl, pexelsId }) => {
  if (!photographer) return null;

  return (
    <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
      Photo by{' '}
      {photographerUrl ? (
        <a 
          href={photographerUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          {photographer}
        </a>
      ) : (
        photographer
      )}{' '}
      on{' '}
      <a 
        href="https://www.pexels.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline hover:text-white"
      >
        Pexels
      </a>
    </div>
  );
};

export default PhotoCredit;