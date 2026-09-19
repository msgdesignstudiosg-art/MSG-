import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

async function mount() {
  const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin';
  const { default: Page } = isAdmin
    ? await import('./Admin.tsx')
    : await import('./App.tsx');
  createRoot(document.getElementById('root')!).render(<StrictMode><Page /></StrictMode>);
}
mount();
