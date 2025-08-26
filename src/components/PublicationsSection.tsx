import { useEffect, useState } from "react";

const PublicationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background px-6 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <div 
          className={`transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-wider my-8">
            Link to my last publications
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;