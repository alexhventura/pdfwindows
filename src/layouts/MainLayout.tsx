import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { GlobalFaq } from '../components/GlobalFaq';

export function MainLayout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      <SiteHeader />
      <Outlet />
      <GlobalFaq />
      <SiteFooter />
    </div>
  );
}
