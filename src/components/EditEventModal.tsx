import React, { useState } from 'react';
import { X, Settings, Save, Sparkles } from 'lucide-react';
import { EventDetails } from '../types';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: EventDetails;
  onSave: (updated: EventDetails) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  details,
  onSave,
}) => {
  const [formData, setFormData] = useState<EventDetails>({ ...details });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#061D60]/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#C7CCD5]/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#061D60] to-[#0833A2] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-[#C7CCD5]" />
            <h3 className="text-xl font-serif font-bold">Personalizar Invitación</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#061D60] uppercase mb-1">
                Nombre de la Agasajada/o *
              </label>
              <input
                type="text"
                required
                value={formData.celebrantName}
                onChange={(e) => setFormData({ ...formData, celebrantName: e.target.value })}
                className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#061D60] uppercase mb-1">
                Título / Ocasión *
              </label>
              <input
                type="text"
                required
                value={formData.celebrationType}
                onChange={(e) => setFormData({ ...formData, celebrationType: e.target.value })}
                className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#061D60] uppercase mb-1">
              Frase Emotiva de Portada
            </label>
            <textarea
              rows={2}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-[#061D60] uppercase mb-1">
                Fecha del Evento *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.eventDate.slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#061D60] uppercase mb-1">
                Hora Recepción
              </label>
              <input
                type="text"
                value={formData.ceremonyTime || ''}
                onChange={(e) => setFormData({ ...formData, ceremonyTime: e.target.value })}
                className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#061D60] uppercase mb-1">
                Hora Fiesta / Cena
              </label>
              <input
                type="text"
                value={formData.partyTime}
                onChange={(e) => setFormData({ ...formData, partyTime: e.target.value })}
                className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-bold text-sm text-[#0833A2] mb-2">Lugar y Mapa</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">Nombre del Salón</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">Dirección y Localidad</label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-bold text-sm text-[#0833A2] mb-2">Datos para el Regalo (Popup)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">Alias Bancario</label>
                <input
                  type="text"
                  value={formData.bankDetails.alias}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, alias: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">CBU / CVU</label>
                <input
                  type="text"
                  value={formData.bankDetails.cbu}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, cbu: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">Titular</label>
                <input
                  type="text"
                  value={formData.bankDetails.holder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, holder: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#061D60] uppercase mb-1">Banco / Billetera</label>
                <input
                  type="text"
                  value={formData.bankDetails.bankName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-[#C7CCD5] rounded-xl focus:border-[#0833A2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0833A2] hover:bg-[#061D60] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
