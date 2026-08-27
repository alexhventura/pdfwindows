export const TOOL_START_ID = 'tool-start';
export const TOOL_CATALOG_ID = 'tool-catalog';
/** File-upload dropzone — used to find the workspace card that also holds the tool title. */
export const TOOL_UPLOAD_SELECTOR = '[data-tool-upload]';
/** Outer tool card (title + dropzone). Scroll here so the heading stays on screen. */
export const WORKSPACE_PANEL_SELECTOR = '.workspace-panel';

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

/** True while the lazy workbench is still showing the workspace spinner. */
export function workspaceHasLoadingFallback(root: Element | null): boolean {
  return !!root?.querySelector('[role="status"][aria-busy="true"]');
}

function workspaceCardFrom(el: HTMLElement): HTMLElement {
  return el.closest<HTMLElement>(WORKSPACE_PANEL_SELECTOR) ?? el;
}

export function resolveToolScrollElement(fallbackId = TOOL_START_ID): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const upload = document.querySelector<HTMLElement>(TOOL_UPLOAD_SELECTOR);
  if (upload) return workspaceCardFrom(upload);
  const start = document.getElementById(fallbackId);
  if (!start || workspaceHasLoadingFallback(start)) return null;
  const panel = start.querySelector<HTMLElement>(WORKSPACE_PANEL_SELECTOR);
  if (panel && !workspaceHasLoadingFallback(panel)) return panel;
  return start;
}

/** Upload block is ready, or the workspace finished loading without a dropzone. */
export function hasSettledToolScrollTarget(fallbackId = TOOL_START_ID): boolean {
  if (typeof document === 'undefined') return false;
  if (document.querySelector(TOOL_UPLOAD_SELECTOR)) return true;
  const start = document.getElementById(fallbackId);
  return !!start && !workspaceHasLoadingFallback(start);
}

export function getAnchorScrollTop(el: Element): number {
  const offset = measureSiteHeaderOffset();
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
}

export function getToolStartScrollTop(targetId = TOOL_START_ID): number | null {
  const el =
    targetId === TOOL_START_ID
      ? resolveToolScrollElement(targetId)
      : typeof document === 'undefined'
        ? null
        : document.getElementById(targetId);
  if (!el) return null;
  return getAnchorScrollTop(el);
}

export function scrollToAnchor(
  targetId: string,
  options: { behavior?: ScrollBehavior } = {}
): boolean {
  const top = getToolStartScrollTop(targetId);
  if (top === null) return false;

  const behavior = options.behavior ?? 'smooth';

  try {
    window.scrollTo({ top, left: 0, behavior });
  } catch {
    window.scrollTo(0, top);
  }
  return true;
}

export function scrollToToolStart(targetId = TOOL_START_ID): boolean {
  return scrollToAnchor(targetId, { behavior: 'instant' });
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
