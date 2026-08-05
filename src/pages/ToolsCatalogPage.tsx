import { Navigate } from 'react-router-dom';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

/**
 * Legacy catalog hub URLs. Prefer HTTP 301 via Vercel (tools/ferramentas/herramientas → locale home).
 * Client Navigate remains as SPA fallback only.
 */
export function ToolsCatalogPage() {
  const lp = useLocalizedPath();
  return <Navigate to={lp('/')} replace />;
}
