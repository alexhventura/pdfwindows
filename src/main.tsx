import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
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

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(registerSw, { timeout: 4000 });
  } else {
    window.addEventListener('load', registerSw, { once: true });
  }
}
