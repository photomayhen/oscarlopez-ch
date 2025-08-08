import React, { useEffect, useRef, useState } from "react";

const IMG_SRC = "/lovable-uploads/406e6f27-f9e9-4cfa-ab7f-2cd65373c358.png";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const CM_IN_PX = 96 / 2.54;
const END_GUTTER_PX = CM_IN_PX * 2; // keep window ~2cm from the right edge at the end
const PROGRESS_SPEED = 1.9; // move the window faster so it reaches the end earlier

const PanoramaReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [aspect, setAspect] = useState<number | null>(null);
  const [containerH, setContainerH] = useState<number>(300);

  // Load image to determine its natural aspect ratio
  useEffect(() => {
    const img = new Image();
    img.src = IMG_SRC;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspect(img.naturalHeight / img.naturalWidth);
      }
    };
  }, []);

  // Recompute container height from available width and aspect
  useEffect(() => {
    const compute = () => {
      if (!innerRef.current || !aspect) return;
      const w = innerRef.current.getBoundingClientRect().width;
      setContainerH(w * aspect);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [aspect]);

useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;

    let raf = 0;
    const update = () => {
      if (!container || !innerRef.current || !colorLayerRef.current || !frameRef.current) return;

      const secRect = container.getBoundingClientRect();
      const total = secRect.height + window.innerHeight;
      const passed = window.innerHeight - secRect.top;
      const base = clamp(passed / total, 0, 1);
      const progress = clamp(base * PROGRESS_SPEED, 0, 1);

      const innerRect = innerRef.current.getBoundingClientRect();
      const square = containerH; // window side equals rendered image height
      const maxLeft = Math.max(innerRect.width - square - END_GUTTER_PX, 0);
      const left = maxLeft * progress;
      const right = Math.max(innerRect.width - left - square, 0);

      // Reveal full height
      colorLayerRef.current.style.clipPath = `inset(0px ${right}px 0px ${left}px)`;

      frameRef.current.style.transform = `translate(${left}px, 0px)`;
      frameRef.current.style.width = `${square}px`;
      frameRef.current.style.height = `${square}px`;
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
  }, [containerH]);

return (
    <section aria-label="Panoramic photo reveal" className="relative w-full my-10">
      <div
        ref={containerRef}
        className="relative bg-background overflow-hidden rounded-sm shadow"
        style={{ height: containerH || undefined }}
      >
        {/* Inner area with fixed black gutters (1cm each side) */}
        <div ref={innerRef} className="absolute inset-y-0" style={{ left: "1cm", right: "1cm" }}>
          {/* Desaturated, dark background image (full width, full image visible) */}
          <img
            aria-hidden
            src={IMG_SRC}
            alt=""
            className="absolute inset-0 w-full h-full object-contain object-left grayscale brightness-50"
          />

          {/* Color layer, revealed through a moving square clip that spans full height */}
          <div
            ref={colorLayerRef}
            aria-hidden
            className="absolute inset-0"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <img src={IMG_SRC} alt="" className="absolute inset-0 w-full h-full object-contain object-left" />
          </div>

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
          alt="Vibrant panoramic lakeside scene with modern sculpture and a person in a suit"
          loading="lazy"
          className="sr-only"
        />
      </div>
    </section>
  );
};

export default PanoramaReveal;
