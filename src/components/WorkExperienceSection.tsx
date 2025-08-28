import { useState } from "react";

const WorkExperienceSection = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: "1. The Contract Architect",
      content: "Multi-Million Portfolio Strategist\nTransform complex technical requirements into bulletproof agreements. \nSpecialist in turning high-risk negotiations into guaranteed wins. \nDigital transformation pioneer using AI-driven contract intelligence.\n\n🏆 Secured 9-figure contracts through strategic positioning\n\n⚡ Eliminated penalty risks worth millions while strengthening partnerships\n\n🚀 Achieved top regional performance rankings through innovation",
      keywords: "Contract Management, Strategic Negotiations, Procurement Excellence, Risk Management, Tender Management, AI Contract Analysis, 5G Infrastructure, Telecommunications Procurement",
      image: "/lovable-uploads/91b4f748-dcd2-4797-9cd2-4bc1489bd44e.png"
    },
    {
      id: 2,
      title: "2. The Partnership Catalyst",
      content: "Sales-Procurement Bridge Builder\nBridge the gap between what sales promises and procurement delivers.\nTurn adversarial negotiations into collaborative growth engines.\nProven methodology for 20%+ revenue acceleration.\n\n🎯 Trained 100+ professionals in advanced negotiation psychology\n\n📈 Delivered double-digit growth through procurement-sales alignment\n\n🤝 Transformed vendor relationships into strategic partnerships",
      keywords: "Pharmaceutical Procurement, Strategic Sourcing, Vendor Management, Framework Agreements, Molecular Diagnostics, CRO Partnerships, Procurement Strategy, Negotiation Training",
      image: "/lovable-uploads/1bfbdfd5-a346-4cc5-913f-8ba49a0b14a0.png"
    },
    {
      id: 3,
      title: "3. The Cost Optimization Maestro",
      content: "Strategic Sourcing & Risk Mitigation Expert\nMaster of vendor ecosystems and supply chain orchestration.\nProven track record of delivering exceptional savings without quality compromise.\nAward-winning supplier development and performance management.\n\n💰 Generated 8-figure annual savings across multiple categories\n\n🏅 Developed award-winning supplier partnerships (multiple industry recognitions)\n\n🎪 Specialized in turning procurement challenges into competitive advantages",
      keywords: "Strategic Sourcing, Supplier Performance Management, Cost Optimization, Category Management, Direct/Indirect Procurement, IT Procurement, Telecommunications Sourcing, Vendor Consolidation, Supply Chain Excellence",
      image: "/lovable-uploads/9191987a-3735-4c75-9904-ee426dcd9d88.png"
    }
  ];

  return (
    <section id="experiences" className="py-16 md:py-24 bg-background px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className={`relative border border-white p-6 pt-20 transition-all duration-300 cursor-pointer ${
                hoveredBox === experience.id
                  ? 'text-white'
                  : 'text-muted-foreground/50'
              }`}
              onMouseEnter={() => setHoveredBox(experience.id)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              {/* Profile Image - overlapping the border */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  <img 
                    src={experience.image}
                    alt={`Oscar Lopez - ${experience.title}`}
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
              </div>
              
              <h3 className="font-body text-lg font-semibold mb-4 leading-snug mt-3">
                {experience.title}
              </h3>
              
              <p className="font-body text-sm leading-snug mb-4 whitespace-pre-line">
                {experience.content}
              </p>
              
              <div className="mt-4">
                <p className="font-body text-xs font-medium" style={{ fontSize: '10px' }}>
                  {experience.keywords}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Thinking Arsenal Section */}
        <div className="mt-8">
          <div className="border border-white p-6 text-center text-white">
            <h3 className="font-body text-lg font-semibold mb-4">
              Strategic Thinking Arsenal
            </h3>
            <div className="font-body text-sm leading-relaxed space-y-3">
              <div>🧠 Negotiation Psychology: Reading between the lines of what people really want</div>
              <div>🎯 Risk Orchestration: Turning potential threats into strategic opportunities</div>
              <div>⚡ Digital Procurement: Leveraging AI and automation for competitive advantage</div>
              <div>🤝 Stakeholder Alchemy: Converting adversaries into advocates</div>
              <div>🚀 Innovation Procurement: Sourcing tomorrow's solutions today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;