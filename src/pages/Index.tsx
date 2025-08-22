import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import RecognitionsSection from "@/components/RecognitionsSection";
import TimelineSection from "@/components/TimelineSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JournalSection from "@/components/JournalSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HeroMirror from "@/components/HeroMirror";
import SkillsSection from "@/components/SkillsSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";

const Index = () => {
  useEffect(() => {
    const title = "Oscar Lopez | Procurement & Vendor Management";
    const description = "Procurement, Vendor Management, Contract negotiation & Contract Management - Oscar Lopez";

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/');
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CompaniesSection />
      <TimelineSection />
      <WorkExperienceSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <RecognitionsSection />
      <TestimonialsSection />
      <JournalSection />
      <FAQSection />
      <ContactSection />
      <HeroMirror />
      <SkillsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
