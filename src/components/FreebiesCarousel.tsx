import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface Freebie {
  id: number;
  date: string;
  image: string;
  title: string;
  downloadFile: string;
}

interface FreebiesCarouselProps {
  freebies: Freebie[];
}

const FreebiesCarousel = ({ freebies }: FreebiesCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const scrollToThumbnail = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.children;
      if (thumbnails[index]) {
        const thumbnail = thumbnails[index] as HTMLElement;
        const container = thumbnailsRef.current;
        const scrollLeft = thumbnail.offsetLeft - container.offsetWidth / 2 + thumbnail.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : freebies.length - 1;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < freebies.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    scrollToThumbnail(index);
  };

  const handleDownload = () => {
    const selectedFreebie = freebies[selectedIndex];
    const link = document.createElement('a');
    link.href = selectedFreebie.downloadFile;
    link.download = selectedFreebie.downloadFile.split('/').pop() || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    scrollToThumbnail(selectedIndex);
  }, [selectedIndex]);

  if (!freebies || freebies.length === 0) {
    return null;
  }

  const selectedFreebie = freebies[selectedIndex];

  return (
    <div className="w-full">
      {/* Main Display */}
      <div className="relative mb-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-2xl group cursor-pointer">
          <img
            src={selectedFreebie.image}
            alt={selectedFreebie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={handleDownload}
          />
          
          {/* Hover Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            onClick={handleDownload}
          >
            <div className="text-center">
              <Download className="w-16 h-16 text-white mx-auto mb-2" />
              <span className="text-white font-body text-lg">Download PDF</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {freebies.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous freebie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              aria-label="Next freebie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Title Below Image */}
        <div className="mt-4">
          <h3 className="font-body text-xl md:text-2xl text-foreground leading-tight">
            {selectedFreebie.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Published on {new Date(selectedFreebie.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Thumbnails Row */}
      {freebies.length > 1 && (
        <div 
          ref={thumbnailsRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {freebies.map((freebie, index) => (
            <button
              key={freebie.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 transition-all duration-300 ${
                index === selectedIndex 
                  ? 'scale-110 opacity-100' 
                  : 'scale-100 opacity-50 grayscale hover:opacity-75 hover:grayscale-0'
              }`}
            >
              <img
                src={freebie.image}
                alt={freebie.title}
                className="w-24 h-16 object-cover rounded-md shadow-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreebiesCarousel;
