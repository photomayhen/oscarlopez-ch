import React from "react";

const HeroMirror: React.FC = () => {
  return (
    <section aria-hidden className="relative overflow-hidden h-[45vh] md:h-[55vh] bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover mix-blend-lighten scale-y-[-1] scale-x-[-1]"
        style={{ mixBlendMode: 'lighten' }}
      >
        <source src="/videos/arc2.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroMirror;
