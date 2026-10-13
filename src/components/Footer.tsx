import React from 'react';
import { Heart, Sparkles, Share2, Users, Settings } from 'lucide-react';
import { EventDetails } from '../types';

interface FooterProps {
  details: EventDetails;
  onOpenGuestList: () => void;
  onOpenEditEvent: () => void;
}

export const Footer: React.FC<FooterProps> = ({ details, onOpenGuestList, onOpenEditEvent }) => {
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invitación a ${details.celebrationType} de ${details.celebrantName}`,
        text: `¡Te invito a celebrar juntos este momento tan especial! Confirmá tu asistencia en este enlace.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de la invitación copiado al portapapeles!');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#061D60] to-[#04123E] text-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#C7CCD5] border border-white/20 animate-float">
          <Heart className="w-5 h-5 fill-white/20 text-white" />
        </div>

        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {details.celebrantName}
        </h3>

        <p className="font-script text-2xl sm:text-3xl text-[#C7CCD5]">
          Gracias por ser parte de mi historia
        </p>

        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          Cada momento vivido es un tesoro, y compartirlo con vos es mi mayor alegría. ¡Te espero para brindar y bailar!
        </p>

        {/* Action icons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleShareApp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir Invitación</span>
          </button>

          <button
            onClick={onOpenGuestList}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#C7CCD5]" />
            <span>Panel de Anfitrión</span>
          </button>

          <button
            onClick={onOpenEditEvent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-[#C7CCD5]" />
            <span>Editar Datos</span>
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C7CCD5]/70 gap-3">
          <span>{details.celebrationType} • {details.venueCity}</span>
          <span className="flex items-center gap-1">
            Diseñado con <Sparkles className="w-3 h-3 text-[#D4AF37]" /> para una noche inolvidable
          </span>
        </div>
      </div>
    </footer>
  );
};
