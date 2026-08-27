import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import {
  getPerformanceNavigationType,
  hasSettledToolScrollTarget,
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
 * On tool pages, positions the viewport at the start of the tool card so the
 * title and file-upload block share the screen (or the workspace when the tool
 * has no dropzone) on direct entry or forward navigation.
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

    let cancelled = false;
    lastScrollPathRef.current = pathname;

    const align = () => {
      if (cancelled) return false;
      try {
        const scrolled = scrollToToolStart(targetId);
        if (!scrolled) return false;
        clampScrollToDocument();
        return true;
      } catch {
        return false;
      }
    };

    if (!align()) {
      requestAnimationFrame(() => {
        if (!align()) {
          window.scrollTo(0, 0);
          clampScrollToDocument();
        }
      });
    }

    // Dropzone lives in a lazy workbench. Keep watching until upload exists or
    // the spinner is gone (tools without a file picker). Then stop so we do not
    // fight the user if they scroll up to the intro.
    if (hasSettledToolScrollTarget(targetId)) {
      return () => {
        cancelled = true;
      };
    }

    const root = document.getElementById(targetId) ?? document.body;
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        align();
        if (hasSettledToolScrollTarget(targetId)) observer.disconnect();
      });
    });
    observer.observe(root, { childList: true, subtree: true });

    const settle = window.setTimeout(() => {
      observer.disconnect();
      align();
    }, 2500);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(settle);
    };
  }, [pathname, navigationType, targetId]);
}
