import { Navigate } from 'react-router-dom';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

/** Legacy catalog URL — same experience as home */
export function ToolsCatalogPage() {
  const lp = useLocalizedPath();
  return <Navigate to={lp('/')} replace />;
}
