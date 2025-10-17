import { useEffect, useState } from "react";
import FreebiesCarousel from "./FreebiesCarousel";
import img20251017 from "@/assets/20251017_AIjargon_02.png";

const FreebiesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Freebies data - sorted from newest to oldest
  const freebies = [
    {
      id: 1,
      date: "2025-10-17",
      image: img20251017,
      title: 'Get the PDF of "Navigating Techno Waters: The Supply Chain Guide to AI Jargon"',
      downloadFile: "/downloads/20251017_AIjargon_02.pdf"
    }
  ];

  return (
    <section id="freebies" className="pt-12 pb-12 bg-background px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div 
          className={`transition-all duration-700 transform delay-200 mb-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="font-body text-3xl md:text-4xl text-foreground text-center mb-3">
            Gifts for you
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground text-center">
            to help you to progress your Supply Chain / Procurement profession.
          </p>
        </div>

        {/* Freebies Carousel */}
        <div 
          className={`transition-all duration-700 transform delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <FreebiesCarousel freebies={freebies} />
        </div>
      </div>
    </section>
  );
};

export default FreebiesSection;
