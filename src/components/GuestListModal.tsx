import React, { useState } from 'react';
import { X, Users, Download, Trash2, CheckCircle2, XCircle, Search, Music, Phone, FileSpreadsheet, Copy, Check, ExternalLink, Sparkles, Utensils } from 'lucide-react';
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
  const [sheetWebhookUrl, setSheetWebhookUrl] = useState(() => localStorage.getItem('google_sheet_webhook_url') || '');
  const [tempUrl, setTempUrl] = useState(sheetWebhookUrl);
  const [showSheetConfig, setShowSheetConfig] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!isOpen) return null;

  const scriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Fecha", "Nombre y Apellido", "Cant. Personas", "Teléfono / WhatsApp", "Canción", "Mensaje"]);
  }
  sheet.appendRow([data.fecha, data.nombre, data.personas, data.telefono, data.cancion, data.mensaje]);
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveSheetUrl = () => {
    const trimmed = tempUrl.trim();
    localStorage.setItem('google_sheet_webhook_url', trimmed);
    setSheetWebhookUrl(trimmed);
    alert('¡Enlace de Google Sheets guardado! A partir de ahora cada confirmación se registrará automáticamente en tu planilla.');
  };

  const handleSyncAllToSheet = async () => {
    if (!sheetWebhookUrl) return;
    setIsSyncing(true);
    try {
      for (const r of rsvps) {
        await fetch(sheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fecha: new Date(r.submittedAt).toLocaleString('es-UY'),
            nombre: r.fullName,
            personas: r.guestsCount,
            telefono: r.phone || '-',
            cancion: r.songSuggestion || '-',
            mensaje: r.message || '-',
          }),
        });
      }
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

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
              onClick={() => setShowSheetConfig(!showSheetConfig)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{sheetWebhookUrl ? 'Planilla Vinculada' : 'Vincular Google Sheets'}</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Excel / CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Sheets Live Configuration Box */}
        {showSheetConfig && (
          <div className="p-4 sm:p-5 bg-emerald-50/80 border-b border-emerald-200 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-700" />
                Vincular confirmaciones con Google Spreadsheet en vivo
              </span>
              <button
                onClick={() => setShowSheetConfig(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-emerald-900 leading-relaxed">
              Cada vez que un invitado confirme su lugar, sus datos se agregarán como una fila nueva en tu Google Sheet automáticamente.
            </p>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-200/80 space-y-2">
              <p className="font-semibold text-gray-800">Paso a paso fácil (1 minuto):</p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                <li>Creá una planilla vacía en Google Sheets con la cuenta del cumple.</li>
                <li>Hacé clic en <strong>Extensiones &gt; Apps Script</strong>, borrá lo que haya y pegá este código:</li>
              </ol>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0833A2] hover:bg-[#061D60] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '¡Código copiado!' : 'Copiar código para Apps Script'}</span>
                </button>
              </div>

              <ol start={3} className="list-decimal pl-5 space-y-1 text-gray-700 pt-1">
                <li>En Apps Script hacé clic en <strong>Implementar &gt; Nueva implementación</strong>. Seleccioná <strong>Aplicación web</strong>, en <em>Quién tiene acceso</em> poné <strong>Cualquiera</strong> y hacé clic en Implementar.</li>
                <li>Copiá la URL que te da Google y pegala acá abajo:</li>
              </ol>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="url"
                  placeholder="Pegá aquí la URL de tu Google Apps Script (https://script.google.com/...)"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#0833A2]"
                />
                <button
                  onClick={handleSaveSheetUrl}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-all cursor-pointer"
                >
                  Guardar
                </button>
              </div>

              {sheetWebhookUrl && (
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    ✓ Planilla conectada y activa
                  </span>
                  <button
                    onClick={handleSyncAllToSheet}
                    disabled={isSyncing}
                    className="text-xs text-[#0833A2] hover:underline font-semibold cursor-pointer"
                  >
                    {isSyncing ? 'Sincronizando...' : syncSuccess ? '¡Confirmaciones enviadas!' : 'Enviar todas las confirmaciones ahora'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

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
