/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialEventDetails, sampleRsvps, samplePhotos, sampleSongs } from './data/defaultEvent';
import { EventDetails, RsvpEntry } from './types';
import { musicPlayer } from './utils/audioPlayer';

// Components
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { CountdownSection } from './components/CountdownSection';
import { EventPartySection } from './components/EventPartySection';
import { DressCodeSection } from './components/DressCodeSection';
import { PhotoUploadQRSection } from './components/PhotoUploadQRSection';
import { GiftSection } from './components/GiftSection';
import { GiftModal } from './components/GiftModal';
import { RsvpSection } from './components/RsvpSection';
import { GuestListModal } from './components/GuestListModal';
import { EditEventModal } from './components/EditEventModal';
import { Footer } from './components/Footer';

export default function App() {
  // Event Details State with localStorage sync
  const [eventDetails, setEventDetails] = useState<EventDetails>(() => {
    const saved = localStorage.getItem('birthday_event_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.venueName === 'Salón Bellavista Eventos' ||
          !parsed.venueAddress?.includes('Grecia')
        ) {
          parsed.eventDate = initialEventDetails.eventDate;
          parsed.partyTime = initialEventDetails.partyTime;
          parsed.venueName = initialEventDetails.venueName;
          parsed.venueAddress = initialEventDetails.venueAddress;
          parsed.venueCity = initialEventDetails.venueCity;
          parsed.coordinates = initialEventDetails.coordinates;
        }
        if (parsed.dressCode?.title?.includes('Cocktail')) {
          parsed.dressCode.title = 'Semiformal';
        }
        if (parsed.bankDetails?.holder !== 'Erika Sanchez') {
          parsed.bankDetails = initialEventDetails.bankDetails;
        }
        parsed.photoUploadUrl = initialEventDetails.photoUploadUrl;
        return parsed;
      } catch (e) {
        return initialEventDetails;
      }
    }
    return initialEventDetails;
  });

  // RSVPs State with localStorage sync
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    const saved = localStorage.getItem('birthday_rsvps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return sampleRsvps;
      }
    }
    return sampleRsvps;
  });

  // Audio Playback State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isGuestListOpen, setIsGuestListOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);

  // Check URL hash for admin access (e.g. #admin or #lista)
  useEffect(() => {
    const handleHash = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.hash === '#lista' ||
        window.location.search.includes('admin=true')
      ) {
        setIsGuestListOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handle background music toggle
  const handleToggleAudio = () => {
    const nextStatus = musicPlayer.toggle();
    setIsAudioPlaying(nextStatus);
  };

  // Handle adding new RSVP
  const handleNewRsvp = (newEntry: RsvpEntry) => {
    const updated = [newEntry, ...rsvps];
    setRsvps(updated);
    localStorage.setItem('birthday_rsvps', JSON.stringify(updated));
  };

  // Handle deleting RSVP from host modal
  const handleDeleteRsvp = (id: string) => {
    const updated = rsvps.filter((r) => r.id !== id);
    setRsvps(updated);
    localStorage.setItem('birthday_rsvps', JSON.stringify(updated));
  };

  // Handle saving customized event details
  const handleSaveEventDetails = (updated: EventDetails) => {
    setEventDetails(updated);
    localStorage.setItem('birthday_event_details', JSON.stringify(updated));
  };

  // Smooth scroll to RSVP form
  const handleScrollToRsvp = () => {
    const element = document.getElementById('confirmacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F9] text-[#061D60] flex flex-col font-sans selection:bg-[#0833A2] selection:text-white">
      {/* Floating Audio Control Button on bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#061D60]/90 hover:bg-[#0833A2] active:scale-95 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium text-white transition-all shadow-xl cursor-pointer"
          title={isAudioPlaying ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
        >
          {isAudioPlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Pausar Música</span>
            </>
          ) : (
            <span>Música 🎵</span>
          )}
        </button>
      </div>

      {/* Main Sections matching agendalafecha structure */}
      <main className="flex-1">
        {/* 1. Hero / Portada */}
        <HeroSection
          details={eventDetails}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
          onOpenRsvp={handleScrollToRsvp}
        />

        {/* 1.5. Sección Bienvenida / Mis 15 años */}
        <WelcomeSection />

        {/* 2. Cuenta Regresiva & Agendar fecha */}
        <CountdownSection
          eventDate={eventDetails.eventDate}
          details={eventDetails}
        />

        {/* 3. Sección del Evento: FIESTA */}
        <EventPartySection />

        {/* 4. Dress Code con paleta y sugerencias */}
        <DressCodeSection
          dressCode={eventDetails.dressCode}
        />

        {/* 6. Subir Fotos con Código QR (Requested specifically after Dress code) */}
        <PhotoUploadQRSection
          uploadUrl={eventDetails.photoUploadUrl}
          celebrantName={eventDetails.celebrantName}
          initialPhotos={samplePhotos}
        />

        {/* 7. Regalo con trigger para popup bancario */}
        <GiftSection
          bankDetails={eventDetails.bankDetails}
          onOpenGiftModal={() => setIsGiftModalOpen(true)}
        />

        {/* 8. Confirmación de Asistencia (RSVP) */}
        <RsvpSection
          details={eventDetails}
          onNewRsvp={handleNewRsvp}
        />
      </main>

      {/* Footer */}
      <Footer
        details={eventDetails}
        onOpenGuestList={() => setIsGuestListOpen(true)}
        onOpenEditEvent={() => setIsEditEventOpen(true)}
      />

      {/* Popups & Modals */}
      {/* Modal 1: Datos Bancarios para Regalo */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        bankDetails={eventDetails.bankDetails}
      />

      {/* Modal 2: Lista de Confirmados (Panel del Anfitrión) */}
      <GuestListModal
        isOpen={isGuestListOpen}
        onClose={() => setIsGuestListOpen(false)}
        rsvps={rsvps}
        onDeleteRsvp={handleDeleteRsvp}
        celebrantName={eventDetails.celebrantName}
      />

      {/* Modal 3: Personalizar Datos del Evento */}
      <EditEventModal
        isOpen={isEditEventOpen}
        onClose={() => setIsEditEventOpen(false)}
        details={eventDetails}
        onSave={handleSaveEventDetails}
      />
    </div>
  );
}
