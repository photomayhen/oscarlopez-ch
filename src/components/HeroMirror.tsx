import React from "react";

const HeroMirror: React.FC = () => {
  return (
    <section aria-hidden className="relative overflow-hidden h-[45vh] md:h-[55vh] bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-100 scale-y-[-1] scale-x-[-1]"
      >
        <source src="https://res.cloudinary.com/dqd4dvem7/video/upload/v1753690853/arc_n2w6lv.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default HeroMirror;
