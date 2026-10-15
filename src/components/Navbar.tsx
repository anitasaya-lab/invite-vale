import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Users, Settings, Heart } from 'lucide-react';
import { EventDetails } from '../types';

interface NavbarProps {
  details: EventDetails;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenRsvp: () => void;
  onOpenGuestList: () => void;
  onOpenEditEvent: () => void;
  rsvpsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  details,
  isAudioPlaying,
  onToggleAudio,
  onOpenRsvp,
  onOpenGuestList,
  onOpenEditEvent,
  rsvpsCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cuenta Regresiva', href: '#cuenta-regresiva' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Dress Code', href: '#dress-code' },
    { label: 'Fotos (QR)', href: '#album-fotos' },
    { label: 'Regalo', href: '#regalo' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2.5 border-b border-[#C7CCD5]/40 text-[#061D60]'
            : 'bg-gradient-to-b from-black/50 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Celebrant Initials */}
          <a href="#" className="flex items-center gap-2 group">
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm transition-all ${
                scrolled
                  ? 'bg-[#0833A2] text-white shadow-xs'
                  : 'bg-white text-[#0833A2] shadow-md'
              }`}
            >
              {details.celebrantName.charAt(0)}
            </span>
            <span
              className={`font-serif font-bold tracking-tight text-base sm:text-lg ${
                scrolled ? 'text-[#061D60]' : 'text-white'
              }`}
            >
              {details.celebrantName}
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[#0833A2] ${
                  scrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                scrolled
                  ? 'border-gray-200 bg-gray-50 text-[#0833A2] hover:bg-gray-100'
                  : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isAudioPlaying ? 'Silenciar música' : 'Activar música'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Host Dashboard Button */}
            <button
              onClick={onOpenGuestList}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                scrolled
                  ? 'bg-[#F3F5F9] border-[#C7CCD5] text-[#061D60] hover:bg-gray-100'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title="Ver lista de invitados confirmados"
            >
              <Users className="w-3.5 h-3.5 text-[#0833A2]" />
              <span>Confirmados ({rsvpsCount})</span>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenEditEvent}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                scrolled
                  ? 'border-gray-200 bg-gray-50 text-gray-600 hover:text-[#0833A2]'
                  : 'border-white/20 bg-white/10 text-white/80 hover:text-white'
              }`}
              title="Personalizar datos de la fiesta"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Primary RSVP button */}
            <button
              onClick={onOpenRsvp}
              className="px-4 py-2 bg-[#0833A2] hover:bg-[#061D60] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Confirmar
            </button>

            {/* Mobile Menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-current"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-[#061D60] border-b border-[#C7CCD5] px-4 py-4 space-y-3 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-gray-700 hover:text-[#0833A2] py-1.5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuestList();
                }}
                className="text-xs font-semibold text-[#0833A2] flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Panel de Invitados ({rsvpsCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditEvent();
                }}
                className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4" />
                <span>Editar Evento</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
