import { useScrollProgress } from '../hooks/useScrollProgress';

export default function AtmosphericOverlay() {
  const progress = useScrollProgress((s) => s.progress);

  // Fade overlay in as we leave hero (0% at top, 70% darkness in body, lighter at contact)
  // Curve: gentle ramp up to body sections, slight pullback near contact
  const opacity = Math.min(0.7, progress * 1.5);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-[5]"
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, rgba(2, 1, 8, ${opacity}) 70%)`,
        transition: 'background 0.05s linear',
      }}
    />
  );
}