import { useState, useEffect, useCallback } from 'react';
import { PageRoute, ROUTE_MAP } from '../types/routes';

function parseHash(hash: string): PageRoute {
  const cleaned = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (!cleaned || cleaned === '' || cleaned === 'home') return 'home';
  if (cleaned in ROUTE_MAP) return cleaned as PageRoute;

  // Aliases
  if (cleaned === 'text') return 'text-to-favicon';
  if (cleaned === 'image') return 'image-to-favicon';
  if (cleaned === 'emoji') return 'emoji-to-favicon';
  if (cleaned === 'svg') return 'svg-to-favicon';
  if (cleaned === 'checker') return 'favicon-checker';
  if (cleaned === 'docs') return 'documentation';

  return 'home';
}

export function useRouter() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    return parseHash(window.location.hash);
  });

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseHash(window.location.hash);
      setCurrentRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title
  useEffect(() => {
    const routeInfo = ROUTE_MAP[currentRoute];
    if (routeInfo) {
      document.title = routeInfo.metaTitle;
    }
  }, [currentRoute]);

  const navigate = useCallback((route: PageRoute) => {
    const targetHash = route === 'home' ? '#/' : `#/${route}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return {
    currentRoute,
    routeInfo: ROUTE_MAP[currentRoute],
    navigate,
  };
}
