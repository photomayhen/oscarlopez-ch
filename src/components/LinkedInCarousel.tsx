import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Publication {
  id: number;
  image: string;
  title: string;
  link: string;
}

interface LinkedInCarouselProps {
  publications: Publication[];
}

const LinkedInCarousel: React.FC<LinkedInCarouselProps> = ({ publications }) => {
  // Start with the most recent article (last in array)
  const [selectedIndex, setSelectedIndex] = useState(publications.length > 0 ? publications.length - 1 : 0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const scrollToThumbnail = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnailElements = thumbnailsRef.current.children;
      const targetThumbnail = thumbnailElements[index] as HTMLElement;
      if (targetThumbnail) {
        const containerWidth = thumbnailsRef.current.offsetWidth;
        const thumbnailLeft = targetThumbnail.offsetLeft;
        const thumbnailWidth = targetThumbnail.offsetWidth;
        const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
        thumbnailsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handlePrevious = () => {
    // Navigate to older articles (left = lower index)
    const newIndex = selectedIndex === 0 ? publications.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleNext = () => {
    // Navigate to newer articles (right = higher index)
    const newIndex = selectedIndex === publications.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    scrollToThumbnail(index);
  };

  const handleMainImageClick = () => {
    window.open(publications[selectedIndex].link, '_blank');
  };

  useEffect(() => {
    scrollToThumbnail(selectedIndex);
  }, [selectedIndex]);

  if (!publications.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Display Area */}
      <div className="relative mb-8">
        {/* Large Image */}
        <div className="flex justify-center mb-4">
          <div 
            className="relative cursor-pointer group"
            onClick={handleMainImageClick}
          >
            <img
              src={publications[selectedIndex].image}
              alt={publications[selectedIndex].title}
              className="h-56 w-auto object-cover rounded-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-body bg-black/50 px-3 py-1 rounded">
                Open Article
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous publication</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next publication</span>
        </Button>

        {/* Title below image */}
        <div className="text-center">
          <h3 className="font-heading text-lg md:text-xl text-white leading-tight max-w-2xl mx-auto">
            {publications[selectedIndex].title}
          </h3>
        </div>
      </div>

      {/* Thumbnail Row - OSX Gallery Style */}
      <div className="relative">
        <div 
          ref={thumbnailsRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {publications.map((publication, index) => (
            <div
              key={publication.id}
              className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                index === selectedIndex 
                  ? 'scale-110 opacity-100' 
                  : 'scale-100 opacity-50 hover:opacity-75'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={publication.image}
                alt={publication.title}
                className={`h-20 w-auto object-cover rounded-md transition-all duration-300 ${
                  index !== selectedIndex ? 'grayscale' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedInCarousel;