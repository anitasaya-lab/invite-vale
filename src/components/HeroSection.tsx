import React from 'react';
import { ChevronDown } from 'lucide-react';
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
      {/* Background: md-samir-sayek-r_GldpBin80-unsplash.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/md-samir-sayek-r_GldpBin80-unsplash.jpg')",
        }}
      />

      {/* Centerpiece: valen.png */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl px-2 sm:px-4 my-8 sm:my-12 select-none flex items-center justify-center">
          <img
            src="/valen.png"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/valen-tag.svg')) {
                target.src = '/valen-tag.svg';
              }
            }}
            alt={`${details.celebrantName} - ${details.celebrationType}`}
            className="w-full h-auto max-h-[300px] sm:max-h-[380px] object-contain drop-shadow-[0_4px_25px_rgba(255,255,255,0.45)] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] filter"
          />
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
