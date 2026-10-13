/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialEventDetails, sampleRsvps, samplePhotos, sampleSongs } from './data/defaultEvent';
import { EventDetails, RsvpEntry } from './types';
import { musicPlayer } from './utils/audioPlayer';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { EventTimelineSection } from './components/EventTimelineSection';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { PhotoUploadQRSection } from './components/PhotoUploadQRSection';
import { GiftSection } from './components/GiftSection';
import { GiftModal } from './components/GiftModal';
import { RsvpSection } from './components/RsvpSection';
import { MusicPartySection } from './components/MusicPartySection';
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
        if (parsed.celebrantName === 'Clara' || parsed.celebrationType === 'Mis XV' || parsed.celebrationType === '¡Mis 15 Años!') {
          return { ...initialEventDetails, ...parsed, celebrationType: 'XV' };
        }
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

  // Modals visibility
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isGuestListOpen, setIsGuestListOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);

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
      {/* Top Sticky Navigation */}
      <Navbar
        details={eventDetails}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenRsvp={handleScrollToRsvp}
        onOpenGuestList={() => setIsGuestListOpen(true)}
        onOpenEditEvent={() => setIsEditEventOpen(true)}
        rsvpsCount={rsvps.filter((r) => r.attending).length}
      />

      {/* Main Sections matching agendalafecha structure */}
      <main className="flex-1">
        {/* 1. Hero / Portada */}
        <HeroSection
          details={eventDetails}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
          onOpenRsvp={handleScrollToRsvp}
        />

        {/* 2. Cuenta Regresiva & Agendar fecha */}
        <CountdownSection
          eventDate={eventDetails.eventDate}
          details={eventDetails}
        />

        {/* 3. Cronograma / Recepción y Fiesta */}
        <EventTimelineSection
          details={eventDetails}
        />

        {/* 4. Ubicación con Mapa Interactivo exacto */}
        <LocationSection
          details={eventDetails}
        />

        {/* 5. Dress Code con paleta y sugerencias */}
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

        {/* 9. Música de la fiesta / Sugerir temas */}
        <MusicPartySection
          initialSongs={sampleSongs}
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
