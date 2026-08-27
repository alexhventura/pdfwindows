import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './utils/collectionPolyfills';
import App from './App.tsx';
import './index.css';
import { enableDeferredStylesheet } from './utils/enableDeferredStylesheet';

enableDeferredStylesheet('google-fonts-inter');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  const registerSw = () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker is optional; fail silently in production.
    });
  };

  const w = window as Window &
    typeof globalThis & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };

  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(registerSw, { timeout: 4000 });
  } else {
    w.addEventListener('load', registerSw, { once: true });
  }
}
