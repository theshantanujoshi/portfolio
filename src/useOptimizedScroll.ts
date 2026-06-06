import { useEffect } from 'react';
import Lenis from 'lenis';

interface ScrollNavOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onForward?: () => void;
  onReverse?: () => void;
}

export function useOptimizedScroll({ containerRef, onForward, onReverse }: ScrollNavOptions) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Initialize Lenis for smooth scroll on this specific container
    // We create a wrapper div inside the container to act as the content payload if needed,
    // but Lenis works directly on overflow containers by tracking their scrollTop.
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // 2. Native DOM Scroll Navigation Interception
    // Bypasses React's synthetic event system and Virtual DOM entirely
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const isAtTop = el.scrollTop <= 0;
      const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) <= 2;

      if (isAtTop && e.deltaY < -50 && onReverse) {
        onReverse();
      }
      if (isAtBottom && e.deltaY > 50 && onForward) {
        onForward();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      const isAtTop = el.scrollTop <= 0;
      const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) <= 2;

      if (isAtTop && deltaY < -50 && onReverse) {
        onReverse();
      }
      if (isAtBottom && deltaY > 50 && onForward) {
        onForward();
      }
    };

    // Use { passive: true } to prevent main-thread blocking during scroll
    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, onForward, onReverse]);
}
