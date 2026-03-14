import { useState } from 'react';

export default function GameList({ games, onDelete, onUpdate, onUpdateHours }) {
  const [editingId, setEditingId] = useState(null);
  const [editHours, setEditHours] = useState('');

  const startEdit = (game) => {
    setEditingId(game.id);
    setEditHours(game.hoursPlayed);
  };

  const saveEdit = (gameId) => {
    onUpdateHours(gameId, editHours);
    setEditingId(null);
    setEditHours('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditHours('');
  };

  if (games.length === 0) {
    return <p className="text-sm text-slate-400">Henüz oyun eklemediniz. Sol taraftaki formu kullanabilirsiniz.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {games.map((game) => (
        <li key={game.id} className="bg-slate-700 p-4 rounded-lg flex justify-between items-center shadow-sm transition-all hover:bg-slate-600">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg text-white">{game.title}</h3>
              {/* OYNANAN SAATİ GÖSTER VEYA DÜZENLEMESİ */}
              {game.status !== 'İstek Listesinde' && (
                <div className="flex items-center gap-2">
                  {editingId === game.id ? (
                    <div className="flex items-center gap-1 bg-slate-800 rounded-full border border-slate-600 px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        value={editHours}
                        onChange={(e) => setEditHours(e.target.value)}
                        className="w-16 bg-slate-700 text-white text-xs rounded px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-500"
                        autoFocus
                      />
                      <span className="text-slate-400 text-xs">Saat</span>
                    </div>
                  ) : (
                    game.hoursPlayed > 0 && (
                      <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full border border-slate-600">
                        ⏱ {game.hoursPlayed} Saat
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
            
            <div className="text-sm text-slate-300 mt-2 flex items-center gap-2">
              <span className="bg-slate-800 px-2 py-1 rounded text-xs border border-slate-600">{game.platform}</span>
              
              <select
                value={game.status}
                onChange={(e) => onUpdate(game.id, e.target.value)}
                className="bg-slate-800 text-emerald-400 text-xs font-semibold px-2 py-1 rounded border border-slate-600 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Oynanıyor">Oynanıyor</option>
                <option value="Bitti">Bitti</option>
                <option value="İstek Listesinde">İstek Listesinde</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            {game.status !== 'İstek Listesinde' && (
              <>
                {editingId === game.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(game.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-3 rounded transition-colors"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-slate-600 hover:bg-slate-500 text-white text-sm font-semibold py-2 px-3 rounded transition-colors"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(game)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded transition-colors"
                    title="Saati Düzenle"
                  >
                    ✎
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => onDelete(game.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
            >
              Sil
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}