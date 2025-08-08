import { useEffect, useState } from "react";

const CompaniesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('companies-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const companies = [
    "Huawei",
    "QIAGEN", 
    "Vodafone",
    "SONY"
  ];

  return (
    <section 
      id="companies-section"
      className="py-16 md:py-24 bg-background px-6 lg:px-12"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <div 
          className={`transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-12">
            Trusted by leading companies worldwide
          </h2>
        </div>

        {/* Companies Grid */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-all duration-700 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {companies.map((company, index) => (
            <div 
              key={company}
              className={`transition-all duration-500 delay-${(index + 1) * 100} transform hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="text-2xl md:text-3xl font-body text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 cursor-default">
                {company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;