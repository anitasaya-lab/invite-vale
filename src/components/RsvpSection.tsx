import React, { useState } from 'react';
import { UserCheck, Check, Send, Sparkles, MessageCircle, Heart, Utensils, Music, Phone } from 'lucide-react';
import { RsvpEntry, EventDetails } from '../types';
import { musicPlayer } from '../utils/audioPlayer';

import { triggerRsvpConfetti, triggerSingleCannon } from '../utils/confettiCelebration';

interface RsvpSectionProps {
  details: EventDetails;
  onNewRsvp: (entry: RsvpEntry) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ details, onNewRsvp }) => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [dietPreference, setDietPreference] = useState<RsvpEntry['dietPreference']>('none');
  const [dietDetails, setDietDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [songSuggestion, setSongSuggestion] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry: RsvpEntry = {
        id: `rsvp-${Date.now()}`,
        fullName: fullName.trim(),
        attending,
        guestsCount: attending ? Number(guestsCount) : 0,
        dietPreference,
        dietDetails: dietDetails.trim() || undefined,
        phone: phone.trim() || undefined,
        songSuggestion: songSuggestion.trim() || undefined,
        message: message.trim() || undefined,
        submittedAt: new Date().toISOString(),
      };

      onNewRsvp(newEntry);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Play sound and trigger multi-wave canvas confetti explosion
      musicPlayer.playCelebrationChime();
      if (attending) {
        triggerRsvpConfetti();
      } else {
        triggerSingleCannon(0.5, 0.6);
      }
    }, 500);
  };

  const generateWhatsAppMessage = () => {
    const text = attending
      ? `¡Hola ${details.celebrantName}! Confirmo mi asistencia a tu fiesta 🎉. Nombre: ${fullName}. Cantidad: ${guestsCount} persona(s). Menú: ${dietPreference !== 'none' ? dietPreference : 'General'}. ${songSuggestion ? `Tema pedido: ${songSuggestion}` : ''}`
      : `¡Hola ${details.celebrantName}! Muchísimas gracias por la invitación a tu fiesta, pero lamentablemente no podré asistir. ¡Que tengas una noche hermosa y feliz cumple!`;

    const cleanPhone = details.whatsappPhone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="confirmacion" className="py-20 px-4 bg-white relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
            <UserCheck className="w-4 h-4 text-[#0833A2]" />
            <span>Confirmación de Asistencia</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
            Confirmá tu Lugar
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Por favor, dejanos saber si vas a poder acompañarnos para coordinar el catering y la distribución de mesas.
          </p>
        </div>

        {/* The Card Container */}
        <div className="bg-[#F3F5F9] rounded-3xl p-6 sm:p-10 border-2 border-[#C7CCD5]/70 shadow-xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
                <Check className="w-10 h-10" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#061D60]">
                {attending ? '¡Muchas gracias por confirmar!' : '¡Gracias por avisarnos!'}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                {attending
                  ? `Tu respuesta ha sido registrada exitosamente. ¡Nos vemos en el salón para festejar a lo grande con ${details.celebrantName}!`
                  : `Lamentamos que no puedas venir, pero te agradecemos de corazón que nos hayas avisado.`}
              </p>

              {/* Celebratory interactive confetti button */}
              {attending && (
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() => {
                      musicPlayer.playCelebrationChime();
                      triggerRsvpConfetti();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0833A2] to-[#061D60] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#0833A2]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
                    <span>¡Lanzar más confeti de fiesta! 🎊</span>
                  </button>
                </div>
              )}

              {/* Optional WhatsApp notification button */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar aviso por WhatsApp a {details.celebrantName}</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-3.5 text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
                >
                  Modificar respuesta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Asistencia Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2.5 text-center sm:text-left">
                  ¿Vas a poder venir? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all border-2 cursor-pointer ${
                      attending
                        ? 'bg-[#0833A2] text-white border-[#0833A2] shadow-md shadow-[#0833A2]/25 scale-[1.01]'
                        : 'bg-white text-gray-700 border-[#C7CCD5] hover:bg-gray-50'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${attending ? 'text-white' : 'text-gray-400'}`} />
                    <span>¡Sí, confirmo asistencia!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all border-2 cursor-pointer ${
                      !attending
                        ? 'bg-[#061D60] text-white border-[#061D60] shadow-md scale-[1.01]'
                        : 'bg-white text-gray-700 border-[#C7CCD5] hover:bg-gray-50'
                    }`}
                  >
                    <span>Lamentablemente no podré ir</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Florencia Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20"
                />
              </div>

              {/* Fields if attending */}
              {attending && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Guests Count */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2">
                        Cantidad de Personas
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20"
                      >
                        <option value={1}>1 persona (solo yo)</option>
                        <option value={2}>2 personas</option>
                        <option value={3}>3 personas</option>
                        <option value={4}>4 personas</option>
                        <option value={5}>5 personas o más</option>
                      </select>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="Ej: 11 4455-6677"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#0833A2]" />
                      <span>Menú Especial o Restricción Alimentaria</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'none', label: 'Tradicional' },
                        { id: 'celiac', label: 'Sin TACC (Celíaco)' },
                        { id: 'vegetarian', label: 'Vegetariano' },
                        { id: 'vegan', label: 'Vegano' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDietPreference(item.id as any)}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                            dietPreference === item.id
                              ? 'bg-[#0833A2] text-white border-[#0833A2] shadow-xs'
                              : 'bg-white text-gray-600 border-[#C7CCD5] hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {dietPreference !== 'none' && (
                      <input
                        type="text"
                        placeholder="Detallá para cuántas personas o tipo de alergia..."
                        value={dietDetails}
                        onChange={(e) => setDietDetails(e.target.value)}
                        className="mt-2.5 w-full px-4 py-2 bg-white text-xs rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2]"
                      />
                    )}
                  </div>

                  {/* Song Request */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#0833A2]" />
                      <span>¿Qué canción no puede faltar en la fiesta?</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Canción y artista (ej: Shakira - Hips Don't Lie)"
                      value={songSuggestion}
                      onChange={(e) => setSongSuggestion(e.target.value)}
                      className="w-full px-4 py-3 bg-white text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20"
                    />
                  </div>
                </>
              )}

              {/* Message to Celebrant */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#0833A2]" />
                  <span>Mensaje o Dedicatoria para {details.celebrantName}</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="¡Escribile unas palabras de cariño que guardará para siempre!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#0833A2] to-[#061D60] hover:brightness-110 active:scale-98 text-white font-bold text-base rounded-2xl shadow-xl shadow-[#0833A2]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Guardando respuesta...' : 'Confirmar Asistencia'}</span>
                  <Sparkles className="w-4 h-4 text-[#C7CCD5]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
