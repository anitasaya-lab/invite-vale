import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Copy, Check } from 'lucide-react';

interface InteractiveMapProps {
  venueName: string;
  venueAddress: string;
  venueCity: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  venueName,
  venueAddress,
  venueCity,
  coordinates,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already exists on container
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false, // Prevent page scroll hijack
    });

    mapInstanceRef.current = map;

    // Elegant and crisp map tiles (CartoDB Positron / OSM)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Custom birthday pin icon with #0833A2 theme
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="
            background: linear-gradient(135deg, #0833A2 0%, #061D60 100%);
            color: white;
            padding: 8px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 10px 25px -5px rgba(8, 51, 162, 0.5), 0 8px 10px -6px rgba(8, 51, 162, 0.4);
            border: 2px solid white;
            display: flex;
            align-items: center;
            gap: 6px;
            transform: translateY(-8px);
          ">
            <span>🎉 ${venueName}</span>
          </div>
          <div style="
            width: 20px;
            height: 20px;
            background: #0833A2;
            transform: rotate(45deg);
            margin-top: -14px;
            border-bottom: 2px solid white;
            border-right: 2px solid white;
            border-radius: 0 0 4px 0;
          "></div>
          <div style="
            width: 14px;
            height: 6px;
            background: rgba(0,0,0,0.25);
            border-radius: 50%;
            margin-top: 4px;
            filter: blur(1px);
          "></div>
        </div>
      `,
      iconSize: [160, 50],
      iconAnchor: [80, 48],
      popupAnchor: [0, -50],
    });

    const marker = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(map);

    const popupContent = `
      <div style="font-family: inherit; padding: 4px 6px; text-align: center; color: #061D60;">
        <h3 style="font-weight: 700; font-size: 15px; margin: 0 0 4px; color: #0833A2;">${venueName}</h3>
        <p style="font-size: 12px; margin: 0 0 6px; color: #4B5563;">${venueAddress}, ${venueCity}</p>
        <div style="font-size: 11px; font-weight: 600; color: #0833A2; background: #F3F5F9; padding: 4px 8px; border-radius: 6px; display: inline-block;">
          ✨ ¡Te esperamos puntuales!
        </div>
      </div>
    `;

    marker.bindPopup(popupContent).openPopup();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates.lat, coordinates.lng, venueName, venueAddress, venueCity]);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}, ${venueCity}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName} ${venueAddress} ${venueCity}`)}`;
  const wazeUrl = `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`;

  return (
    <div className="w-full">
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#C7CCD5]/60 shadow-xl bg-white">
        {/* Map Header bar with live status */}
        <div className="bg-gradient-to-r from-[#061D60] to-[#0833A2] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-full animate-float">
              <Compass className="w-5 h-5 text-[#C7CCD5]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C7CCD5] font-semibold">Ubicación del evento</p>
              <h4 className="text-sm md:text-base font-bold font-serif">{venueName}</h4>
            </div>
          </div>

          <button
            onClick={copyAddress}
            className="flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white px-3 py-1.5 rounded-full border border-white/20"
            title="Copiar dirección"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-200 font-medium">¡Dirección copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C7CCD5]" />
                <span>Copiar dirección</span>
              </>
            )}
          </button>
        </div>

        {/* Map Canvas */}
        <div
          ref={mapContainerRef}
          className="w-full h-[320px] sm:h-[400px] z-0 focus:outline-none"
          style={{ minHeight: '320px' }}
        />

        {/* Interactive buttons bar below map */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#C7CCD5]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 text-[#061D60] text-center sm:text-left">
            <MapPin className="w-5 h-5 text-[#0833A2] shrink-0 mt-0.5 animate-gentle-bounce" />
            <div>
              <p className="text-sm font-semibold">{venueAddress}</p>
              <p className="text-xs text-gray-500">{venueCity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0833A2] hover:bg-[#061D60] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <Navigation className="w-4 h-4 transition-transform group-hover:rotate-45" />
              <span>Abrir en Google Maps</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F3F5F9] hover:bg-[#C7CCD5]/40 text-[#061D60] border border-[#C7CCD5] text-xs sm:text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
              <span>Waze</span>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        * Podés acercar, alejar o mover el mapa para ver los accesos y estacionamientos.
      </p>
    </div>
  );
};
