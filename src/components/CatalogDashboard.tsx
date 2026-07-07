import { ToolCardGrid } from './ToolCardGrid';

interface CatalogDashboardProps {
  heading: string;
  intro: string;
}

export function CatalogDashboard({ heading, intro }: CatalogDashboardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <header className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient-brand mb-3">{heading}</h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">{intro}</p>
        <img
          src="/logo-banner.png"
          alt=""
          role="presentation"
          className="w-full max-w-2xl mx-auto h-auto object-contain drop-shadow-sm mt-8"
          width={640}
          height={160}
          loading="eager"
          decoding="async"
        />
      </header>

      <ToolCardGrid />
    </div>
  );
}
