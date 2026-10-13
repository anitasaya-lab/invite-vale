import React, { useState } from 'react';
import { X, Copy, Check, Gift, Landmark, CreditCard, Sparkles, HeartHandshake } from 'lucide-react';
import { EventDetails } from '../types';
import { musicPlayer } from '../utils/audioPlayer';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankDetails: EventDetails['bankDetails'];
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose, bankDetails }) => {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'alias' | 'cbu') => {
    navigator.clipboard.writeText(text);
    musicPlayer.playCelebrationChime();
    if (type === 'alias') {
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2200);
    } else {
      setCopiedCbu(true);
      setTimeout(() => setCopiedCbu(false), 2200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061D60]/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#C7CCD5]/50 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#061D60] via-[#0833A2] to-[#061D60] text-white p-6 relative overflow-hidden text-center">
          <div className="absolute top-2 right-2">
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mx-auto w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-3 shadow-inner border border-white/25 animate-float">
            <Gift className="w-8 h-8 text-white drop-shadow" />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-[#C7CCD5]">
            Muestra de cariño
          </p>
          <h3 className="text-2xl font-bold font-serif mt-1">
            Datos para el Regalo
          </h3>
          <p className="text-xs text-[#F3F5F9]/90 mt-2 max-w-sm mx-auto leading-relaxed">
            {bankDetails.message || 'Tu presencia es nuestro mayor deseo, pero si deseás hacernos un obsequio, te dejamos los datos de la cuenta.'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Bank Info summary */}
          <div className="bg-[#F3F5F9] rounded-2xl p-4 border border-[#C7CCD5]/60 flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-xs text-[#0833A2]">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Entidad / Billetera</p>
              <p className="text-sm font-bold text-[#061D60]">{bankDetails.bankName}</p>
              <p className="text-xs text-gray-500">Titular: <span className="font-semibold text-gray-700">{bankDetails.holder}</span></p>
            </div>
          </div>

          {/* Alias Box */}
          <div className="bg-white rounded-2xl p-4 border-2 border-[#0833A2]/25 shadow-xs relative hover:border-[#0833A2] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0833A2] bg-[#F3F5F9] px-2.5 py-0.5 rounded-full">
                  Alias de Cuenta
                </span>
                <p className="text-lg sm:text-xl font-mono font-bold text-[#061D60] mt-1.5 select-all tracking-wide">
                  {bankDetails.alias}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bankDetails.alias, 'alias')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                  copiedAlias 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#0833A2] hover:bg-[#061D60] text-white'
                }`}
              >
                {copiedAlias ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Alias</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CBU / CVU Box */}
          <div className="bg-white rounded-2xl p-4 border border-[#C7CCD5] shadow-xs relative hover:border-[#0833A2] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-[#F3F5F9] px-2.5 py-0.5 rounded-full">
                  CBU / CVU (22 dígitos)
                </span>
                <p className="text-xs sm:text-sm font-mono font-semibold text-gray-800 mt-1.5 select-all break-all">
                  {bankDetails.cbu}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bankDetails.cbu, 'cbu')}
                className={`shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                  copiedCbu 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#F3F5F9] hover:bg-[#C7CCD5]/40 text-[#061D60] border border-[#C7CCD5]'
                }`}
              >
                {copiedCbu ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#0833A2]" />
                    <span>Copiar CBU</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Account Details Extra */}
          <div className="grid grid-cols-2 gap-2.5 text-xs text-gray-600 bg-[#F3F5F9]/80 p-3 rounded-xl border border-[#C7CCD5]/40">
            <div>
              <p className="text-gray-400 font-medium">Tipo de cuenta</p>
              <p className="font-semibold text-[#061D60]">{bankDetails.accountType}</p>
            </div>
            {bankDetails.cuil && (
              <div>
                <p className="text-gray-400 font-medium">CUIT / CUIL</p>
                <p className="font-semibold text-[#061D60]">{bankDetails.cuil}</p>
              </div>
            )}
          </div>

          {/* In-person envelope alternative */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Opción tradicional:</strong> También dispondremos de un buzón de sobres y dedicatorias el día del evento en la recepción del salón.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-[#C7CCD5]/40 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0833A2] hover:bg-[#061D60] text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            Entendido, ¡muchas gracias!
          </button>
        </div>
      </div>
    </div>
  );
};
