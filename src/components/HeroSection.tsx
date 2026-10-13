import React from 'react';
import { Calendar, MapPin, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { EventDetails } from '../types';

interface HeroSectionProps {
  details: EventDetails;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenRsvp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  details,
  isAudioPlaying,
  onToggleAudio,
}) => {
  // Format human-friendly date: e.g. "Sábado 21 de Noviembre, 2026"
  const dateObj = new Date(details.eventDate);
  const formattedDate = dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden bg-[#030d2a] text-white">
      {/* Background: aron-visuals-R49cUgaQ0mk-unsplash.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/aron-visuals-R49cUgaQ0mk-unsplash.jpg')",
        }}
      />

      {/* Atmospheric depth vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b22]/35 via-transparent to-[#020b22]/75 pointer-events-none" />

      {/* Floating Audio Control Button */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium text-white transition-all shadow-lg cursor-pointer"
          title={isAudioPlaying ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
        >
          {isAudioPlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <Volume2 className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline text-[#F3F5F9]">Música Activa</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#C7CCD5]" />
              <span className="hidden sm:inline text-[#C7CCD5]">Activar Música</span>
            </>
          )}
        </button>
      </div>

      {/* Centerpiece: Replaces Valentina & subtitle with valen-tag.svg */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl px-2 sm:px-4 my-8 sm:my-12 select-none flex items-center justify-center">
          <img
            src="/valen-tag.svg"
            alt={`${details.celebrantName} - ${details.celebrationType}`}
            className="w-full h-auto max-h-[280px] sm:max-h-[340px] object-contain drop-shadow-[0_4px_25px_rgba(255,255,255,0.45)] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] filter"
          />
        </div>

        {/* Date and Location pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white mt-2">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
            <Calendar className="w-4 h-4 text-[#C7CCD5]" />
            <span className="font-semibold">{capitalizedDate}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
            <MapPin className="w-4 h-4 text-[#C7CCD5]" />
            <span className="font-semibold">{details.venueName}</span>
          </div>
        </div>
      </div>

      {/* Down chevron */}
      <a
        href="#cuenta-regresiva"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce p-2"
        aria-label="Ir a cuenta regresiva"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
