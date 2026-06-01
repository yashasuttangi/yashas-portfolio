import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot tracks mouse exactly (1:1)
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    let rafId = 0;
    const animate = () => {
      // Ring lerps behind with 15% easing
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // hover-state scaling on interactive elements
    const onEnter = () => {
      dot.style.width  = '14px';
      dot.style.height = '14px';
      dot.style.opacity = '0';            // dot fades on hover
      ring.style.width  = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(167, 139, 250, 0.9)';
      ring.style.background  = 'rgba(167, 139, 250, 0.08)';
    };
    const onLeave = () => {
      dot.style.width  = '10px';
      dot.style.height = '10px';
      dot.style.opacity = '1';
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(167, 139, 250, 0.5)';
      ring.style.background  = 'transparent';
    };

    const interactive = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor-hover]'
    );
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const onLeaveWindow = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnterWindow = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — tracks cursor 1:1 */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-violet-glow rounded-full pointer-events-none z-[9999]"
        style={{
          transition: 'width 0.25s, height 0.25s, opacity 0.2s',
          boxShadow: '0 0 8px rgba(167, 139, 250, 0.6)',
          willChange: 'transform',
        }}
      />
      {/* Ring — lerps behind with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-[9998]"
        style={{
          borderColor: 'rgba(167, 139, 250, 0.5)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}