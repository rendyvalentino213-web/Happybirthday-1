import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X } from 'lucide-react';

export function PasswordModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Password default yang bisa Anda ubah kodenya
  const SECRET_PASSWORD = "1234"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-sm p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-full mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-xl font-bold text-white">Akses Terkunci</h2>
            <p className="text-sm text-slate-400 text-center mt-1">Masukkan password untuk masuk ke menu pengaturan.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Masukkan Password"
                className={`w-full px-4 py-3 bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white focus:ring-2 focus:ring-pink-500 outline-none text-center tracking-widest`}
                autoFocus
              />
              {error && <p className="text-red-400 text-xs text-center mt-2">Password salah, silakan coba lagi.</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-pink-500/25"
            >
              Buka Pengaturan
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
