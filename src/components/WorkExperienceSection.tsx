import { useState } from "react";

const WorkExperienceSection = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: "1. Senior Contract Commercial Manager - Telecommunications & Technology",
      content: "Strategic Contract Negotiation & Risk Management Leader | Managed end-to-end contract lifecycle for telecommunications operators with multi-million CHF portfolios annually. Successfully secured and negotiated multi-million CHF contracts through strategic tender management. Led digital transformation using AI-driven contract analysis tools, achieving top Western Europe rankings for contract lifecycle management. Specialized in 5G network infrastructure contracts, public/private sector tenders, and enterprise partnerships across Switzerland and DACH region.",
      keywords: "Contract Management, Strategic Negotiations, Procurement Excellence, Risk Management, Tender Management, AI Contract Analysis, 5G Infrastructure, Telecommunications Procurement"
    },
    {
      id: 2,
      title: "2. Director Corporate Relationship Management - Biotechnology & Pharmaceuticals",
      content: "Procurement-Sales Bridge & Strategic Partnership Developer | Pioneered account management strategies connecting sales teams with procurement departments of major pharmaceutical companies, CROs, and academic institutions. Delivered 20% business growth in molecular diagnostics through procurement-aligned partnerships. Trained 100+ sales professionals in advanced negotiation techniques and established KPI dashboards. Successfully negotiated framework agreements with global pharmaceutical companies, transforming sales into strategic procurement partnerships.",
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
              
              <p className="font-body text-sm leading-snug mb-4">
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