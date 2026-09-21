import { useEffect, useRef } from 'react';
import template from './studio/template.html?raw';
import { initializeStudio } from './studio/runtime.js';
import './studio/studio.css';
import './studio/exhibition.css';

export default function App() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const studio = initializeStudio(host.current!);
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      import('./studio/portfolio-source').then(({ subscribeToPortfolio }) => {
        if (!disposed) unsubscribe = subscribeToPortfolio(studio.updateProjects);
      }).catch(() => { /* The bundled portfolio stays available offline. */ });
    }
    return () => { disposed = true; unsubscribe?.(); studio.destroy(); };
  }, []);
  return <div ref={host} dangerouslySetInnerHTML={{ __html: template }} />;
}
