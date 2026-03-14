import { useState, useEffect } from 'react';
import GameForm from '../Components/GameForm';
import GameList from '../Components/GameList';
import Stats from '../Components/Stats';

export default function Home() {
  const [games, setGames] = useState(() => {
    const kayitliOyunlar = localStorage.getItem('oyunTakipVerisi');
    if (kayitliOyunlar) {
      return JSON.parse(kayitliOyunlar);
    } else {
      return [];
    }
  });

  // FİLTRELEME İÇİN STATE'LER
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [activePlatformFilter, setActivePlatformFilter] = useState('Tümü');
  const [sortBy, setSortBy] = useState('isim'); // isim, saat, platform
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc

  useEffect(() => {
    localStorage.setItem('oyunTakipVerisi', JSON.stringify(games));
  }, [games]);

  const handleAddGame = (newGame) => {
    const isDuplicate = games.some(
      (game) => 
        game.title.toLowerCase().trim() === newGame.title.toLowerCase().trim() &&
        game.platform === newGame.platform
    );

    if (isDuplicate) {
      alert(`Bu oyun zaten ${newGame.platform} platformu için listenizde mevcut!`);
      return; 
    }

    setGames([...games, newGame]);
  };

  const handleDeleteGame = (id) => {
    const updatedGames = games.filter(game => game.id !== id);
    setGames(updatedGames);
  };

  const handleUpdateGame = (id, newStatus) => {
    const updatedGames = games.map(game => {
      if (game.id === id) {
        return { ...game, status: newStatus };
      }
      return game;
    });
    setGames(updatedGames);
  };

  const handleUpdateHours = (id, newHours) => {
    const updatedGames = games.map(game => {
      if (game.id === id) {
        return { ...game, hoursPlayed: Number(newHours) };
      }
      return game;
    });
    setGames(updatedGames);
  };

  // FİLTRELEME MANTIĞI: Hem durum hem platform bazında filtreleme
  const filteredGames = games.filter((game) => {
    const statusMatch = activeFilter === 'Tümü' || game.status === activeFilter;
    const platformMatch = activePlatformFilter === 'Tümü' || game.platform === activePlatformFilter;
    return statusMatch && platformMatch;
  });

  // SIRALAMA FONKSİYONU
  const sortedGames = [...filteredGames].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'saat') {
      comparison = b.hoursPlayed - a.hoursPlayed; // Varsayılan azalan
    } else if (sortBy === 'isim') {
      comparison = a.title.localeCompare(b.title, 'tr');
    } else if (sortBy === 'platform') {
      comparison = a.platform.localeCompare(b.platform, 'tr');
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Platform listesini dinamik olarak al
  const platforms = ['Tümü', ...new Set(games.map(game => game.platform))];
  const statuses = ['Tümü', 'Oynanıyor', 'Bitti', 'İstek Listesinde'];

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-emerald-400">Oyun Takipçisi</h1>
        <p className="text-slate-400 mt-2">Koleksiyonunu ve oynama durumunu yönet.</p>
      </header>

      <Stats games={games} />

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-slate-800 p-4 rounded-xl shadow-lg h-fit border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Yeni Oyun Ekle</h2>
          <GameForm onAddGame={handleAddGame} />
        </div>

        <div className="md:col-span-2 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Oyun Koleksiyonum ({filteredGames.length})</h2>
          </div>

          {/* DURUM FİLTRELEME BUTONLARI */}
          {games.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 mb-2 font-semibold">DURUM</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {statuses.map((filterType) => (
                      <button
                        key={filterType}
                        onClick={() => setActiveFilter(filterType)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                          activeFilter === filterType
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {filterType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PLATFORM FİLTRELEME BUTONLARI */}
                <div>
                  <p className="text-xs text-slate-400 mb-2 font-semibold">PLATFORM</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setActivePlatformFilter(platform)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                          activePlatformFilter === platform
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIRALAMA FORMU */}
              <div className="mb-4 p-3 bg-slate-700 rounded-lg border border-slate-600">
                <p className="text-xs text-slate-400 mb-3 font-semibold">SIRALAMA</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Kriter</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setSortOrder('asc');
                      }}
                      className="w-full bg-slate-800 text-white text-sm rounded p-2 outline-none focus:ring-2 focus:ring-purple-500 border border-slate-600"
                    >
                      <option value="isim">İsim</option>
                      <option value="saat">Oynanan Saat</option>
                      <option value="platform">Platform</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Yön</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full bg-slate-800 text-white text-sm rounded p-2 outline-none focus:ring-2 focus:ring-purple-500 border border-slate-600"
                    >
                      <option value="asc">↑ Artan (A-Z, Düşük-Yüksek)</option>
                      <option value="desc">↓ Azalan (Z-A, Yüksek-Düşük)</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* LİSTEYE FİLTRELENMİŞ VE SIRALANAN OYUNLARI GÖNDERİYORUZ */}
          <GameList games={sortedGames} onDelete={handleDeleteGame} onUpdate={handleUpdateGame} onUpdateHours={handleUpdateHours} />
        </div>
      </main>
    </div>
  );
}