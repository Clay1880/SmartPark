"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Spot = {
  id: string;
  isAvailable: boolean;
  isHardwareSensor: boolean;
};

const generateBaseGrid = (): Spot[] => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const initialSpots: Spot[] = [];
  rows.forEach((row) => {
    cols.forEach((col) => {
      const spotId = `${row}${col}`;
      initialSpots.push({
        id: spotId,
        isAvailable: true, // Default to true, API will override this
        isHardwareSensor: spotId === "A1" || spotId === "A2" || spotId === "A3",
      });
    });
  });
  return initialSpots;
};

export default function LiveMapPage() {
  const router = useRouter();
  const [spots, setSpots] = useState<Spot[]>(generateBaseGrid());
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all');
  const [toastMessage, setToastMessage] = useState<{show: boolean, title: string, desc: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH LIVE DATA FROM DATABASE
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/slots/status");
        const data = await res.json();
        const occupiedIds = data.occupiedSpots || [];

        setSpots(prevSpots => 
          prevSpots.map(spot => ({
            ...spot,
            // A spot is available ONLY if it's NOT in the occupied list from DB
            isAvailable: !occupiedIds.includes(spot.id)
          }))
        );
      } catch (err) {
        console.error("Failed to sync map with database");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const availableCount = spots.filter((s) => s.isAvailable).length;

  const handleSpotClick = (spot: Spot) => {
    if (spot.isAvailable) {
      router.push(`/book/${spot.id}`);
    } else {
      setToastMessage({
        show: true,
        title: "Spot Occupied",
        desc: `Slot ${spot.id} has an active reservation.`
      });
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center pt-24 px-4 pb-12 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-rose-500/50 shadow-[0_10px_40px_rgba(244,63,94,0.2)] rounded-2xl p-4 flex items-start gap-4 max-w-md w-[90vw]">
            <div className="bg-rose-500/20 text-rose-400 p-2 rounded-full mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{toastMessage.title}</h4>
              <p className="text-slate-400 text-sm mt-1">{toastMessage.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-2">&larr; Back to Dashboard</Link>
            <h1 className="text-3xl font-extrabold tracking-tight">AIT Main Campus Lot</h1>
            <p className="text-slate-400 mt-1 text-sm">{isLoading ? "Syncing with database..." : "Live database status"}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-sm text-slate-400 font-medium mb-1">Available</p>
              <p className="text-3xl font-black text-emerald-400">{availableCount}</p>
            </div>
            <div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-sm text-slate-400 font-medium mb-1">Occupied</p>
              <p className="text-3xl font-black text-slate-300">{spots.length - availableCount}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-emerald-500/20 border border-emerald-500"></div>
              <span className="text-slate-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-white/5 border border-white/10"></div>
              <span className="text-slate-500">Occupied</span>
            </div>
          </div>

          <div className="flex bg-[#0f172a] border border-white/10 rounded-xl p-1 shadow-lg">
            {['all', 'available', 'occupied'].map((f) => (
              <button key={f} onClick={() => setFilter(f as any)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${filter === f ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className={`bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {spots.map((spot) => {
              const isVisible = filter === 'all' || (filter === 'available' && spot.isAvailable) || (filter === 'occupied' && !spot.isAvailable);
              return (
                <button
                  key={spot.id}
                  onClick={() => handleSpotClick(spot)}
                  className={`
                    relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                    ${spot.isAvailable 
                      ? "bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500/20 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                      : "bg-white/5 border-white/5 opacity-40 hover:border-rose-500/30"
                    }
                    ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
                  `}
                >
                  <span className={`text-xl font-black tracking-tighter ${spot.isAvailable ? "text-emerald-400" : "text-slate-500"}`}>{spot.id}</span>
                  {spot.isHardwareSensor && (
                    <div className="absolute top-2 right-2 text-blue-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-8 border-t-2 border-dashed border-white/20 pt-8 flex justify-center">
            <span className="text-slate-500 font-black tracking-[0.5em] uppercase text-sm">Driveway</span>
          </div>
        </div>
      </div>
    </div>
  );
}