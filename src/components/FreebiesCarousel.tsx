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
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Display */}
      <div className="relative mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative cursor-pointer group" onClick={handleDownload}>
            <img
              src={selectedFreebie.image}
              alt={selectedFreebie.title}
              className="h-56 w-auto object-cover rounded-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Download className="w-12 h-12 text-white mx-auto mb-2" />
                <span className="text-white font-body text-sm bg-black/50 px-3 py-1 rounded">Download PDF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {freebies.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous freebie"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Next freebie"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Title Below Image */}
        <div className="text-center">
          <h3 className="font-heading text-lg md:text-xl text-foreground leading-tight max-w-2xl mx-auto">
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
      <div className="relative">
        <div 
          ref={thumbnailsRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {freebies.map((freebie, index) => (
            <div
              key={freebie.id}
              className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                index === selectedIndex 
                  ? 'scale-110 opacity-100' 
                  : 'scale-100 opacity-50 hover:opacity-75'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={freebie.image}
                alt={freebie.title}
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

export default FreebiesCarousel;
