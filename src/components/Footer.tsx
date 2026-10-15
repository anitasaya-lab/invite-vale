import React from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';
import { EventDetails } from '../types';

interface FooterProps {
  details: EventDetails;
  onOpenGuestList: () => void;
  onOpenEditEvent: () => void;
}

export const Footer: React.FC<FooterProps> = ({ details, onOpenGuestList }) => {
  return (
    <footer className="bg-gradient-to-b from-[#061D60] to-[#04123E] text-white py-16 px-4 relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10 space-y-5">
        {/* Animated Heart Icon (same treatment, rounded monolínea) */}
        <div className="inline-flex items-center justify-center text-[#C7CCD5] mb-1 select-none animate-crown">
          <Heart className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </div>

        <h3
          className="text-3xl sm:text-4xl font-normal text-white tracking-wide"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {details.celebrantName}
        </h3>

        <p className="font-script text-2xl sm:text-3xl text-[#C7CCD5]">
          Gracias por ser parte de mi historia
        </p>

        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Cada momento vivido es un tesoro, y compartirlo con vos es mi mayor alegría. ¡Te espero para brindar y bailar!
        </p>

        {/* Host Guest List Access (hidden as requested) */}
        <div className="hidden">
          <button
            onClick={onOpenGuestList}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium rounded-xl border border-white/15 transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#C7CCD5]" />
            <span>Lista de Invitados</span>
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C7CCD5]/70 gap-2">
          <span>{details.celebrationType} • Montevideo, Uruguay</span>
          <span className="flex items-center gap-1">
            Diseñado con <Sparkles className="w-3 h-3 text-[#D4AF37]" /> para una noche inolvidable
          </span>
        </div>
      </div>
    </footer>
  );
};
