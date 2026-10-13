import React from 'react';
import { MapPin, Car, Sparkles } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { EventDetails } from '../types';

interface LocationSectionProps {
  details: EventDetails;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ details }) => {
  return (
    <section id="ubicacion" className="py-20 px-4 bg-[#F3F5F9] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
            <MapPin className="w-4 h-4 text-[#0833A2]" />
            <span>¿Dónde festejamos?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
            Ubicación del Evento
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
            El salón cuenta con seguridad privada, guardarropa y estacionamiento para tu total tranquilidad.
          </p>
        </div>

        {/* The Interactive Map Component */}
        <InteractiveMap
          venueName={details.venueName}
          venueAddress={details.venueAddress}
          venueCity={details.venueCity}
          coordinates={details.coordinates}
        />

        {/* Travel Tips / Parking */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#C7CCD5]/60 flex items-start gap-3.5 shadow-xs">
            <div className="p-2.5 bg-[#F3F5F9] rounded-xl text-[#0833A2] shrink-0">
              <Car className="w-5 h-5 animate-float" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#061D60]">Estacionamiento</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Estacionamiento gratuito y vigilado dentro del predio del salón para todos los invitados.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#C7CCD5]/60 flex items-start gap-3.5 shadow-xs">
            <div className="p-2.5 bg-[#F3F5F9] rounded-xl text-[#0833A2] shrink-0">
              <Sparkles className="w-5 h-5 animate-gentle-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#061D60]">Accesibilidad & Comodidad</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Rampas de acceso, climatización central y personal de asistencia durante toda la fiesta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
