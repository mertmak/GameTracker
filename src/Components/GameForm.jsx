import { useState } from 'react';

export default function GameForm({ onAddGame }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [status, setStatus] = useState('Oynanıyor');
  const [hours, setHours] = useState(0); // Saat tutmak için yeni state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGame = {
      id: crypto.randomUUID(),
      title,
      platform,
      status,
      // İstek listesindeyse saati 0 kabul et, değilse girilen değeri al
      hoursPlayed: status === 'İstek Listesinde' ? 0 : Number(hours), 
    };

    onAddGame(newGame);
    
    // Formu temizle
    setTitle('');
    setHours(0);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">Oyun Adı</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-700 text-white rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Örn: Witcher 3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-700 text-white rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Mobil">Mobil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Durum</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-700 text-white rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Oynanıyor">Oynanıyor</option>
            <option value="Bitti">Bitti</option>
            <option value="İstek Listesinde">İstek Listesinde</option>
          </select>
        </div>
      </div>

      {/* SADECE OYNANIYOR VEYA BİTTİ SEÇİLİYSE SAAT GİRİŞİ GÖSTERİLSİN */}
      {status !== 'İstek Listesinde' && (
        <div>
          <label className="block text-sm text-slate-400 mb-1">Oynama Süresi (Saat)</label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full bg-slate-700 text-white rounded p-2 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Örn: 45"
          />
        </div>
      )}

      <button
        type="submit"
        className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition-colors"
      >
        Oyunu Ekle
      </button>
    </form>
  );
}