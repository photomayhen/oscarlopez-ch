import { useEffect, useState } from "react";
const RecognitionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const section = document.getElementById("recognitions-section");
    if (section) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  const awards = [{
    title: "Gold Award Visual Branding",
    size: "normal"
  }, {
    title: "Best Framer Template 2025",
    size: "large"
  }, {
    title: "Site of the Day Awwwards",
    size: "normal"
  }];
  return <section id="recognitions-section" className="w-full md:pb-12px-4 md:px-6">
      
    </section>;
};
export default RecognitionsSection;