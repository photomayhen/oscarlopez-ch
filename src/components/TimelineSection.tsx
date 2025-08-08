import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

// Oscar Lopez Career Timeline (1994 - 2025)
// - Three-column layout
// - Scroll-triggered Mac Dock-like scaling and opacity
// - Responsive and accessible with reduced-motion support

type Range = { label: string; start: number; end: number };

const ranges: Range[] = [
  { label: "Huawei", start: 2016, end: 2025 },
  { label: "Qiagen", start: 2012, end: 2015 },
  { label: "Huawei", start: 2011, end: 2011 },
  { label: "Vodafone", start: 2004, end: 2010 },
  { label: "SONY Ericsson", start: 2003, end: 2003 },
  { label: "SONY", start: 2001, end: 2002 },
  { label: "E-Commerce Quality", start: 2000, end: 2000 },
  { label: "TECDIS", start: 1997, end: 1999 },
  { label: "IBM", start: 1994, end: 1996 },
];

const YEARS_START = 2025;
const YEARS_END = 1994;

const isYearInRange = (year: number, r: Range) => year >= r.start && year <= r.end;

const getCompanyForYear = (year: number) => {
  const found = ranges.find((r) => isYearInRange(year, r));
  return found ? found.label : "";
};

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yearRefs = useRef<(HTMLElement | null)[]>([]);
  const companyRefs = useRef<(HTMLElement | null)[]>([]);

  const years = useMemo(
    () => Array.from({ length: YEARS_START - YEARS_END + 1 }, (_, i) => YEARS_START - i),
    []
  );

  // Continuous scroll-based animation using rAF for 60fps
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ticking = false;

    const update = () => {
      if (!container) return;
      const viewportCenterY = window.innerHeight / 2;

      // Calculate and apply transforms for each row (year + company)
      for (let i = 0; i < years.length; i++) {
        const yearEl = yearRefs.current[i];
        const compEl = companyRefs.current[i];
        if (!yearEl || !compEl) continue;

        const rect = yearEl.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - viewportCenterY);

        // Normalize distance for mapping (0 -> near, >= 800 -> far)
        const norm = Math.min(distance / 800, 2);

        // Map to scale and opacity smoothly
        // Near focus: scale ~1.5, opacity 1
        // Far: scale ~0.6, opacity 0.1
        const maxScale = 1.5;
        const minScale = 0.6;
        const maxOpacity = 1.0;
        const minOpacity = 0.1;

        const factor = Math.max(0, 1 - norm); // 1 near, 0 far
        const scale = minScale + (maxScale - minScale) * factor;
        const opacity = minOpacity + (maxOpacity - minOpacity) * factor;

        const fontWeight = scale > 1.35 ? 700 : scale > 1.1 ? 600 : 400;
        const glow = factor > 0.85 ? 0.7 : factor > 0.6 ? 0.4 : factor > 0.3 ? 0.2 : 0;

        if (!prefersReduced) {
          const transform = `scale(${scale.toFixed(3)}) translateZ(0)`; // GPU accelerate
          yearEl.style.transform = transform;
          compEl.style.transform = transform;
          yearEl.style.opacity = opacity.toFixed(3);
          compEl.style.opacity = opacity.toFixed(3);
          yearEl.style.fontWeight = String(fontWeight);
          compEl.style.fontWeight = String(fontWeight);
          const drop = `drop-shadow(0 0 ${Math.round(16 * glow)}px hsl(var(--foreground) / ${0.35 * glow}))`;
          yearEl.style.filter = drop;
          compEl.style.filter = drop;
        } else {
          // Reduced motion: highlight closest item only (no continuous transforms)
          yearEl.style.transform = "none";
          compEl.style.transform = "none";
          yearEl.style.filter = "none";
          compEl.style.filter = "none";
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Observe when section is in view to attach/remove scroll listener
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { threshold: 0.1 }
    );

    io.observe(container);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [years]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const activeIndex = yearRefs.current.findIndex((el) => el === document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(years.length - 1, Math.max(0, activeIndex) + 1);
        yearRefs.current[next]?.focus({ preventScroll: false });
        yearRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(0, (activeIndex === -1 ? 0 : activeIndex) - 1);
        yearRefs.current[prev]?.focus({ preventScroll: false });
        yearRefs.current[prev]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [years.length]);

  return (
    <section
      aria-labelledby="timeline-heading"
      className={cn(
        "relative w-full",
        // Seamless continuation and spacing harmony
        "bg-background",
        // Ensure enough viewport height to enjoy the effect
        "py-8 md:py-16"
      )}
    >
      <div className="container mx-auto">
        <header className="sr-only">
          <h2 id="timeline-heading">Career Timeline</h2>
          <p>Procurement excellence journey from 1994 to 2025.</p>
        </header>

        <div
          ref={containerRef}
          tabIndex={0}
          aria-label="Scrollable career timeline from 2025 to 1994"
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10",
            // Remove visual dividers
            "outline-none"
          )}
        >
          {/* Left Column: Years */}
          <div className="md:col-start-1 md:col-span-1">
            <ul className="flex flex-col items-center md:items-center gap-2 md:gap-4">
              {years.map((y, i) => (
                <li
                  key={y}
                  ref={(el) => (yearRefs.current[i] = el)}
                  tabIndex={0}
                  className={cn(
                    "will-change-transform transition-[transform,opacity,filter]",
                    "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "text-foreground/70 hover:text-foreground focus:text-foreground",
                    "font-body text-base md:text-lg select-none"
                  )}
                  aria-label={`Year ${y}`}
                >
                  {y}
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: Metallic Bar */}
          <div className="hidden md:flex items-stretch justify-center md:col-start-2 md:col-span-1">
            <div
              aria-hidden
              className="relative w-8 md:w-12 rounded-full my-2"
              style={{
                // Chrome/silver gradient with blue-white atmospheric glow (HSL values)
                background:
                  "linear-gradient(180deg, hsl(210 10% 90%) 0%, hsl(210 5% 60%) 40%, hsl(210 3% 40%) 60%, hsl(210 10% 85%) 100%)",
                boxShadow:
                  "0 0 24px hsl(210 100% 85% / 0.25), inset 0 1px 1px hsl(210 40% 98% / 0.35), inset 0 -1px 1px hsl(210 10% 30% / 0.35)",
              }}
            >
              {/* Subtle atmospheric glow ring */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(210 100% 90% / 0.15), transparent 60%)",
                  filter: "blur(8px)",
                }}
              />
            </div>
          </div>

          {/* Right Column: Companies (per-year mapping for synchronized animation) */}
          <div className="md:col-start-3 md:col-span-1">
            <ul className="flex flex-col items-center md:items-center gap-2 md:gap-4">
              {years.map((y, i) => (
                <li
                  key={`${y}-company`}
                  ref={(el) => (companyRefs.current[i] = el)}
                  className={cn(
                    "will-change-transform transition-[transform,opacity,filter]",
                    "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "text-foreground/70",
                    "font-heading text-sm md:text-base tracking-wide select-none"
                  )}
                  aria-label={`Company in ${y}: ${getCompanyForYear(y) || "—"}`}
                >
                  {getCompanyForYear(y) || "\u2014"}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
