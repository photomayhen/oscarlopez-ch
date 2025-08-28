import { useEffect, useState } from "react";
import LinkedInCarousel from "./LinkedInCarousel";

const PublicationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Publications data - to be populated with user content
  const publications = [
    // Example structure - will be replaced with user data
    // {
    //   id: 1,
    //   image: "/path-to-image.jpg",
    //   title: "Publication Title",
    //   link: "https://linkedin.com/article-link"
    // }
  ];

  return (
    <section className="pt-4 pb-16 md:pb-24 bg-background px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div 
            className={`transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-6">
              Link to my last publications
            </h2>
          </div>
        </div>
        
        {/* LinkedIn Carousel */}
        <div 
          className={`transition-all duration-700 transform delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <LinkedInCarousel publications={publications} />
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;