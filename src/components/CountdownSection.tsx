import React, { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';
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
  };

  return (
    <section id="cuenta-regresiva" className="py-16 sm:py-20 px-4 bg-[#F3F5F9] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Descriptive paragraph */}
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
          Cada segundo nos acerca a una noche inolvidable. ¡Anotá la fecha en tu calendario!
        </p>

        {/* Minimalist Countdown with colon dividers (borderless, medium weight, elegant size) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6 my-6 max-w-xl mx-auto select-none">
          {[
            { label: 'DÍAS', value: timeLeft.days },
            { label: 'HORAS', value: timeLeft.hours },
            { label: 'MINUTOS', value: timeLeft.minutes },
            { label: 'SEGUNDOS', value: timeLeft.seconds },
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
                <div 
                  className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-[#0833A2] tracking-tight leading-none"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {String(item.value).padStart(2, '0')}
                </div>
                <span className="text-[10px] sm:text-xs font-medium tracking-widest text-gray-400 mt-2 uppercase">
                  {item.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-[#0833A2]/30 -mt-4 select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Single Google Calendar button */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={handleGoogleCalendar}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#0833A2] hover:bg-[#061D60] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Agendar en Google Calendar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
