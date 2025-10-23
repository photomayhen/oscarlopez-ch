import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Shield } from "lucide-react";

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
          className={`transition-all duration-700 transform delay-100 mb-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="font-body text-3xl md:text-4xl text-foreground text-center mb-3">
            Agentic/Applications
          </h2>
        </div>

        {/* Legal Documents Links */}
        <div 
          className={`transition-all duration-700 transform delay-200 mb-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/support" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-body text-foreground">Support</span>
            </Link>
            <Link 
              to="/privacy-policy" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-body text-foreground">Privacy Policy</span>
            </Link>
          </div>
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
