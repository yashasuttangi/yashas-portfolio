import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollProgress } from './useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTracker(sectionIds: string[]) {
  const setProgress = useScrollProgress((s) => s.setProgress);
  const setSection  = useScrollProgress((s) => s.setSection);

  useEffect(() => {
    // ── 1. Total page progress ──
    const pageST = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setProgress(self.progress),
    });

    // ── 2. Per-section tracking — find the section closest to viewport center ──
    const updateActiveSection = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let activeIndex = 0;
      let activeProgress = 0;
      let minDistance = Infinity;

      sectionIds.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        const center = top + rect.height / 2;

        // distance from viewport center to section center
        const distance = Math.abs(viewportCenter - center);

        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
          // progress within this section (0 to 1)
          activeProgress = Math.max(0, Math.min(1, (viewportCenter - top) / rect.height));
        }
      });

      setSection(activeIndex, activeProgress);
    };

    // run on scroll + initial
    const sectionST = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updateActiveSection,
    });
    updateActiveSection();

    return () => {
      pageST.kill();
      sectionST.kill();
    };
  }, [sectionIds.join(',')]);
}