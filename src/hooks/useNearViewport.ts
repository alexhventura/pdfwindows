import { useEffect, useRef, useState } from 'react';

/** Starts true when the element is near or inside the viewport. */
export function useNearViewport(rootMargin = '320px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isNear) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return { ref, isNear };
}
