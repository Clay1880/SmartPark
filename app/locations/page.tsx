"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Spot = {
  id: string;
  isAvailable: boolean;
  isHardwareSensor: boolean;
};

// 1. We generate the grid outside the component. 
// This guarantees the data exists the exact millisecond the page loads!
const generateGrid = (): Spot[] => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];
  const initialSpots: Spot[] = [];

  rows.forEach((row) => {
    cols.forEach((col) => {
      const spotId = `${row}${col}`;
      const isRealSensor = spotId === "A1" || spotId === "A2" || spotId === "A3";
      
      // Deterministic fake-randomness. Because it doesn't use Math.random(), 
      // Next.js won't throw hydration errors, and it won't disappear on back navigation!
      const pseudoRandom = (row.charCodeAt(0) + col) % 3 !== 0; 
      
      initialSpots.push({
        id: spotId,
        isAvailable: isRealSensor ? true : pseudoRandom,
        isHardwareSensor: isRealSensor,
      });
    });
  });
  return initialSpots;
};

const INITIAL_SPOTS = generateGrid();

export default function LiveMapPage() {
  const router = useRouter();
  
  // 2. Initialize state directly with the pre-built grid (No useEffect needed)
  const [spots] = useState<Spot[]>(INITIAL_SPOTS);
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all');
  const [toastMessage, setToastMessage] = useState<{show: boolean, title: string, desc: string} | null>(null);

  // 3. Derived state: Always calculates perfectly without needing its own setState
  const availableCount = spots.filter((s) => s.isAvailable).length;

  const handleSpotClick = (spot: Spot) => {
    if (spot.isAvailable) {
      router.push(`/book/${spot.id}`);
    } else {
      setToastMessage({
        show: true,
        title: "Spot Unavailable",
        desc: `Parking slot ${spot.id} is currently occupied by another vehicle.`
      });
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center pt-24 px-4 pb-12 relative overflow-hidden font-sans selection:bg-blue-500/30">
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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight">AIT Main Campus Lot</h1>
            </div>
            <p className="text-slate-400 mt-1 text-sm">Static IoT sensor data view</p>
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
              <div className="w-4 h-4 rounded-md bg-emerald-500/20 border border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
              <span className="text-slate-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-white/5 border border-white/10"></div>
              <span className="text-slate-500">Occupied</span>
            </div>
          </div>

          <div className="flex bg-[#0f172a] border border-white/10 rounded-xl p-1 shadow-lg">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>All Spots</button>
            <button onClick={() => setFilter('available')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'available' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Available</button>
            <button onClick={() => setFilter('occupied')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'occupied' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Occupied</button>
          </div>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
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
                      : "bg-white/5 border-white/5 hover:border-rose-500/30 hover:bg-rose-500/5"
                    }
                    ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
                  `}
                >
                  <span className={`text-xl font-black tracking-tighter transition-colors ${spot.isAvailable ? "text-emerald-400" : "text-slate-500 group-hover:text-rose-400"}`}>
                    {spot.id}
                  </span>
                  {spot.isHardwareSensor && (
                    <div className="absolute top-2 right-2" title="Connected to ESP32">
                      <svg className={`w-3 h-3 ${spot.isAvailable ? "text-emerald-400" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  )}
                  {!spot.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none group-hover:opacity-20 transition-opacity">
                       <svg className="w-10 h-10 text-slate-400 group-hover:text-rose-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
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