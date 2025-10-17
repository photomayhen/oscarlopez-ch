import { useEffect, useState } from "react";
import LinkedInCarousel from "./LinkedInCarousel";
import img20250912 from "@/assets/20250912.jpg";
import img20250908 from "@/assets/20250908_funnel.png";
import img20250907 from "@/assets/20250907_AInews.png";
import img20250905 from "@/assets/20250905_AI_Agents.png";
import img20250904 from "@/assets/20250904_adobeimg.png";
import img20250901 from "@/assets/20250901.png";
import img20250831 from "@/assets/20250831_AInews.png";

const PublicationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Publications data - sorted from newest to oldest
  const publications = [
    {
      id: 18,
      date: "2025-09-12",
      image: img20250912,
      title: "🔬 Cryptography Has Been Broken: Are You Ready? 🖥️",
      link: "https://www.linkedin.com/posts/oscarlt_cryptography-has-been-broken-are-you-activity-7371769468554993665-zSjp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 17,
      date: "2025-09-08",
      image: img20250908,
      title: "🚨 Procurement Funnels: Why Bigger is (Still) Better",
      link: "https://www.linkedin.com/posts/oscarlt_procurement-funnels-why-bigger-is-still-activity-7371056042484350976-vlfj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 16,
      date: "2025-09-07",
      image: img20250907,
      title: "🚨 The 3 AI News That Caught My Eye Last Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-last-activity-7370514093818028032-ByYY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 15,
      date: "2025-09-05",
      image: img20250905,
      title: "🚀 AI Agents: The Next Step in Automation",
      link: "https://www.linkedin.com/posts/oscarlt_ai-agents-the-next-step-in-automation-activity-7369685749518008320-jBmc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 14,
      date: "2025-09-04",
      image: img20250904,
      title: "🚀 The New Age of AI is rewriting the rules of value creation",
      link: "https://www.linkedin.com/posts/oscarlt_the-new-age-of-ai-is-rewriting-the-rules-activity-7369243578625073155-EcvO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 13,
      date: "2025-09-01",
      image: img20250901,
      title: "🔹 Procurement: Unlocking Value through Stakeholder Engagement",
      link: "https://www.linkedin.com/posts/oscarlt_procurement-unlocking-value-through-stakeholder-activity-7368150618412064768-u_hV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 12,
      date: "2025-08-31",
      image: img20250831,
      title: "🚨 The AI News which caught my Eye this Week (Week 35 of 2025)",
      link: "https://www.linkedin.com/posts/oscarlt_ai-technology-innovation-activity-7367658086754439168-OGAy?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 11,
      date: "2025-01-23",
      image: "/lovable-uploads/47b20469-8df5-4924-b0af-ab742f4e17a4.png",
      title: "🚨 Top 10 Professional Skills Every Chief Procurement Officer Needs in 2025",
      link: "https://www.linkedin.com/posts/oscarlt_top-10-professional-skills-every-chief-activity-7365620214060822528-nOUF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 10,
      date: "2025-01-20",
      image: "/lovable-uploads/3eb7da62-64a1-48a2-9c54-3bb87f98b856.png",
      title: "📑 The 20 Most Useful Commercial Contracts – The Ultimate Cheatsheet",
      link: "https://www.linkedin.com/posts/oscarlt_the-20-most-useful-commercial-contracts-activity-7364174438038159360-L2wx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 9,
      date: "2025-01-15",
      image: "/lovable-uploads/34f190a4-9c27-4fec-af34-19f53cee934d.png",
      title: "🚨 The 3 AI News That Caught My Eye This Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7362370031915085825-mAfU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 8,
      date: "2025-01-10",
      image: "/lovable-uploads/d6bf8a45-6573-442b-a079-ca64a7c18d18.png",
      title: "👉 Give me that NDA",
      link: "https://www.linkedin.com/posts/oscarlt_give-me-that-nda-activity-7360550620228927488-ucRI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 7,
      date: "2025-01-08",
      image: "/lovable-uploads/78bddb60-927e-49c2-9ffd-199626afdcf2.png",
      title: "🚨 The 3 AI News that caught my eye this Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7359872702091804672-fdkg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 6,
      date: "2025-01-07",
      image: "/lovable-uploads/a3c0f215-b648-4403-b392-179ce4dff479.png",
      title: "🌍 Greater Zurich: Exciting developments in the tech world!",
      link: "https://www.linkedin.com/posts/oscarlt_techinnovation-greaterzurich-sustainability-activity-7359463417843224576-YTUh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 5,
      date: "2025-01-05",
      image: "/lovable-uploads/d93f98ec-4459-49d2-9322-8ce97a41bf4d.png",
      title: "🚨 The Reality Check: My Experience with DIA, The Browser Company's New AI Browser",
      link: "https://www.linkedin.com/posts/oscarlt_the-reality-check-my-experience-with-activity-7358734837408485378-Vu1e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 4,
      date: "2025-01-03",
      image: "/lovable-uploads/465fa231-aa20-438a-86cf-ebabcb3f5479.png",
      title: "🚨 The 3 AI News That Caught My Eye This Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7357289049230852096-LNQi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 3,
      date: "2024-12-30",
      image: "/lovable-uploads/3e0d64d5-a21b-4340-95be-a7eaf4a2a17c.png",
      title: "🎭 AI Copyright Dilemma: A cautionary tale every software professional needs to read",
      link: "https://www.linkedin.com/posts/oscarlt_my-new-article-a-must-read-for-corporate-activity-7355828176322760707-vRZY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 2,
      date: "2024-12-28",
      image: "/lovable-uploads/2be30c95-2c49-4613-a396-e96e16c8a204.png",
      title: "🚨 The 3 AI News That Caught My Eye This Week",
      link: "https://www.linkedin.com/posts/oscarlt_the-3-ai-news-that-caught-my-eye-this-activity-7355522405676556288-Up_s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    },
    {
      id: 1,
      date: "2024-12-20",
      image: "/lovable-uploads/feb59c01-e051-4dcf-8b29-040bc351be52.png",
      title: "🚨 The $1.25 Trillion SaaS Reckoning: Why Procurement Holds All the Cards",
      link: "https://www.linkedin.com/posts/oscarlt_procurement-saas-negotiation-activity-7353661407705407488-_vZK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAmqzsBsgOvuXXBr5EH_hhqHx_lYJ6wmdk"
    }
  ];

  // Split publications: latest 8 for carousel, rest for grid
  const carouselPublications = publications.slice(0, 8);
  const gridPublications = publications.slice(8);

  return (
    <section id="publications" className="pt-4 pb-6 bg-background px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* LinkedIn Carousel - Latest 8 */}
        <div 
          className={`transition-all duration-700 transform delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <LinkedInCarousel publications={carouselPublications} />
        </div>

        {/* Older Publications Grid */}
        {gridPublications.length > 0 && (
          <div 
            className={`mt-12 transition-all duration-700 transform delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h3 className="font-body text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-6 text-center">
              Earlier Publications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gridPublications.map((publication) => (
                <a
                  key={publication.id}
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="flex flex-col gap-3">
                    <img
                      src={publication.image}
                      alt={publication.title}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <h4 className="font-body text-xs md:text-sm text-foreground/80 group-hover:text-foreground transition-colors leading-tight line-clamp-2">
                      {publication.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
