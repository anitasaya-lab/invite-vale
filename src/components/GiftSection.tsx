import React from 'react';
import { Gift, Sparkles, CreditCard } from 'lucide-react';
import { EventDetails } from '../types';

interface GiftSectionProps {
  bankDetails: EventDetails['bankDetails'];
  onOpenGiftModal: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ bankDetails, onOpenGiftModal }) => {
  return (
    <section id="regalo" className="py-20 px-4 bg-[#F3F5F9] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
          <Gift className="w-4 h-4 text-[#0833A2]" />
          <span>Muestra de Cariño</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
          Regalos & Obsequios
        </h2>

        {/* Gift Card */}
        <div className="mt-8 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#C7CCD5]/70 shadow-xl max-w-xl mx-auto relative group hover:border-[#0833A2]/50 transition-colors">
          {/* Animated floating Gift icon */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0833A2] to-[#061D60] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#0833A2]/25 group-hover:scale-110 transition-transform animate-gentle-bounce">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#061D60]">
            El mejor regalo es tu presencia
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            {bankDetails.message || 'Tu compañía y alegría en este día tan especial es todo lo que necesito. Pero si deseás hacerme un presente, podés colaborar a través de transferencia bancaria.'}
          </p>

          <div className="mt-8">
            <button
              onClick={onOpenGiftModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0833A2] to-[#061D60] hover:brightness-110 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#0833A2]/30 active:scale-95 transition-all cursor-pointer group/btn"
            >
              <CreditCard className="w-5 h-5 text-[#C7CCD5] group-hover/btn:rotate-12 transition-transform" />
              <span>Ver datos de la cuenta</span>
              <Sparkles className="w-4 h-4 text-[#C7CCD5]" />
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            * Al hacer clic se abrirá una ventana emergente con el CBU, Alias y datos del titular para copiar fácilmente.
          </p>
        </div>
      </div>
    </section>
  );
};
