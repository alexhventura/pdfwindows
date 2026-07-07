/** Activates a print-media stylesheet after load without inline onload handlers (CSP-safe). */
export function enableDeferredStylesheet(linkId: string): void {
  const link = document.getElementById(linkId);
  if (!(link instanceof HTMLLinkElement)) return;

  const activate = () => {
    link.media = 'all';
  };

  link.addEventListener('load', activate, { once: true });

  try {
    if (link.sheet) activate();
  } catch {
    // Cross-origin stylesheets may block sheet access until loaded.
  }
}
