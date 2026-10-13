import React, { useState } from 'react';
import { Disc3, ThumbsUp, Plus, Music2 } from 'lucide-react';
import { SuggestedSong } from '../types';

interface MusicPartySectionProps {
  initialSongs: SuggestedSong[];
}

export const MusicPartySection: React.FC<MusicPartySectionProps> = ({ initialSongs }) => {
  const [songs, setSongs] = useState<SuggestedSong[]>(() => {
    const saved = localStorage.getItem('party_songs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialSongs;
      }
    }
    return initialSongs;
  });

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [suggestedBy, setSuggestedBy] = useState('');
  const [votedSongIds, setVotedSongIds] = useState<string[]>([]);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSong: SuggestedSong = {
      id: `song-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim() || 'Varios artistas',
      suggestedBy: suggestedBy.trim() || 'Un amigo',
      votes: 1,
    };

    const updated = [newSong, ...songs];
    setSongs(updated);
    localStorage.setItem('party_songs', JSON.stringify(updated));
    setVotedSongIds([...votedSongIds, newSong.id]);

    setTitle('');
    setArtist('');
    setSuggestedBy('');
  };

  const handleVote = (id: string) => {
    if (votedSongIds.includes(id)) return;

    const updated = songs.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s));
    setSongs(updated);
    localStorage.setItem('party_songs', JSON.stringify(updated));
    setVotedSongIds([...votedSongIds, id]);
  };

  return (
    <section id="musica" className="py-20 px-4 bg-gradient-to-b from-[#F3F5F9] to-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0833A2]/10 border border-[#0833A2]/20 text-[#0833A2] text-xs font-semibold tracking-wider uppercase mb-3 animate-float">
            <Disc3 className="w-4 h-4 text-[#0833A2] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Música de la Fiesta</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#061D60]">
            ¿Qué tema no puede faltar?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
            ¡El DJ arma la playlist con las canciones que ustedes elijan! Sugerí tu tema favorito y votá los mejores.
          </p>
        </div>

        {/* Suggestion Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C7CCD5]/60 shadow-lg mb-10">
          <form onSubmit={handleAddSong} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
            <div className="sm:col-span-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-1.5">
                Nombre de la Canción *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Tacones Rojos"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F3F5F9] text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061D60] mb-1.5">
                Artista o Banda
              </label>
              <input
                type="text"
                placeholder="Ej: Sebastián Yatra"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F3F5F9] text-sm rounded-xl border border-[#C7CCD5] focus:outline-none focus:border-[#0833A2]"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0833A2] hover:bg-[#061D60] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Pedir Tema</span>
              </button>
            </div>
          </form>
        </div>

        {/* Songs Leaderboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {songs.map((song) => {
            const hasVoted = votedSongIds.includes(song.id);
            return (
              <div
                key={song.id}
                className="bg-white rounded-2xl p-4 border border-[#C7CCD5]/60 shadow-xs flex items-center justify-between gap-3 hover:border-[#0833A2] transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#F3F5F9] text-[#0833A2] flex items-center justify-center shrink-0">
                    <Music2 className="w-5 h-5 animate-gentle-bounce" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-[#061D60] truncate">{song.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                    <p className="text-[10px] text-[#0833A2] font-semibold mt-0.5">Por {song.suggestedBy}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleVote(song.id)}
                  disabled={hasVoted}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
                    hasVoted
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-[#F3F5F9] hover:bg-[#0833A2]/10 text-[#0833A2]'
                  }`}
                  title={hasVoted ? 'Ya votaste esta canción' : 'Votar canción'}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-emerald-600' : ''}`} />
                  <span className="text-[11px] font-bold mt-0.5">{song.votes}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
