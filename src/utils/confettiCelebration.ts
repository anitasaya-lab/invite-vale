import confetti from 'canvas-confetti';

/**
 * Triggers a multi-wave, rich canvas-based confetti animation
 * styled with the party palette: Deep Blue (#0833A2), Midnight (#061D60), Silver (#C7CCD5), Gold (#D4AF37), White (#FFFFFF)
 */
export const triggerRsvpConfetti = () => {
  const partyColors = ['#0833A2', '#061D60', '#C7CCD5', '#D4AF37', '#FFFFFF'];

  // Wave 1: Immediate explosive center burst
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { x: 0.5, y: 0.6 },
    colors: partyColors,
    startVelocity: 45,
    ticks: 240,
    gravity: 0.9,
    scalar: 1.1,
  });

  // Wave 2: Left and Right diagonal cannons at +250ms
  setTimeout(() => {
    // Left cannon
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 75,
      origin: { x: 0.1, y: 0.8 },
      colors: partyColors,
      startVelocity: 55,
      ticks: 250,
      gravity: 0.85,
    });
    // Right cannon
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.8 },
      colors: partyColors,
      startVelocity: 55,
      ticks: 250,
      gravity: 0.85,
    });
  }, 250);

  // Wave 3: Star-shaped and golden sparkle rain at +600ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 120,
      origin: { x: 0.5, y: 0.4 },
      shapes: ['star', 'circle'],
      colors: ['#D4AF37', '#0833A2', '#C7CCD5', '#FFFFFF'],
      scalar: 1.3,
      startVelocity: 35,
      gravity: 0.7,
      ticks: 300,
    });
  }, 600);

  // Wave 4: Final delicate glittering cascade at +1100ms
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#0833A2', '#D4AF37'],
      startVelocity: 25,
      gravity: 0.6,
      ticks: 200,
    });
  }, 1100);
};

export const triggerSingleCannon = (x: number = 0.5, y: number = 0.7) => {
  confetti({
    particleCount: 65,
    spread: 80,
    origin: { x, y },
    colors: ['#0833A2', '#061D60', '#C7CCD5', '#D4AF37', '#FFFFFF'],
    startVelocity: 40,
  });
};
