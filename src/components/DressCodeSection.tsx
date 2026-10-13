import React from 'react';
import { Shirt, Sparkles, AlertCircle, Palette } from 'lucide-react';
import { EventDetails } from '../types';

interface DressCodeSectionProps {
  dressCode: EventDetails['dressCode'];
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ dressCode }) => {
  return (
    <section id="dress-code" className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
          <Shirt className="w-4 h-4 text-[#0833A2]" />
          <span>Código de Vestimenta</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
          Dress Code
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Queremos que te sientas cómodo, elegante y listo para disfrutar toda la noche.
        </p>

        {/* Central Dress Code Card */}
        <div className="mt-10 bg-[#F3F5F9] rounded-3xl p-8 sm:p-10 border-2 border-[#C7CCD5]/70 shadow-lg max-w-2xl mx-auto text-center relative overflow-hidden">
          {/* Subtle top shimmer glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0833A2] via-[#C7CCD5] to-[#061D60]" />

          {/* Animated Icon Avatar */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 border border-[#C7CCD5]/60 animate-gentle-bounce">
            <Shirt className="w-10 h-10 text-[#0833A2]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0833A2]">
            {dressCode.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed max-w-lg mx-auto">
            {dressCode.description}
          </p>

          {/* Suggested Color Palette */}
          <div className="mt-8 pt-6 border-t border-[#C7CCD5]/50">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#061D60] mb-4">
              <Palette className="w-4 h-4 text-[#0833A2] animate-float" />
              <span>Colores sugeridos e inspiración</span>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {[
                { hex: '#0833A2', name: 'Azul Fiesta' },
                { hex: '#061D60', name: 'Azul Profundo' },
                { hex: '#C7CCD5', name: 'Plata / Slate' },
                { hex: '#1E293B', name: 'Noche' },
                { hex: '#D4AF37', name: 'Dorado / Brillos' },
              ].map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 group">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md border-2 border-white group-hover:scale-115 transition-transform cursor-pointer relative flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[9px] text-white font-bold drop-shadow">
                      ✓
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Friendly restriction note */}
          {dressCode.restrictions && (
            <div className="mt-6 flex items-center justify-center gap-2 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs text-left sm:text-center max-w-lg mx-auto">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{dressCode.restrictions}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
