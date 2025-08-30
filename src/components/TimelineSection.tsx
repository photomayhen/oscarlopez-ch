
import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

// Oscar Lopez Career Timeline (1994 - 2025)
// - Three-column layout
// - Scroll-triggered Mac Dock-like scaling and opacity
// - Responsive and accessible with reduced-motion support

type Range = { label: string; start: number; end: number };

const ranges: Range[] = [
  { label: "Huawei", start: 2016, end: 2025 },
  { label: "QIAGEN", start: 2012, end: 2015 },
  { label: "Huawei", start: 2011, end: 2011 },
  { label: "Vodafone", start: 2004, end: 2010 },
  { label: "SONY", start: 2001, end: 2003 },
  { label: "eQuality", start: 2000, end: 2000 },
  { label: "TECDIS", start: 1997, end: 1999 },
  { label: "IBM", start: 1994, end: 1996 },
];

const LABEL_SCALE_BOOST: Record<string, number> = { Vodafone: 1.12 };

const YEARS_START = 2025;
const YEARS_END = 1994;

const isYearInRange = (year: number, r: Range) => year >= r.start && year <= r.end;

const getCompanyForYear = (year: number) => {
  const found = ranges.find((r) => isYearInRange(year, r));
  return found ? found.label : "";
};

const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yearsListRef = useRef<HTMLUListElement | null>(null);
  const yearRefs = useRef<(HTMLElement | null)[]>([]);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const rangeRefs = useRef<(HTMLElement | null)[]>([]);
  const rangeCentersRef = useRef<number[]>([]);

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

    const computeLayout = () => {
      const yearsList = yearsListRef.current;
      const rightCol = rightColRef.current;
      if (!yearsList || !rightCol) return;

      const lastIdx = years.length - 1;
      const lastEl = yearRefs.current[lastIdx];
      if (lastEl) {
        const totalHeight = lastEl.offsetTop + lastEl.offsetHeight;
        rightCol.style.height = `${totalHeight}px`;
      }

      rangeCentersRef.current = ranges.map((r) => {
        const startIdx = years.indexOf(r.start);
        const endIdx = years.indexOf(r.end);
        const startEl = yearRefs.current[startIdx];
        const endEl = yearRefs.current[endIdx];
        if (!startEl || !endEl) return 0;
        const startC = startEl.offsetTop + startEl.offsetHeight / 2;
        const endC = endEl.offsetTop + endEl.offsetHeight / 2;
        return (startC + endC) / 2;
      });

      ranges.forEach((_, i) => {
        const el = rangeRefs.current[i];
        if (!el) return;
        const mid = rangeCentersRef.current[i] ?? 0;
        el.style.position = "absolute";
        el.style.left = "50%";
        el.style.top = `${mid}px`;
        el.style.transform = "translate(-50%, -50%)";
      });
    };

    const update = () => {
      if (!container) return;
      const yearsList = yearsListRef.current;
      const viewportCenterY = window.innerHeight / 2;

      if (!rangeCentersRef.current.length) computeLayout();

      const distanceDenominator = 400; // Reduced for sharper transitions
      const maxScale = 2.3; // Increased max scale for stronger focus
      const minScale = 0.35; // Reduced min scale for more dramatic effect
      const maxOpacity = 1.0;
      const minOpacity = 0.0; // Invisible when far enough

      // Determine the active (focused) year index
      let activeYearIdx = 0;
      let minYearDist = Infinity;
      for (let i = 0; i < years.length; i++) {
        const el = yearRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const d = Math.abs(rowCenter - viewportCenterY);
        if (d < minYearDist) {
          minYearDist = d;
          activeYearIdx = i;
        }
      }

      for (let i = 0; i < years.length; i++) {
        const yearEl = yearRefs.current[i];
        if (!yearEl) continue;

        // Hard cut-off after 5 items away from focus
        if (Math.abs(i - activeYearIdx) > 5) {
          yearEl.style.opacity = "0";
          yearEl.style.transform = "scale(0.35) translateZ(0)";
          yearEl.style.color = "hsl(var(--background))";
          yearEl.style.filter = "none";
          continue;
        }

        const rect = yearEl.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - viewportCenterY);
        const norm = Math.min(distance / distanceDenominator, 3);
        const factor = Math.max(0, 1 - norm);

        const scaleFactor = factor * factor; // Quadratic for sharper falloff
        const scale = minScale + (maxScale - minScale) * scaleFactor;

        const opacityFactor = Math.pow(factor, 1.5); // Power curve for sharper falloff
        const opacity = minOpacity + (maxOpacity - minOpacity) * opacityFactor;

        const isActive = i === activeYearIdx;

        if (!prefersReduced) {
          yearEl.style.transform = `scale(${scale.toFixed(3)}) translateZ(0)`;
          yearEl.style.opacity = opacity.toFixed(3);
          yearEl.style.fontWeight = isActive ? "900" : scale > 1.4 ? "700" : scale > 1.0 ? "600" : "400";
          const drop = isActive
            ? `drop-shadow(0 0 32px hsl(var(--foreground) / 0.5))`
            : `drop-shadow(0 0 ${Math.round(20 * factor)}px hsl(var(--foreground) / ${0.3 * factor}))`;
          yearEl.style.filter = drop;
          yearEl.style.color = isActive
            ? `hsl(var(--foreground) / 1)`
            : `hsl(var(--foreground) / ${Math.max(0.1, opacity)})`;
        } else {
          yearEl.style.transform = "none";
          yearEl.style.filter = "none";
        }
      }

      if (yearsList) {
        const listRect = yearsList.getBoundingClientRect();

        // Determine the active (focused) range label index
        let activeRangeIdx = 0;
        let minRangeDist = Infinity;
        ranges.forEach((_, i) => {
          const mid = rangeCentersRef.current[i] ?? 0;
          const viewportY = listRect.top + mid;
          const d = Math.abs(viewportY - viewportCenterY);
          if (d < minRangeDist) {
            minRangeDist = d;
            activeRangeIdx = i;
          }
        });

        ranges.forEach((r, i) => {
          const label = rangeRefs.current[i];
          if (!label) return;

          // Hard cut-off after 5 items away from focus
          if (Math.abs(i - activeRangeIdx) > 5) {
            label.style.opacity = "0";
            label.style.transform = "translate(-50%, -50%) scale(0.35)";
            label.style.color = "hsl(var(--background))";
            label.style.filter = "none";
            label.style.fontWeight = "300";
            return;
          }

          const mid = rangeCentersRef.current[i] ?? 0;
          const viewportY = listRect.top + mid;
          const distance = Math.abs(viewportY - viewportCenterY);
          const norm = Math.min(distance / distanceDenominator, 3);
          const factor = Math.max(0, 1 - norm);

          const scaleFactor = factor * factor;
          const scale = minScale + (maxScale - minScale) * scaleFactor;
          const boost = LABEL_SCALE_BOOST[r.label] ?? 1;
          const scaleAdj = Math.min(scale * boost, 2.5);

          const opacityFactor = Math.pow(factor, 1.5);
          const opacity = minOpacity + (maxOpacity - minOpacity) * opacityFactor;

          const isActive = i === activeRangeIdx;

          if (!prefersReduced) {
            label.style.transform = `translate(-50%, -50%) scale(${scaleAdj.toFixed(3)})`;
            label.style.opacity = opacity.toFixed(3);
            label.style.fontWeight = isActive ? "900" : scaleAdj > 1.4 ? "700" : scaleAdj > 1.0 ? "600" : "400";
            const drop = isActive
              ? `drop-shadow(0 0 32px hsl(var(--foreground) / 0.5))`
              : `drop-shadow(0 0 ${Math.round(20 * factor)}px hsl(var(--foreground) / ${0.3 * factor}))`;
            label.style.filter = drop;
            label.style.color = isActive
              ? `hsl(var(--foreground) / 1)`
              : `hsl(var(--foreground) / ${Math.max(0.1, opacity)})`;
          } else {
            label.style.transform = "translate(-50%, -50%)";
            label.style.filter = "none";
          }
        });
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      rangeCentersRef.current = [];
      computeLayout();
      onScroll();
    };

    // Observe when section is in view to attach/remove scroll listener
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          computeLayout();
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onResize);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
        }
      },
      { threshold: 0.1 }
    );

    io.observe(container);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
            "grid grid-cols-3 gap-1 sm:gap-2 md:gap-6",
            // Scale down on mobile to fit all content
            "transform scale-75 sm:scale-90 md:scale-100 origin-center",
            // Remove visual dividers
            "outline-none"
          )}
        >
          {/* Left Column: Years */}
          <div className="col-start-1 col-span-1">
            <ul ref={yearsListRef} className="flex flex-col items-center gap-1 sm:gap-2 md:gap-4">
              {years.map((y, i) => (
                <li
                  key={y}
                  ref={(el) => (yearRefs.current[i] = el)}
                  tabIndex={0}
                  className={cn(
                    "will-change-transform transition-[transform,opacity,filter]",
                    "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "text-foreground/70 hover:text-foreground focus:text-foreground",
                    "font-body text-xs sm:text-sm md:text-lg select-none"
                  )}
                  aria-label={`Year ${y}`}
                >
                  {y}
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: Metallic Bar with Blue Atmospheric Glow */}
          <div className="flex items-stretch justify-center col-start-2 col-span-1">
            <div
              aria-hidden
              className="relative w-2 sm:w-4 md:w-12 rounded-full my-2"
              style={{
                // Enhanced chrome/silver gradient with blue atmospheric tones
                background:
                  "linear-gradient(180deg, hsl(210 15% 92%) 0%, hsl(210 20% 85%) 10%, hsl(210 8% 65%) 40%, hsl(210 5% 45%) 60%, hsl(210 12% 88%) 90%, hsl(210 18% 95%) 100%)",
                boxShadow:
                  "0 0 30px hsl(210 100% 88% / 0.3), inset 0 2px 2px hsl(210 50% 98% / 0.4), inset 0 -2px 2px hsl(210 15% 35% / 0.4), 0 0 60px hsl(210 80% 85% / 0.15)",
              }}
            >
              {/* Enhanced atmospheric blue glow ring */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(210 100% 92% / 0.2) 0%, hsl(210 80% 88% / 0.1) 30%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />
              
              {/* Additional subtle inner blue glow */}
              <div
                className="pointer-events-none absolute inset-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, hsl(210 60% 90% / 0.1) 30%, hsl(210 40% 85% / 0.05) 70%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Right Column: Company Range Labels (single per company) */}
          <div ref={rightColRef} className="relative col-start-3 col-span-1">
            {/* Absolutely positioned labels centered, height set via JS */}
            {ranges.map((r, i) => (
              <div
                key={`${r.label}-${r.start}-${r.end}`}
                ref={(el) => (rangeRefs.current[i] = el)}
                className={cn(
                  "pointer-events-none select-none text-foreground/70",
                  "will-change-transform transition-[transform,opacity,filter]",
                  "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  "font-heading text-xs sm:text-sm md:text-base tracking-wide"
                )}
                aria-label={`${r.label} from ${r.start} to ${r.end}`}
              >
                {r.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
