import React, { useState } from 'react';
import { X, Copy, Check, Gift, Landmark, CreditCard } from 'lucide-react';
import { EventDetails } from '../types';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankDetails: EventDetails['bankDetails'];
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  const [copiedCurrent, setCopiedCurrent] = useState(false);
  const [copiedPrevious, setCopiedPrevious] = useState(false);

  if (!isOpen) return null;

  const currentAccount = 'CA 001253810-00001';
  const previousAccount = 'CA 182-0166382';

  const handleCopy = (text: string, type: 'current' | 'previous') => {
    navigator.clipboard.writeText(text);
    if (type === 'current') {
      setCopiedCurrent(true);
      setTimeout(() => setCopiedCurrent(false), 2000);
    } else {
      setCopiedPrevious(true);
      setTimeout(() => setCopiedPrevious(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061D60]/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#C7CCD5]/60 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-[#061D60] text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mx-auto w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-2.5">
            <Gift className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>

          <h3
            className="text-xl sm:text-2xl font-normal tracking-wide text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Datos Bancarios
          </h3>
          <p className="text-xs text-[#C7CCD5] mt-1 font-light">
            Para transferencias desde BROU u otros bancos
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {/* Titular y Banco */}
          <div className="bg-[#F3F5F9] rounded-2xl p-4 border border-[#C7CCD5]/60 flex items-center gap-3.5">
            <div className="p-2.5 bg-white rounded-xl shadow-xs text-[#0833A2]">
              <Landmark className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Titular de cuenta</p>
              <p className="text-base font-bold text-[#061D60]">Erika Sanchez</p>
              <p className="text-xs text-[#0833A2] font-semibold mt-0.5">Caja de ahorro BROU</p>
            </div>
          </div>

          {/* Cuenta Principal */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#0833A2]/25 shadow-xs hover:border-[#0833A2] transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0833A2] bg-[#0833A2]/10 px-2.5 py-0.5 rounded-full">
                  Cuenta actual
                </span>
                <p className="text-base sm:text-lg font-mono font-bold text-[#061D60] mt-1.5 select-all">
                  {currentAccount}
                </p>
              </div>

              <button
                onClick={() => handleCopy(currentAccount, 'current')}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer ${
                  copiedCurrent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0833A2] hover:bg-[#061D60] text-white'
                }`}
              >
                {copiedCurrent ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cuenta Anterior (un poco más chico) */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#C7CCD5]/70 shadow-xs hover:border-[#0833A2]/50 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  CUENTA ANTERIOR
                </span>
                <p className="text-sm font-mono font-medium text-gray-700 mt-1 select-all">
                  {previousAccount}
                </p>
              </div>

              <button
                onClick={() => handleCopy(previousAccount, 'previous')}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-xs active:scale-95 cursor-pointer ${
                  copiedPrevious
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F3F5F9] hover:bg-[#C7CCD5]/40 text-[#061D60] border border-[#C7CCD5]'
                }`}
              >
                {copiedPrevious ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3F5F9] text-center border-t border-gray-100">
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            ¡Muchas gracias por acompañar a Valentina en sus 15 años!
          </p>
        </div>
      </div>
    </div>
  );
};
