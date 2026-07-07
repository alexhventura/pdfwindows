import { useState } from 'react';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';
import type { LanguageType } from '../../../types';
import { ModalHeader, inputClass, modalT } from '../shared';

export default function QrCodeSuiteTool({ onClose, lang }: { onClose: () => void; lang: LanguageType }) {
  const t = modalT[lang];
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQR = async () => {
    if (!text) return;
    setQrUrl(await QRCode.toDataURL(text, { width: 400, margin: 2 }));
  };

  return (
    <>
      <ModalHeader title={t.qrTitle} onClose={onClose} closeLabel={t.close} />
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          <input
            type="text"
            className={`${inputClass} flex-1`}
            placeholder={t.qrPlaceholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" onClick={generateQR} className="btn-primary px-6 py-2.5 text-xs shrink-0">
            {t.generate}
          </button>
        </div>
        {qrUrl && (
          <div className="flex flex-col items-center gap-4">
            <img src={qrUrl} alt="QR Code" width={192} height={192} className="w-48 h-48 border-4 border-slate-100 rounded-2xl" />
            <a href={qrUrl} download="qrcode.png" className="flex items-center gap-2 text-xs font-bold text-win-blue hover:underline">
              <Download size={14} /> {t.download} QR Code
            </a>
          </div>
        )}
      </div>
    </>
  );
}
