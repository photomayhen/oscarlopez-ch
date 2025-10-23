import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PublicationsSection from "@/components/PublicationsSection";
import AgenticApplicationsSection from "@/components/AgenticApplicationsSection";
import FreebiesSection from "@/components/FreebiesSection";
import FooterSection from "@/components/FooterSection";
import IslandNavbar from "@/components/IslandNavbar";
import useVisitorTracking from "@/hooks/useVisitorTracking";

const Publications = () => {
  useVisitorTracking();

  useEffect(() => {
    document.title = "Publications - Oscar Lopez";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore Oscar Lopez's latest publications on AI, procurement, technology innovation, and digital transformation."
      );
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <IslandNavbar />
      <HeroSection />
      
      <div className="container mx-auto px-6 lg:px-12 pt-12">
        <h1 className="font-body text-4xl md:text-5xl text-foreground text-center mb-16">
          Publications
        </h1>
      </div>

      <PublicationsSection />
      <AgenticApplicationsSection />
      <FreebiesSection />
      <FooterSection />
    </div>
  );
};

export default Publications;
