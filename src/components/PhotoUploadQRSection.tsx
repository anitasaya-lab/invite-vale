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

  // Generate QR code for uploading photos
  useEffect(() => {
    // Current URL with hashtag or external photo drive URL
    const targetUrl = window.location.href ? `${window.location.origin}${window.location.pathname}#album-fotos` : uploadUrl;
    QRCode.toDataURL(targetUrl, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0833A2',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR', err));
  }, [uploadUrl]);

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
    <section id="album-fotos" className="py-20 px-4 bg-gradient-to-b from-white via-[#F3F5F9] to-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0833A2]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-4 animate-float">
            <Camera className="w-4 h-4 text-[#0833A2]" />
            <span>Álbum Digital Compartido</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60] tracking-tight">
            Compartí tus Fotos de la Fiesta
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Durante la noche y después del festejo, escaneá el código QR para subir las fotos y videos que tomes. ¡Así {celebrantName} podrá guardar cada recuerdo!
          </p>
        </div>

        {/* QR & Action Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* QR Code Presentation Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer glowing aura */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#0833A2] to-[#061D60] rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-35 transition duration-500" />

              <div className="relative bg-white p-6 sm:p-7 rounded-[2rem] border-2 border-[#C7CCD5]/70 shadow-2xl text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0833A2] mb-3">
                  <QrCode className="w-4 h-4" />
                  <span>Escaneá con tu celular</span>
                </div>

                <div className="p-3 bg-[#F3F5F9] rounded-2xl border border-[#C7CCD5]/50 inline-block shadow-inner">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Código QR para subir fotos de la fiesta"
                      className="w-52 h-52 sm:w-60 sm:h-60 rounded-xl mx-auto object-contain"
                    />
                  ) : (
                    <div className="w-52 h-52 flex items-center justify-center text-gray-400">
                      Cargando QR...
                    </div>
                  )}
                </div>

                <p className="mt-3.5 text-xs text-gray-500 font-medium max-w-[220px] mx-auto">
                  Apuntá la cámara de tu celular a este código para subir tus fotos directo.
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-[#061D60] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#0833A2]" />
                  <span>¡Sin descargar ninguna app!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Info and Direct Upload Button */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C7CCD5]/60 shadow-lg space-y-5">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#061D60] flex items-center gap-2.5">
                <span className="p-2 bg-[#0833A2]/10 rounded-xl text-[#0833A2]">
                  <Share2 className="w-5 h-5 animate-gentle-bounce" />
                </span>
                ¿Cómo funciona el álbum en vivo?
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0833A2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    1
                  </span>
                  <div>
                    <strong className="text-[#061D60]">Sacá fotos y videos:</strong> Capturá momentos divertidos, la tanda de baile, los selfies con la cumpleañera y la mesa dulce.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0833A2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    2
                  </span>
                  <div>
                    <strong className="text-[#061D60]">Escaneá o subí desde aquí:</strong> Usá el código QR con cualquier smartphone o apretá el botón para cargarlas al instante.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0833A2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    3
                  </span>
                  <div>
                    <strong className="text-[#061D60]">Aparecen en el muro:</strong> Todos los invitados y la agasajada podrán ver los recuerdos compartidos.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#0833A2] to-[#061D60] hover:brightness-110 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-[#0833A2]/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Upload className="w-4 h-4 animate-float" />
                  <span>Subir una foto ahora</span>
                </button>

                <a
                  href={uploadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#F3F5F9] hover:bg-[#C7CCD5]/40 text-[#061D60] border border-[#C7CCD5] font-semibold text-sm rounded-2xl transition-all active:scale-95"
                >
                  <ExternalLink className="w-4 h-4 text-[#0833A2]" />
                  <span>Ver en Google Photos</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Photo Wall / Gallery Preview */}
        <div>
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
