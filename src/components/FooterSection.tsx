import React from 'react';

const FooterSection = () => {
  const navigationLinks = [
    'About',
    'Services', 
    'Work',
    'Blog',
    'Get Template',
    'Contact'
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oscarlt' },
    { label: 'X', href: 'https://x.com/oscarsuiza' }
  ];

  return (
    <footer id="contact" className="w-full bg-background py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Logo & Tagline */}
          <div className="animate-fade-in">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-2">
              Oscar
            </h3>
            <p className="text-base md:text-lg font-body text-muted-foreground mb-4">
              Procurement Excellence
            </p>
            <div className="space-y-2">
              <p className="font-body text-base text-muted-foreground">
                oscarlt@me.com
              </p>
              <p className="font-body text-base text-muted-foreground">
                +41 77 266 34 48
              </p>
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <nav className="space-y-3">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  <a 
                    href="#" 
                    className="block font-body text-base md:text-lg text-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Column - Social Links */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <nav className="space-y-3">
              {socialLinks.map((link, index) => (
                <div key={index}>
                  <a 
                    href={link.href}
                    className="block font-body text-base md:text-lg text-foreground hover:text-primary transition-colors duration-300"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;