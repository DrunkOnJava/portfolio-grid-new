import React, { useState, useEffect, useCallback } from 'react';
import Modal from './Modal';
import Button from './Button';

interface ImageGalleryModalProps {
  visible: boolean;
  onClose: () => void;
  images: string[];
  currentIndex?: number;
  title?: string;
  captions?: string[];
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  onClose,
  images,
  currentIndex = 0,
  title,
  captions,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, handlePrevious, handleNext]);

  if (!images.length) return null;

  return (
    <Modal 
      open={visible} 
      onClose={onClose}
      className="max-w-6xl bg-black/95 p-0"
    >
      <div className="relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <h3 className="text-white text-lg font-semibold">
            {title || `Image ${activeIndex + 1} of ${images.length}`}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Image */}
        <div className="relative flex items-center justify-center min-h-[400px] max-h-[80vh]">
          <img
            src={images[activeIndex]}
            alt={`Gallery image ${activeIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        {captions && captions[activeIndex] && (
          <div className="p-4 text-center text-white bg-black/50">
            <p className="text-sm">{captions[activeIndex]}</p>
          </div>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto bg-black/70">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                  index === activeIndex
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;