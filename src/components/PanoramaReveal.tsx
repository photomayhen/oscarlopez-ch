import React, { useEffect, useRef, useState } from "react";

const IMG_SRC = "/lovable-uploads/9422e35b-3f49-4eb1-9128-25836be52860.png";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const PanoramaReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [squareSize, setSquareSize] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const r = inner.getBoundingClientRect();
      const size = Math.min(Math.max(r.height * 0.6, 160), 360); // responsive square
      setSquareSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;

    let raf = 0;
    const update = () => {
      if (!container || !innerRef.current || !colorLayerRef.current || !frameRef.current) return;

      const secRect = container.getBoundingClientRect();
      const total = secRect.height + window.innerHeight;
      const passed = window.innerHeight - secRect.top;
      const progress = clamp(passed / total, 0, 1);

      const innerRect = innerRef.current.getBoundingClientRect();
      const availableX = Math.max(innerRect.width - squareSize, 0);
      const x = availableX * progress;
      const y = Math.max((innerRect.height - squareSize) / 2, 0);

      const left = x;
      const right = Math.max(innerRect.width - x - squareSize, 0);
      const bottom = Math.max(innerRect.height - y - squareSize, 0);

      colorLayerRef.current.style.clipPath = `inset(${y}px ${right}px ${bottom}px ${left}px)`;
      frameRef.current.style.transform = `translate(${left}px, ${y}px)`;
      frameRef.current.style.width = `${squareSize}px`;
      frameRef.current.style.height = `${squareSize}px`;
    };

    const onScroll = () => {
      if (prefersReduced) return; // respect reduced motion
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    // Initial position
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [squareSize]);

  return (
    <section aria-label="Panoramic photo reveal" className="relative w-full my-10">
      <div
        ref={containerRef}
        className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] bg-background overflow-hidden rounded-sm shadow"
      >
        {/* Inner area with fixed black gutters (1cm each side) */}
        <div ref={innerRef} className="absolute inset-y-0" style={{ left: "1cm", right: "1cm" }}>
          {/* Desaturated, dark background image */}
          <div
            aria-hidden
            className="absolute inset-0 bg-center bg-cover grayscale brightness-50"
            style={{ backgroundImage: `url(${IMG_SRC})` }}
          />

          {/* Color layer, revealed through a moving square clip */}
          <div
            ref={colorLayerRef}
            aria-hidden
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${IMG_SRC})`, clipPath: "inset(0 100% 100% 0)" }}
          />

          {/* Visible window frame */}
          <div
            ref={frameRef}
            aria-hidden
            className="absolute pointer-events-none border-2 border-foreground shadow-[0_0_0_2px_hsl(var(--background))]"
          />
        </div>

        {/* Accessibility + SEO: hidden img for alt text and lazy loading */}
        <img
          src={IMG_SRC}
          alt="Panoramic lakeside scene with modern sculpture and a person in a suit"
          loading="lazy"
          className="sr-only"
        />
      </div>
    </section>
  );
};

export default PanoramaReveal;
