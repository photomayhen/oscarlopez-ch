import { useState, useEffect } from "react";

const IslandNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 shadow-lg">
        <ul className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default IslandNavbar;