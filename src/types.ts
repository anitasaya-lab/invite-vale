export interface EventDetails {
  celebrantName: string;
  celebrationType: string; // e.g. "Mis 15 Años", "Mis 30 Años", "Festejo de Cumpleaños"
  quote: string;
  eventDate: string; // ISO string or 'YYYY-MM-DDTHH:mm:ss'
  ceremonyTime?: string;
  partyTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dressCode: {
    title: string;
    description: string;
    suggestedColors: string[];
    restrictions?: string;
  };
  bankDetails: {
    holder: string;
    bankName: string;
    alias: string;
    cbu: string;
    accountType: string;
    cuil?: string;
    message?: string;
  };
  whatsappPhone: string; // e.g. "5491112345678"
  photoUploadUrl: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  attending: boolean;
  guestsCount: number;
  dietPreference: 'none' | 'celiac' | 'vegetarian' | 'vegan' | 'hypertensive' | 'other';
  dietDetails?: string;
  songSuggestion?: string;
  message?: string;
  phone?: string;
  submittedAt: string;
}

export interface GuestPhoto {
  id: string;
  uploaderName: string;
  caption: string;
  imageUrl: string;
  likes: number;
  timestamp: string;
}

export interface SuggestedSong {
  id: string;
  title: string;
  artist: string;
  suggestedBy: string;
  votes: number;
}
