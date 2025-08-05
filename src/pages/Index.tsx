import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import RecognitionsSection from "@/components/RecognitionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JournalSection from "@/components/JournalSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CompaniesSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <RecognitionsSection />
      <TestimonialsSection />
      <JournalSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
