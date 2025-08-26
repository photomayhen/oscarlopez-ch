import { useState } from "react";

const skills = [
  { id: 1, emoji: "1️⃣", title: "Strategic Thinking", x: 15, y: 20 },
  { id: 2, emoji: "2️⃣", title: "Data-Driven Decisions", x: 75, y: 15 },
  { id: 3, emoji: "3️⃣", title: "Supplier Relationship Management", x: 25, y: 60 },
  { id: 4, emoji: "4️⃣", title: "Strategic Sourcing", x: 80, y: 45 },
  { id: 5, emoji: "5️⃣", title: "Leadership & Teamwork", x: 45, y: 25 },
  { id: 6, emoji: "6️⃣", title: "Communication & Negotiation", x: 65, y: 70 },
  { id: 7, emoji: "7️⃣", title: "Financial Literacy", x: 10, y: 45 },
  { id: 8, emoji: "8️⃣", title: "Ethical & Sustainable Sourcing", x: 85, y: 25 },
  { id: 9, emoji: "9️⃣", title: "Digital Procurement Skills", x: 35, y: 75 },
  { id: 10, emoji: "🔟", title: "Adaptability & Resilience", x: 55, y: 50 },
];

// Placeholder definitions - please provide the actual definitions from your table
const skillDefinitions: Record<number, string> = {
  1: "The ability to think strategically and see the big picture in procurement decisions.",
  2: "Making informed decisions based on data analysis and market intelligence.",
  3: "Building and maintaining strong relationships with suppliers and partners.",
  4: "Developing comprehensive sourcing strategies to optimize value and reduce risk.",
  5: "Leading teams effectively and collaborating across organizational boundaries.",
  6: "Effectively communicating and negotiating with stakeholders and suppliers.",
  7: "Understanding financial principles and their impact on procurement decisions.",
  8: "Ensuring ethical practices and sustainability in sourcing decisions.",
  9: "Leveraging digital tools and technologies to enhance procurement processes.",
  10: "Adapting to change and building resilience in dynamic business environments.",
};

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 lg:px-12 py-16 bg-background">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <h2 className="font-body text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed text-center mb-16">
          Skills for the today and for the future
        </h2>

        {/* Skills Area */}
        <div className="relative h-96 mb-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center ${
                hoveredSkill === skill.id 
                  ? 'text-white drop-shadow-lg scale-110 text-base md:text-lg lg:text-xl' 
                  : 'text-muted-foreground/40 hover:text-muted-foreground/60 text-sm md:text-base lg:text-lg'
              }`}
              style={{ 
                left: `${skill.x}%`, 
                top: `${skill.y}%` 
              }}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <span className="mr-2">{skill.emoji}</span>
              {skill.title}
            </div>
          ))}
        </div>

        {/* Definition Banner */}
        <div className="bg-muted/20 rounded-lg p-6 min-h-[80px] flex items-center justify-center border border-border/50">
          <p className="font-body text-foreground/80 text-sm md:text-base text-center leading-relaxed">
            {hoveredSkill 
              ? skillDefinitions[hoveredSkill] 
              : "Hover over a skill to see its definition"
            }
          </p>
        </div>

        {/* Business Transformation Section */}
        <div className="mt-16 mx-8 md:mx-16 lg:mx-24 text-left bg-muted/10 rounded-3xl p-8 border-2 border-white">
          <h3 className="font-body text-foreground text-base md:text-lg mb-4 leading-tight">
            How I Can Transform Your Business
          </h3>
          
          <div className="space-y-2 font-body text-foreground/90 text-sm md:text-base leading-tight">
            <div>
              <p className="font-semibold">🏢 PERMANENT ROLES: <span className="font-normal">Senior leadership positions where strategic procurement drives competitive advantage</span></p>
            </div>
            
            <div>
              <p className="font-semibold">⏱️ INTERIM ASSIGNMENTS: <span className="font-normal">Bridge critical gaps while you find the perfect permanent solution</span></p>
            </div>
            
            <div>
              <p className="font-semibold mb-1">🎯 PROJECT CONTRACTS: <span className="font-normal">Specific challenges requiring specialized expertise:</span></p>
              <ul className="ml-6 space-y-0.5 text-foreground/80">
                <li>• High-stakes contract negotiations</li>
                <li>• Vendor relationship rescue missions</li>
                <li>• Procurement process optimization</li>
                <li>• Digital transformation initiatives</li>
                <li>• Risk mitigation strategies</li>
                <li>• Team training and development</li>
              </ul>
            </div>
            
            <div>
              <p className="font-semibold">💡 STRATEGIC CONSULTING: <span className="font-normal">When you need an expert perspective on complex procurement challenges</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;