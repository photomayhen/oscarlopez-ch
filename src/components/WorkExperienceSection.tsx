import { useState } from "react";

const WorkExperienceSection = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: "1. The Contract Architect",
      content: "Multi-Million Portfolio Strategist\nTransform complex technical requirements into bulletproof agreements. \nSpecialist in turning high-risk negotiations into guaranteed wins. \nDigital transformation pioneer using AI-driven contract intelligence.\n\n🏆 Secured 9-figure contracts through strategic positioning\n\n⚡ Eliminated penalty risks worth millions while strengthening partnerships\n\n🚀 Achieved top regional performance rankings through innovation",
      keywords: "Contract Management, Strategic Negotiations, Procurement Excellence, Risk Management, Tender Management, AI Contract Analysis, 5G Infrastructure, Telecommunications Procurement"
    },
    {
      id: 2,
      title: "2. The Partnership Catalyst",
      content: "Sales-Procurement Bridge Builder\nBridge the gap between what sales promises and procurement delivers.\nTurn adversarial negotiations into collaborative growth engines.\nProven methodology for 20%+ revenue acceleration.\n\n🎯 Trained 100+ professionals in advanced negotiation psychology\n\n📈 Delivered double-digit growth through procurement-sales alignment\n\n🤝 Transformed vendor relationships into strategic partnerships",
      keywords: "Pharmaceutical Procurement, Strategic Sourcing, Vendor Management, Framework Agreements, Molecular Diagnostics, CRO Partnerships, Procurement Strategy, Negotiation Training"
    },
    {
      id: 3,
      title: "3. Principal Commercial Manager - Global Procurement & Supply Chain",
      content: "Multi-Category Procurement & Cost Optimization Expert | Managed multi-million EUR procurement portfolio across direct/indirect spend including Smart Cards, software, IT infrastructure, marketing services, and telecommunications devices. Delivered multi-million EUR annual savings through strategic sourcing while maintaining service excellence. Established Supplier Performance Management processes, resulting in suppliers receiving \"Vodafone Supplier of the Year Award\" twice. Specialized in vendor consolidation, risk mitigation, and innovative procurement strategies.",
      keywords: "Strategic Sourcing, Supplier Performance Management, Cost Optimization, Category Management, Direct/Indirect Procurement, IT Procurement, Telecommunications Sourcing, Vendor Consolidation, Supply Chain Excellence"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className={`border border-white p-6 transition-all duration-300 cursor-pointer ${
                hoveredBox === experience.id
                  ? 'text-white'
                  : 'text-muted-foreground/50'
              }`}
              onMouseEnter={() => setHoveredBox(experience.id)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <h3 className="font-body text-lg font-semibold mb-4 leading-snug">
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
      </div>
    </section>
  );
};

export default WorkExperienceSection;