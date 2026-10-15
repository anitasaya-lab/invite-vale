import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Camera, QrCode, Upload, Heart, Share2, Sparkles, Image as ImageIcon, CheckCircle, ExternalLink } from 'lucide-react';
import { GuestPhoto } from '../types';
import confetti from 'canvas-confetti';

interface PhotoUploadQRSectionProps {
  uploadUrl: string;
  celebrantName: string;
  initialPhotos: GuestPhoto[];
}

export const PhotoUploadQRSection: React.FC<PhotoUploadQRSectionProps> = ({
  uploadUrl,
  celebrantName,
  initialPhotos,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [photos, setPhotos] = useState<GuestPhoto[]>(() => {
    const saved = localStorage.getItem('party_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPhotos;
      }
    }
    return initialPhotos;
  });

  const [uploaderName, setUploaderName] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const albumUrl = 'https://photos.google.com/album/AF1QipPJyuJYzDt1IWCwFNaK89OtU_zr1ZoP6g50Pf3w';

  // Generate QR code for uploading photos directly to Google Photos album
  useEffect(() => {
    QRCode.toDataURL(albumUrl, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0833A2',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR', err));
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsUploading(true);
    setTimeout(() => {
      const newPhoto: GuestPhoto = {
        id: `photo-${Date.now()}`,
        uploaderName: uploaderName.trim() || 'Invitado especial',
        caption: caption.trim() || '¡Momento inolvidable de la fiesta! 📸',
        imageUrl: selectedImage,
        likes: 1,
        timestamp: 'Recién subida',
      };

      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      localStorage.setItem('party_photos', JSON.stringify(updated));

      setIsUploading(false);
      setSelectedImage(null);
      setUploaderName('');
      setCaption('');
      setShowUploadModal(false);

      // Celebration burst
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0833A2', '#C7CCD5', '#061D60', '#D4AF37'],
      });
    }, 600);
  };

  const handleLike = (id: string) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setPhotos(updated);
    localStorage.setItem('party_photos', JSON.stringify(updated));
  };

  return (
    <section id="album-fotos" className="py-16 sm:py-20 px-4 bg-white text-[#061D60] relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Animated Camera Icon (monolínea rounded) */}
        <div className="inline-flex items-center justify-center text-[#0833A2] mb-4 select-none animate-crown">
          <Camera className="w-9 h-9 sm:w-10 sm:h-10" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </div>

        {/* Heading: FOTOS */}
        <h3
          className="text-2xl sm:text-3xl font-normal text-[#061D60] tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
        >
          FOTOS
        </h3>

        {/* Subtitle paragraph */}
        <p
          className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10 font-light"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Compartí tus fotos y videos de la fiesta para guardar cada momento inolvidable.
        </p>

        {/* 50/50 Grid: QR Code & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-3xl mx-auto mb-6 text-left">
          {/* Left: QR Code */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-[#F3F5F9] rounded-3xl border border-[#C7CCD5]/60 shadow-sm inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Código QR para subir fotos de la fiesta"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-contain mx-auto"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-gray-400 text-sm">
                  Cargando QR...
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-gray-500 font-medium">
              Escaneá con la cámara de tu celular
            </p>
          </div>

          {/* Right: Instructions (no icon, only steps 1 and 2, single button) */}
          <div className="flex flex-col justify-center space-y-5">
            <h4
              className="text-xl sm:text-2xl font-normal text-[#061D60] tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              ¿Cómo funciona?
            </h4>

            <div className="space-y-4 text-sm text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0833A2] text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#061D60] font-medium">Sacá fotos y videos:</strong> Capturá los mejores momentos durante toda la fiesta.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0833A2] text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#061D60] font-medium">Escaneá o subí:</strong> Usá el código QR o hacé clic en el botón de abajo para cargarlas al instante.
                </div>
              </div>
            </div>

            {/* Single Action Button linking directly to Google Photos album */}
            <div className="pt-2">
              <a
                href={albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#0833A2] hover:bg-[#061D60] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Upload className="w-4 h-4" strokeWidth={1.5} />
                <span>Subir una foto ahora</span>
              </a>
            </div>
          </div>
        </div>

        {/* Live Photo Wall / Gallery Preview (Oculto por ahora) */}
        <div className="hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#061D60]">
                Muro de Recuerdos de la Fiesta
              </h3>
              <p className="text-xs text-gray-500">
                Fotos compartidas por amigos y familia ({photos.length})
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="text-xs font-bold text-[#0833A2] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Agregar foto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#C7CCD5]/50 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {photo.timestamp}
                  </div>
                </div>

                <div className="p-4.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <p className="text-xs font-bold text-[#0833A2] uppercase tracking-wide">
                      {photo.uploaderName}
                    </p>
                    <p className="text-sm text-gray-700 font-medium mt-1 leading-snug">
                      "{photo.caption}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => handleLike(photo.id)}
                      className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold active:scale-110 transition-transform cursor-pointer"
                      title="Dar me gusta"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                      <span>{photo.likes}</span>
                    </button>

                    <span className="text-[11px] text-gray-400">Recuerdo de fiesta</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal Drawer */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061D60]/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#C7CCD5]/50 overflow-hidden">
            <div className="bg-gradient-to-r from-[#061D60] to-[#0833A2] text-white p-5 text-center relative">
              <h3 className="text-xl font-bold font-serif">Subir Foto al Álbum</h3>
              <p className="text-xs text-[#C7CCD5] mt-1">Compartí tu momento especial con {celebrantName}</p>
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-1.5">
                  Seleccionar Foto o Tomar con Cámara *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {selectedImage ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#0833A2] aspect-video group">
                    <img src={selectedImage} alt="Vista previa" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 hover:bg-black text-white text-xs rounded-lg"
                    >
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video border-2 border-dashed border-[#C7CCD5] hover:border-[#0833A2] rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:text-[#0833A2] bg-[#F3F5F9] transition-all cursor-pointer p-4 text-center"
                  >
                    <ImageIcon className="w-8 h-8 mb-2 text-[#0833A2] animate-gentle-bounce" />
                    <span className="text-xs font-bold">Hacé clic para elegir o sacar una foto</span>
                    <span className="text-[11px] text-gray-400 mt-1">Formatos JPG, PNG, WebP</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-1.5">
                  Tu Nombre o Familia *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Julieta y Nico"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-1.5">
                  Dedicatoria o Frase
                </label>
                <textarea
                  rows={2}
                  placeholder="¡Qué noche increíble! 🥳🎉"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2] focus:ring-2 focus:ring-[#0833A2]/20 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!selectedImage || isUploading}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#0833A2] hover:bg-[#061D60] disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {isUploading ? 'Subiendo...' : 'Publicar Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
