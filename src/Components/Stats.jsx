export default function Stats({ games }) {
  // Oyun sayılarını durumlarına göre hesaplıyoruz
  const total = games.length;
  const finished = games.filter(game => game.status === 'Bitti').length;
  const playing = games.filter(game => game.status === 'Oynanıyor').length;
  const wishlist = games.filter(game => game.status === 'İstek Listesinde').length;

  // Hiç oyun yoksa paneli gizle
  if (total === 0) return null;

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 mb-6 grid grid-cols-4 gap-4 text-center">
      <div className="bg-slate-700 p-3 rounded-lg">
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Toplam</p>
        <p className="text-2xl font-bold text-white">{total}</p>
      </div>
      <div className="bg-slate-700 p-3 rounded-lg">
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Bitenler</p>
        <p className="text-2xl font-bold text-emerald-400">{finished}</p>
      </div>
      <div className="bg-slate-700 p-3 rounded-lg">
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Oynanıyor</p>
        <p className="text-2xl font-bold text-blue-400">{playing}</p>
      </div>
      <div className="bg-slate-700 p-3 rounded-lg">
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">İstek Listesi</p>
        <p className="text-2xl font-bold text-yellow-400">{wishlist}</p>
      </div>
    </div>
  );
}