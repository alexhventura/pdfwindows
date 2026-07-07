import { useState } from 'react';
import * as prettier from 'prettier/standalone';
import * as babelParser from 'prettier/plugins/babel';
import * as estreeParser from 'prettier/plugins/estree';
import * as htmlParser from 'prettier/plugins/html';
import * as cssParser from 'prettier/plugins/postcss';
import type { LanguageType } from '../../../types';
import { ModalHeader, modalT } from '../shared';

export default function CodeCleanerSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const t = modalT[lang];
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'html' | 'css' | 'js'>('js');

  const processCode = async () => {
    try {
      const formatted = await prettier.format(code, {
        parser: language === 'js' ? 'babel' : language,
        plugins: [babelParser, estreeParser, htmlParser, cssParser],
        semi: true,
        singleQuote: true,
      });
      setCode(formatted);
    } catch {
      alert(t.formatError);
    }
  };

  return (
    <>
      <ModalHeader title={t.codeTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-6 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(['js', 'html', 'css'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLanguage(l)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${language === l ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <textarea
          className="w-full h-64 p-4 border border-slate-200 rounded-2xl text-xs font-mono bg-slate-900 text-indigo-300 outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="button"
          onClick={processCode}
          className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg"
        >
          {t.process}
        </button>
      </div>
    </>
  );
}
