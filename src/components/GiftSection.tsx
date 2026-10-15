import React from 'react';
import { Gift, CreditCard } from 'lucide-react';
import { EventDetails } from '../types';

interface GiftSectionProps {
  bankDetails: EventDetails['bankDetails'];
  onOpenGiftModal: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ bankDetails, onOpenGiftModal }) => {
  return (
    <section id="regalo" className="py-16 sm:py-20 px-4 bg-[#F3F5F9] text-[#061D60] relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Animated Gift Icon (rounded monolínea) */}
        <div className="inline-flex items-center justify-center text-[#0833A2] mb-4 select-none animate-crown">
          <Gift className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </div>

        {/* Heading: El mejor regalo es tu presencia */}
        <h3
          className="text-2xl sm:text-3xl font-normal text-[#061D60] tracking-wide mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          El mejor regalo es tu presencia
        </h3>

        {/* Paragraph */}
        <p
          className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8 font-light"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {bankDetails.message || 'Tu presencia y cariño en este día tan especial es todo lo que necesito. Pero si deseás hacerme un presente, podés colaborar a través de transferencia bancaria.'}
        </p>

        {/* Action Button */}
        <div>
          <button
            onClick={onOpenGiftModal}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#0833A2] hover:bg-[#061D60] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <CreditCard className="w-4 h-4" strokeWidth={1.5} />
            <span>DATOS BANCARIOS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
