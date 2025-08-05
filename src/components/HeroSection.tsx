import { useEffect, useState } from "react";
import IslandNavbar from "./IslandNavbar";
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="min-h-screen bg-background flex items-center justify-center px-6 lg:px-12 relative overflow-hidden">
      <IslandNavbar />
      {/* Background Video Layer */}
      <video autoPlay muted loop playsInline controls={false} className="absolute inset-0 w-full h-full object-cover mix-blend-color-dodge rounded-sm">
        <source src="https://res.cloudinary.com/dqd4dvem7/video/upload/v1753690853/arc_n2w6lv.mp4" type="video/mp4" />
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
            Ethan Cole
          </h1>
          
          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
            Front-end developer turning ideas into interactive, user-focused digital experiences.
          </p>
        </div>
      </div>
    </section>;
};
export default HeroSection;