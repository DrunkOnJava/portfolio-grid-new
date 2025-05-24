import React from 'react';
import Tooltip from './Tooltip';

interface PhotoCreditProps {
  photographer?: string;
  photographerUrl?: string;
  pexelsId?: number;
}

const PhotoCredit: React.FC<PhotoCreditProps> = ({ photographer, photographerUrl, pexelsId }) => {
  if (!photographer) return null;

  const pexelsUrl = pexelsId 
    ? `https://www.pexels.com/photo/${pexelsId}/`
    : 'https://www.pexels.com';

  return (
    <Tooltip 
      content={`View this photo on Pexels`} 
      placement="top"
    >
      <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded hover:text-white/90 transition-colors cursor-pointer">
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
          href={pexelsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Pexels
        </a>
      </div>
    </Tooltip>
  );
};

export default PhotoCredit;