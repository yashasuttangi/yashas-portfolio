import { create } from 'zustand';

interface ScrollState {
  // 0 to 1, total page scroll progress
  progress: number;

  // current section (0 = hero, 1 = about, 2 = skills, etc.)
  section: number;

  // 0 to 1 progress WITHIN current section
  sectionProgress: number;

  setProgress: (p: number) => void;
  setSection: (s: number, sp: number) => void;
}

export const useScrollProgress = create<ScrollState>((set) => ({
  progress: 0,
  section: 0,
  sectionProgress: 0,
  setProgress: (p) => set({ progress: p }),
  setSection: (section, sectionProgress) => set({ section, sectionProgress }),
}));