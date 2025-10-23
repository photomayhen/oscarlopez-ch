import React from "react";

const HeroMirror: React.FC = () => {
  return (
    <section aria-hidden className="relative overflow-hidden h-[45vh] md:h-[55vh] bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain mix-blend-lighten"
        style={{ mixBlendMode: 'lighten' }}
      >
        <source src="/videos/arc2.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroMirror;
