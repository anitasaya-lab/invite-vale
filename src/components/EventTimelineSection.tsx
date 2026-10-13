import React from 'react';
import { GlassWater, Sparkles, PartyPopper, CalendarClock } from 'lucide-react';
import { EventDetails } from '../types';

interface EventTimelineSectionProps {
  details: EventDetails;
}

export const EventTimelineSection: React.FC<EventTimelineSectionProps> = ({ details }) => {
  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
          <CalendarClock className="w-4 h-4 text-[#0833A2]" />
          <span>Cronograma de la Noche</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
          La Celebración
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Preparate para vivir una velada soñada llena de emociones, risas y baile.
        </p>

        {/* Timeline cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          {/* Card 1: Recepción */}
          <div className="relative bg-[#F3F5F9] rounded-3xl p-7 border-2 border-[#C7CCD5]/70 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0833A2] to-[#061D60] text-white flex items-center justify-center mb-6 shadow-md shadow-[#0833A2]/20 group-hover:scale-110 transition-transform">
              <GlassWater className="w-7 h-7 text-[#C7CCD5] animate-gentle-bounce" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#0833A2] bg-white px-3 py-1 rounded-full border border-[#C7CCD5]/60 shadow-xs">
              Puntualidad
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#061D60] mt-3">
              Recepción & Brindis
            </h3>

            <p className="text-base font-semibold text-[#0833A2] mt-1">
              {details.ceremonyTime || '21:00 hs'}
            </p>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Te esperamos para empezar a disfrutar con una copa de bienvenida, finger food y las primeras fotos de la noche.
            </p>
          </div>

          {/* Card 2: Fiesta & Pista */}
          <div className="relative bg-[#F3F5F9] rounded-3xl p-7 border-2 border-[#C7CCD5]/70 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0833A2] to-[#061D60] text-white flex items-center justify-center mb-6 shadow-md shadow-[#0833A2]/20 group-hover:scale-110 transition-transform">
              <PartyPopper className="w-7 h-7 text-[#C7CCD5] animate-gentle-bounce" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#0833A2] bg-white px-3 py-1 rounded-full border border-[#C7CCD5]/60 shadow-xs">
              ¡A bailar!
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#061D60] mt-3">
              Cena & Fiesta
            </h3>

            <p className="text-base font-semibold text-[#0833A2] mt-1">
              {details.partyTime}
            </p>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Plato principal, mesa dulce, vals, tanda de baile temática con cotillón y mucha música hasta que salga el sol.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
