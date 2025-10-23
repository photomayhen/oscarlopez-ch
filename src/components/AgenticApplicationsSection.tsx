import { useEffect, useState } from "react";

const AgenticApplicationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="agentic-applications" className="pt-12 pb-12 bg-background px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div 
          className={`transition-all duration-700 transform delay-200 mb-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="font-body text-3xl md:text-4xl text-foreground text-center mb-3">
            Agentic/Applications
          </h2>
        </div>

        {/* Content will be added here */}
        <div 
          className={`transition-all duration-700 transform delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Content placeholder */}
        </div>
      </div>
    </section>
  );
};

export default AgenticApplicationsSection;
