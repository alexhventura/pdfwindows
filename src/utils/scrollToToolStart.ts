export const TOOL_START_ID = 'tool-start';

const HEADER_SELECTOR = 'header.header-glass';
const SCROLL_CUSHION_PX = 8;

/** Visible sticky header + iOS safe area + small breathing room. */
export function measureSiteHeaderOffset(): number {
  if (typeof window === 'undefined') return 0;

  const header = document.querySelector(HEADER_SELECTOR);
  const headerHeight = header?.getBoundingClientRect().height ?? 0;

  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:0;height:env(safe-area-inset-top,0px);pointer-events:none;visibility:hidden;';
  document.documentElement.appendChild(probe);
  const safeTop = probe.getBoundingClientRect().height;
  probe.remove();

  return headerHeight + safeTop + SCROLL_CUSHION_PX;
}

export function getToolStartScrollTop(targetId = TOOL_START_ID): number | null {
  const el = document.getElementById(targetId);
  if (!el) return null;
  const offset = measureSiteHeaderOffset();
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
}

export function scrollToToolStart(targetId = TOOL_START_ID): boolean {
  const top = getToolStartScrollTop(targetId);
  if (top === null) return false;

  try {
    window.scrollTo({ top, left: 0, behavior: 'instant' });
  } catch {
    window.scrollTo(0, top);
  }
  return true;
}

export type RouterNavigationType = 'POP' | 'PUSH' | 'REPLACE';

export function getPerformanceNavigationType(): string | undefined {
  if (typeof performance === 'undefined') return undefined;
  const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return entry?.type;
}

/**
 * Decide whether the tool workspace should be scrolled into view.
 * POP is used for browser back/forward and for React Router's initial entry.
 */
export function shouldAutoScrollToTool(options: {
  navigationType: RouterNavigationType;
  popStatePending: boolean;
  backForwardCache: boolean;
  performanceNavType?: string;
}): boolean {
  if (options.popStatePending || options.backForwardCache) {
    return false;
  }

  if (options.navigationType === 'PUSH' || options.navigationType === 'REPLACE') {
    return true;
  }

  if (options.navigationType === 'POP') {
    if (options.performanceNavType === 'back_forward') {
      return false;
    }
    return options.performanceNavType === 'navigate' || options.performanceNavType === 'reload';
  }

  return false;
}
