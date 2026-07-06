import { Navigate } from 'react-router-dom';

/** Legacy catalog URL — same experience as home */
export function ToolsCatalogPage() {
  return <Navigate to="/" replace />;
}
