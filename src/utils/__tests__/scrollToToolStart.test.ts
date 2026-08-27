import { describe, expect, it } from 'vitest';
import {
  shouldAutoScrollToTool,
  TOOL_UPLOAD_SELECTOR,
  workspaceHasLoadingFallback,
} from '../scrollToToolStart';

describe('shouldAutoScrollToTool', () => {
  it('scrolls on push and replace navigation', () => {
    expect(
      shouldAutoScrollToTool({
        navigationType: 'PUSH',
        popStatePending: false,
        backForwardCache: false,
      })
    ).toBe(true);

    expect(
      shouldAutoScrollToTool({
        navigationType: 'REPLACE',
        popStatePending: false,
        backForwardCache: false,
      })
    ).toBe(true);
  });

  it('does not scroll on browser back or bfcache restore', () => {
    expect(
      shouldAutoScrollToTool({
        navigationType: 'POP',
        popStatePending: true,
        backForwardCache: false,
        performanceNavType: 'navigate',
      })
    ).toBe(false);

    expect(
      shouldAutoScrollToTool({
        navigationType: 'POP',
        popStatePending: false,
        backForwardCache: true,
        performanceNavType: 'navigate',
      })
    ).toBe(false);

    expect(
      shouldAutoScrollToTool({
        navigationType: 'POP',
        popStatePending: false,
        backForwardCache: false,
        performanceNavType: 'back_forward',
      })
    ).toBe(false);
  });

  it('scrolls on direct entry and reload (router POP + navigate/reload)', () => {
    expect(
      shouldAutoScrollToTool({
        navigationType: 'POP',
        popStatePending: false,
        backForwardCache: false,
        performanceNavType: 'navigate',
      })
    ).toBe(true);

    expect(
      shouldAutoScrollToTool({
        navigationType: 'POP',
        popStatePending: false,
        backForwardCache: false,
        performanceNavType: 'reload',
      })
    ).toBe(true);
  });
});

describe('tool upload scroll target', () => {
  it('uses a stable dropzone selector', () => {
    expect(TOOL_UPLOAD_SELECTOR).toBe('[data-tool-upload]');
  });

  it('treats a missing node as not loading', () => {
    expect(workspaceHasLoadingFallback(null)).toBe(false);
  });
});
