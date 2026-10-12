import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Jika sudah terinstall atau pengguna menutup banner di sesi ini, jangan tampilkan
  if (isInstalled || isDismissed) {
    return null;
  }

  // Jika bisa di-install langsung (Chromium / Android / Desktop Chrome)
  if (isInstallable) {
    return (
      <div className="p-4 bg-gradient-to-r from-[#006837] to-[#004e29] text-white rounded-2xl shadow-xl border border-[#00A859]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold truncate">Pasang Aplikasi Kareba'Ta</h4>
            <p className="text-[11px] text-white/80 truncate">Akses cepat & hemat kuota di layar utama HP</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={install}
            className="px-3 py-1.5 rounded-lg bg-white text-[#006837] text-xs font-bold hover:bg-stone-100 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Pasang
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Tutup"
            className="w-7 h-7 rounded-lg text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Jika diakses lewat iOS Safari
  if (isIOS) {
    return (
      <>
        <div className="p-4 bg-gradient-to-r from-[#006837] to-[#004e29] text-white rounded-2xl shadow-xl border border-[#00A859]/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold truncate">Pasang di iPhone / iPad</h4>
              <p className="text-[11px] text-white/80 truncate">Tambahkan ke Layar Utama</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowIOSGuide(true)}
              className="px-3 py-1.5 rounded-lg bg-white text-[#006837] text-xs font-bold hover:bg-stone-100 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              Panduan
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              aria-label="Tutup"
              className="w-7 h-7 rounded-lg text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-stone-900">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#006837]" />
                  Pasang di iPhone/iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-stone-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#006837]/15 text-[#006837] font-bold flex items-center justify-center shrink-0">1</span>
                  <p>Tekan tombol <strong>Bagikan / Share</strong> (ikon kotak tanda panah ke atas) di bilah navigasi Safari bawah.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#006837]/15 text-[#006837] font-bold flex items-center justify-center shrink-0">2</span>
                  <p>Gulir ke bawah dan pilih opsi <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#006837]/15 text-[#006837] font-bold flex items-center justify-center shrink-0">3</span>
                  <p>Tekan <strong>Tambah (Add)</strong> di pojok kanan atas. Ikon Kareba'Ta akan muncul di layar HP Anda!</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full py-2.5 rounded-xl bg-[#006837] text-white text-xs font-bold hover:bg-[#00542c] transition-colors cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
