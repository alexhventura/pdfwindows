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

/**
 * On tool pages, positions the viewport at the workspace on direct entry or forward navigation.
 * Skips browser back/forward and native scroll restoration.
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
      return;
    }

    // Avoid duplicate scroll on the same path when React re-renders without navigation.
    if (navigationType === 'POP' && lastScrollPathRef.current === pathname) {
      return;
    }

    scrollToToolStart(targetId);
    lastScrollPathRef.current = pathname;
  }, [pathname, navigationType, targetId]);
}
