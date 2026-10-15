import React from 'react';
import { Crown } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#061D60] text-white relative overflow-hidden text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Animated crown icon (rounded monolínea) */}
        <div className="inline-flex items-center justify-center text-white mb-4 select-none animate-crown">
          <Crown className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </div>

        {/* Heading: Mis 15 años in Montserrat regular */}
        <h3
          className="text-2xl sm:text-3xl font-normal text-white tracking-wide"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          Mis 15 años
        </h3>

        {/* Paragraph: ¡LLegó la noche tan esperada, y que más lindo que compartirla con vos! */}
        <p className="text-white/85 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mt-3.5 font-light">
          ¡LLegó la noche tan esperada, y que más lindo que compartirla con vos!
        </p>
      </div>
    </section>
  );
};
