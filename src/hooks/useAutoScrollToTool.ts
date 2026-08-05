import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import {
  getPerformanceNavigationType,
  scrollToToolStart,
  shouldAutoScrollToTool,
  TOOL_START_ID,
  type RouterNavigationType,
} from '../utils/scrollToToolStart';

let popStatePending = false;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'popstate',
    () => {
      popStatePending = true;
    },
    { capture: true }
  );
}

function clampScrollToDocument() {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  if (window.scrollY > maxScroll) {
    window.scrollTo(0, maxScroll);
  }
}

/**
 * On tool pages, positions the viewport at the workspace on direct entry or forward navigation.
 * Skips browser back/forward and native scroll restoration.
 * Always clamps scroll so a tall homepage cannot leave the next page scrolled into empty space.
 */
export function useAutoScrollToTool(targetId: string = TOOL_START_ID) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType() as RouterNavigationType;
  const backForwardCacheRef = useRef(false);
  const lastScrollPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        backForwardCacheRef.current = true;
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  useLayoutEffect(() => {
    const popPending = popStatePending;
    popStatePending = false;

    const allowScroll = shouldAutoScrollToTool({
      navigationType,
      popStatePending: popPending,
      backForwardCache: backForwardCacheRef.current,
      performanceNavType: getPerformanceNavigationType(),
    });

    backForwardCacheRef.current = false;

    if (!allowScroll) {
      clampScrollToDocument();
      return;
    }

    // Avoid duplicate scroll on the same path when React re-renders without navigation.
    if (navigationType === 'POP' && lastScrollPathRef.current === pathname) {
      clampScrollToDocument();
      return;
    }

    const scrolled = scrollToToolStart(targetId);
    if (!scrolled) {
      // Element not painted yet (lazy route) — retry once, then fall back to top.
      requestAnimationFrame(() => {
        if (!scrollToToolStart(targetId)) {
          window.scrollTo(0, 0);
        }
        clampScrollToDocument();
      });
    } else {
      clampScrollToDocument();
    }

    lastScrollPathRef.current = pathname;
  }, [pathname, navigationType, targetId]);
}
