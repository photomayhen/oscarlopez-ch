import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
const FeaturedProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const element = document.getElementById('featured-projects-section');
    if (element) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  const projects = [{
    name: "Voltari",
    image: "/lovable-uploads/cb41ed95-ea6e-42d4-af5d-0196bfe2aa32.png"
  }, {
    name: "Lustra",
    image: "/lovable-uploads/9310987a-18b7-4ffc-a62a-3c85b98c0d38.png"
  }, {
    name: "Verdra",
    image: "/lovable-uploads/9403f89d-dc07-4367-9b52-57b47f8a07ac.png"
  }];
  return;
};
export default FeaturedProjectsSection;