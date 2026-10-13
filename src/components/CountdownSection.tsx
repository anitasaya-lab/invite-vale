import React, { useState, useEffect } from 'react';
import { Clock, CalendarPlus, Check, Sparkles } from 'lucide-react';
import { EventDetails } from '../types';

interface CountdownSectionProps {
  eventDate: string;
  details: EventDetails;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ eventDate, details }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [calendarSaved, setCalendarSaved] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  // Generate Google Calendar Link
  const handleGoogleCalendar = () => {
    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000); // 6 hours party
    const formatISO = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', `${details.celebrationType} - ${details.celebrantName}`);
    url.searchParams.append('dates', `${formatISO(startDate)}/${formatISO(endDate)}`);
    url.searchParams.append(
      'details',
      `¡Festejo inolvidable! ${details.venueName}. No te olvides de confirmar asistencia.`
    );
    url.searchParams.append('location', `${details.venueName}, ${details.venueAddress}, ${details.venueCity}`);

    window.open(url.toString(), '_blank');
    setCalendarSaved(true);
  };

  // Generate iCal / Apple / Outlook .ics download
  const handleDownloadIcs = () => {
    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);
    const formatICSDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitacion Cumpleanos//ES',
      'BEGIN:VEVENT',
      `SUMMARY:${details.celebrationType} - ${details.celebrantName}`,
      `DESCRIPTION:¡Festejo inolvidable de ${details.celebrantName}!`,
      `LOCATION:${details.venueName}\\, ${details.venueAddress}\\, ${details.venueCity}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `cumpleanos-${details.celebrantName.toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarSaved(true);
  };

  return (
    <section id="cuenta-regresiva" className="py-20 px-4 bg-[#F3F5F9] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
          <Clock className="w-4 h-4 text-[#0833A2]" />
          <span>Falta muy poco</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
          Cuenta Regresiva
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Cada segundo nos acerca a una noche inolvidable. ¡Anotá la fecha en tu calendario!
        </p>

        {/* Countdown units */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-10 max-w-2xl mx-auto">
          {[
            { label: 'DÍAS', value: timeLeft.days },
            { label: 'HORAS', value: timeLeft.hours },
            { label: 'MINUTOS', value: timeLeft.minutes },
            { label: 'SEGUNDOS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#C7CCD5]/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 group flex flex-col items-center justify-center"
            >
              <div className="text-3xl sm:text-5xl font-serif font-extrabold text-[#0833A2] tracking-tight group-hover:text-[#061D60] transition-colors">
                {String(item.value).padStart(2, '0')}
              </div>
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-gray-500 mt-2 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Add Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0833A2] hover:bg-[#061D60] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Agendar en Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-[#061D60] border border-[#C7CCD5] font-semibold text-sm rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            {calendarSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">¡Guardado en Calendario!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#0833A2]" />
                <span>Descargar para Apple / Outlook (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
