import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { encodeConfig } from '../utils';

export function EditModal({
  currentConfig,
  onClose,
  onSave,
}: {
  currentConfig: BirthdayConfig;
  onClose: () => void;
  onSave: (config: BirthdayConfig) => void;
}) {
  const [config, setConfig] = useState<BirthdayConfig>(currentConfig);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    const hash = encodeConfig(config);
    const url = new URL(window.location.href);
    url.searchParams.set('data', hash);
    window.history.pushState({}, '', url.toString());
    onSave(config);
    onClose();
  };

  const handleCopyLink = () => {
    const hash = encodeConfig(config);
    const url = new URL(window.location.href);
    url.searchParams.set('data', hash);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-6">Edit Ucapan</h3>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Kode Masuk (Passcode 4 Digit)</label>
            <input
              type="text"
              maxLength={4}
              pattern="[0-9]*"
              value={config.passcode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setConfig({ ...config, passcode: val });
              }}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="e.g. 1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Judul Ucapan</label>
            <input
              type="text"
              value={config.finalTitle}
              onChange={(e) => setConfig({ ...config, finalTitle: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Isi Pesan Romantis (Animasi Ketik)</label>
            <textarea
              rows={4}
              value={config.finalMessage}
              onChange={(e) => setConfig({ ...config, finalMessage: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-pink-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={handleSave}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              Simpan & Mainkan
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700 active:scale-95"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Link Berhasil Disalin!' : 'Salin Link untuk Dibagikan'}
            </button>
            <p className="text-xs text-center text-slate-500 mt-2">
              Salin link untuk membagikan ucapan ini ke orang spesial. Data ucapan akan tersimpan di dalam link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
