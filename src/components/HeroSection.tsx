import { useEffect, useState } from "react";
import IslandNavbar from "./IslandNavbar";
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section id="top" className="min-h-screen bg-black flex items-center justify-center px-6 lg:px-12 relative overflow-hidden">
      <IslandNavbar />
      {/* Background Video Layer */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover mix-blend-lighten"
        style={{ mixBlendMode: 'lighten' }}
      >
        <source src="/videos/arc.mp4" type="video/mp4" />
      </video>
      
      <div className="max-w-4xl w-full flex flex-col items-center text-center relative z-10">
        {/* Image Section */}
        <div className={`relative transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden relative">
            
            {/* Gradient Overlay */}
            
          </div>
        </div>

        {/* Content Section - Overlapping */}
        <div className={`text-center transition-all duration-700 delay-300 transform -mt-20 relative z-10 pt-[600px] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Heading */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight">
            Oscar Lopez
          </h1>
          
          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
            Procurement, Vendor Management, Contract Negotiation & Contract Management
          </p>
          
          {/* Publications Link */}
          <a 
            href="/publications#freebies"
            className="font-body text-sm md:text-base text-white/70 hover:text-white uppercase tracking-wider transition-colors duration-200"
          >
            Thanks for visiting my page! I always have a small gift for you. Visit the "freebies" area
          </a>
        </div>
      </div>
    </section>;
};
export default HeroSection;