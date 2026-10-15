import React from 'react';
import { EventDetails } from '../types';

interface DressCodeSectionProps {
  dressCode: EventDetails['dressCode'];
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ dressCode }) => {
  // Only shades of blue as explicitly requested
  const bluePalette = [
    { hex: '#0833A2', name: 'Azul Fiesta' },
    { hex: '#061D60', name: 'Azul Marino' },
    { hex: '#1E3A8A', name: 'Azul Noche' },
    { hex: '#2563EB', name: 'Azul Zafiro' },
    { hex: '#3B82F6', name: 'Azul Cielo' },
  ];

  // Replace any occurrence of Cocktail with Semiformal
  const displayTitle = dressCode.title?.includes('Cocktail')
    ? dressCode.title.replace(/Cocktail/gi, 'Semiformal')
    : (dressCode.title || 'Semiformal');

  return (
    <section id="dress-code" className="py-16 sm:py-20 px-4 bg-[#F3F5F9] text-[#061D60] relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Animated icon: Vestido y Corbata (monolínea rounded) */}
        <div className="inline-flex items-center justify-center text-[#0833A2] mb-4 select-none animate-crown">
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#0833A2]"
            viewBox="0 0 52 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Vestido elegante (izquierda) */}
            <path d="M14 9 L18 9 L20 18 L24 38 L8 38 L12 18 Z" />
            <path d="M14 9 C14 12 18 12 18 9" />
            <path d="M11 18 Q16 20 21 18" />

            {/* Corbata elegante (derecha) */}
            <path d="M35 9 L39 9 L40 13 L34 13 Z" />
            <path d="M35 13 L33 26 L37 38 L41 26 L39 13 Z" />
          </svg>
        </div>

        {/* Heading: VESTIMENTA */}
        <h3
          className="text-2xl sm:text-3xl font-normal text-[#061D60] tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          VESTIMENTA
        </h3>

        {/* Dress code title & description in blue/gray typography */}
        <div
          className="text-base sm:text-lg leading-relaxed font-light max-w-lg mx-auto"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <p className="font-medium text-[#0833A2] text-lg sm:text-xl">
            {displayTitle}
          </p>
          {dressCode.description && (
            <p className="text-gray-600 text-sm sm:text-base pt-1.5 leading-relaxed">
              {dressCode.description}
            </p>
          )}
        </div>

        {/* Suggested Color Palette: Solo tonos de azul */}
        <div className="mt-7 pt-5 border-t border-[#C7CCD5]/60 w-full max-w-md flex flex-col items-center">
          <span
            className="text-xs uppercase tracking-widest text-gray-500 mb-3.5 font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Colores sugeridos
          </span>

          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {bluePalette.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-sm border-2 border-white group-hover:scale-110 group-hover:shadow-md transition-all cursor-default"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[10px] text-gray-500 font-normal">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
