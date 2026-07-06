import { Outlet } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PrivacyPledge } from '../components/PrivacyPledge';
import { GlobalFaq } from '../components/GlobalFaq';
import { useLanguage } from '../context/LanguageContext';

export function MainLayout() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      <SiteHeader />
      <PrivacyPledge lang={lang} variant="banner" />
      <Outlet />
      <GlobalFaq />
      <SiteFooter />
    </div>
  );
}
