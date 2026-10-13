import React, { useState } from 'react';
import { X, Users, Download, Trash2, CheckCircle2, XCircle, Search, Utensils, Music, Phone } from 'lucide-react';
import { RsvpEntry } from '../types';

interface GuestListModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RsvpEntry[];
  onDeleteRsvp: (id: string) => void;
  celebrantName: string;
}

export const GuestListModal: React.FC<GuestListModalProps> = ({
  isOpen,
  onClose,
  rsvps,
  onDeleteRsvp,
  celebrantName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const attendingList = rsvps.filter((r) => r.attending);
  const totalGuests = attendingList.reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const declinedList = rsvps.filter((r) => !r.attending);

  // Dietary counts
  const celiacCount = attendingList.filter((r) => r.dietPreference === 'celiac').length;
  const vegetarianCount = attendingList.filter((r) => r.dietPreference === 'vegetarian').length;
  const veganCount = attendingList.filter((r) => r.dietPreference === 'vegan').length;

  const filteredRsvps = rsvps.filter((r) =>
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.phone && r.phone.includes(searchTerm)) ||
    (r.songSuggestion && r.songSuggestion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCsv = () => {
    const headers = ['Nombre', 'Asistencia', 'Cant Personas', 'Menu', 'Detalle Dieta', 'Telefono', 'Cancion', 'Mensaje', 'Fecha'];
    const rows = rsvps.map((r) => [
      `"${r.fullName}"`,
      r.attending ? 'Sí' : 'No',
      r.guestsCount,
      r.dietPreference,
      `"${r.dietDetails || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.songSuggestion || ''}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `invitados-cumpleanos-${celebrantName.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#061D60]/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-[#C7CCD5]/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#061D60] to-[#0833A2] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <Users className="w-6 h-6 text-[#C7CCD5]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold">
                Lista de Confirmaciones
              </h3>
              <p className="text-xs text-[#C7CCD5] mt-0.5">
                Panel del Anfitrión • Fiesta de {celebrantName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-[#F3F5F9] border-b border-[#C7CCD5]/50 text-center">
          <div className="bg-white p-3 rounded-2xl border border-[#C7CCD5]/40 shadow-xs">
            <p className="text-[11px] font-bold uppercase text-gray-500">Personas Confirmadas</p>
            <p className="text-2xl font-bold text-[#0833A2] mt-0.5">{totalGuests}</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#C7CCD5]/40 shadow-xs">
            <p className="text-[11px] font-bold uppercase text-gray-500">Respuestas 'Sí'</p>
            <p className="text-2xl font-bold text-emerald-600 mt-0.5">{attendingList.length}</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#C7CCD5]/40 shadow-xs">
            <p className="text-[11px] font-bold uppercase text-gray-500">No Asistirán</p>
            <p className="text-2xl font-bold text-rose-500 mt-0.5">{declinedList.length}</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#C7CCD5]/40 shadow-xs">
            <p className="text-[11px] font-bold uppercase text-gray-500">Dietas Especiales</p>
            <p className="text-xs font-semibold text-gray-700 mt-1">
              {celiacCount} Sin TACC • {vegetarianCount} Veggie • {veganCount} Vegan
            </p>
          </div>
        </div>

        {/* Filter and search */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono o canción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0833A2]"
            />
          </div>

          <button
            onClick={handleExportCsv}
            className="sm:hidden p-2 text-gray-600 hover:text-[#0833A2] bg-gray-100 rounded-xl"
            title="Exportar CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Guest List Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No se encontraron confirmaciones registradas.
            </div>
          ) : (
            filteredRsvps.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-4 border border-[#C7CCD5]/60 hover:border-[#0833A2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {entry.attending ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <h4 className="text-sm font-bold text-[#061D60]">{entry.fullName}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        entry.attending
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {entry.attending ? `${entry.guestsCount} persona(s)` : 'No asiste'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    {entry.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#0833A2]" />
                        {entry.phone}
                      </span>
                    )}

                    {entry.dietPreference !== 'none' && (
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Utensils className="w-3 h-3" />
                        Dieta: {entry.dietPreference} {entry.dietDetails ? `(${entry.dietDetails})` : ''}
                      </span>
                    )}

                    {entry.songSuggestion && (
                      <span className="flex items-center gap-1 text-[#0833A2]">
                        <Music className="w-3 h-3" />
                        Canción: {entry.songSuggestion}
                      </span>
                    )}
                  </div>

                  {entry.message && (
                    <p className="text-xs italic text-gray-600 bg-[#F3F5F9] p-2 rounded-lg mt-1">
                      "{entry.message}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end sm:justify-center">
                  <button
                    onClick={() => onDeleteRsvp(entry.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-[#C7CCD5]/40 flex justify-between items-center text-xs text-gray-500">
          <span>Total de respuestas: {rsvps.length}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0833A2] text-white font-semibold rounded-xl hover:bg-[#061D60] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
