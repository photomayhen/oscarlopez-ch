import { useEffect, useState } from "react";
import LinkedInCarousel from "./LinkedInCarousel";

const PublicationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Publications data
  const publications = [
    {
      id: 1,
      image: "/lovable-uploads/feb59c01-e051-4dcf-8b29-040bc351be52.png",
      title: "🚨 The $1.25 Trillion SaaS Reckoning: Why Procurement Holds All the Cards",
      link: "https://www.linkedin.com/posts/oscarlt_procurement-saas-negotiation-activity-7353661407705407488-_vZK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 2,
      image: "/lovable-uploads/2be30c95-2c49-4613-a396-e96e16c8a204.png",
      title: "🚨 The 3 AI News That Caught My Eye This Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7355522405676556288-Up_s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 3,
      image: "/lovable-uploads/3e0d64d5-a21b-4340-95be-a7eaf4a2a17c.png",
      title: "🎭 AI Copyright Dilemma: A cautionary tale every software professional needs to read",
      link: "https://www.linkedin.com/posts/oscarlt_my-new-article-a-must-read-for-corporate-activity-7355828176322760707-vRZY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 4,
      image: "/lovable-uploads/465fa231-aa20-438a-86cf-ebabcb3f5479.png",
      title: "🚨 The 3 AI News That Caught My Eye This Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7357289049230852096-LNQi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    }
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