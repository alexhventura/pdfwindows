import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { LogoImage } from './LogoImage';

export function SiteHeader() {
  const { lang, setLang } = useLanguage();
  const lp = useLocalizedPath();

  return (
    <header className="header-glass w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link to={lp('/')} className="flex items-center gap-3 select-none min-w-0 group">
          <LogoImage
            size={40}
            className="w-10 h-10 rounded-2xl shadow-md shrink-0 ring-1 ring-white/80 group-hover:scale-[1.03] transition-transform duration-300"
          />
          <span className="font-bold text-[17px] sm:text-lg tracking-tight text-slate-900 leading-none min-w-0">
            PDF <span className="text-orange-500">WINDOWS</span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-white/50 border border-slate-200/60 backdrop-blur-sm shrink-0">
          {(['pt', 'en', 'es'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                lang === code
                  ? 'bg-white text-blue-800 shadow-sm border border-blue-100/80'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
