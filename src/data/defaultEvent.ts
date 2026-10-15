import { EventDetails, RsvpEntry, GuestPhoto, SuggestedSong } from '../types';

export const initialEventDetails: EventDetails = {
  celebrantName: 'Valentina',
  celebrationType: 'XV',
  quote: 'Hay momentos en la vida que son irrepetibles, pero compartirlos con las personas que más quiero los hace inolvidables. ¡Te espero para celebrar mis 15 años!',
  eventDate: '2026-11-20T21:30:00', // Viernes 20 de noviembre 21:30 hs
  ceremonyTime: '21:30 hs - Recepción & Fiesta',
  partyTime: '21:30 hs',
  venueName: 'Club de Pesca del Cerro',
  venueAddress: 'Grecia 3099',
  venueCity: 'Cerro, Montevideo, Uruguay',
  coordinates: {
    lat: -34.8856,
    lng: -56.2555,
  },
  dressCode: {
    title: 'Semiformal',
    description: 'Vení con tu mejor look para disfrutar y bailar toda la noche.',
    suggestedColors: ['#0833A2', '#061D60', '#C7CCD5', '#2C3E50', '#1A365D'],
    restrictions: 'Por favor, reservamos los tonos blanco y marfil exclusivamente para la agasajada.',
  },
  bankDetails: {
    holder: 'Erika Sanchez',
    bankName: 'Caja de ahorro BROU',
    alias: 'CA 001253810-00001',
    cbu: 'CA 182-0166382',
    accountType: 'Caja de ahorro BROU',
    message: 'Tu presencia es mi mayor regalo, pero si deseás hacerme un presente podés colaborar a través de nuestra cuenta.',
  },
  whatsappPhone: '5491138459210',
  photoUploadUrl: 'https://photos.google.com/album/AF1QipPJyuJYzDt1IWCwFNaK89OtU_zr1ZoP6g50Pf3w',
};

export const sampleRsvps: RsvpEntry[] = [
  {
    id: 'rsvp-1',
    fullName: 'Sofía Romero',
    attending: true,
    guestsCount: 2,
    dietPreference: 'none',
    songSuggestion: 'Dua Lipa - Levitating',
    message: '¡No veo la hora de verte brillar, amiga! Te quiero un montón.',
    phone: '+54 9 11 4455-6677',
    submittedAt: '2026-10-10T14:20:00Z',
  },
  {
    id: 'rsvp-2',
    fullName: 'Martín y Familia Gómez',
    attending: true,
    guestsCount: 3,
    dietPreference: 'celiac',
    dietDetails: 'Menú sin gluten / Sin TACC para 1 persona',
    songSuggestion: 'Bizarrap - Quevedo: Bzrp Music Sessions, Vol. 52',
    message: '¡Felicitaciones Clara! Ahí estaremos para bailar toda la noche.',
    phone: '+54 9 11 8899-1122',
    submittedAt: '2026-10-11T10:15:00Z',
  },
];

export const samplePhotos: GuestPhoto[] = [
  {
    id: 'photo-1',
    uploaderName: 'Camila & Lucas',
    caption: '¡Contando los días para festejar con vos!',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    likes: 12,
    timestamp: 'Hace 2 días',
  },
  {
    id: 'photo-2',
    uploaderName: 'Tía Andrea',
    caption: '¡Princesa hermosa, orgullosos de vos!',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    likes: 18,
    timestamp: 'Ayer',
  },
  {
    id: 'photo-3',
    uploaderName: 'Los Chicos del Cole',
    caption: '¡Se pica esa pista de baile! 🕺💃',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    likes: 24,
    timestamp: 'Hace 5 horas',
  },
];

export const sampleSongs: SuggestedSong[] = [
  {
    id: 'song-1',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    suggestedBy: 'Valen',
    votes: 14,
  },
  {
    id: 'song-2',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    suggestedBy: 'Santi',
    votes: 21,
  },
  {
    id: 'song-3',
    title: 'Don\'t Stop Me Now',
    artist: 'Queen',
    suggestedBy: 'Papá',
    votes: 19,
  },
];
