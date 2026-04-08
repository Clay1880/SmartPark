"use client";

import { useState } from 'react';
// 1. Import the Dashboard Navbar instead of the public one
import DashboardNavbar from '@/components/DashboardNavbar';

export default function LiveLocations() {
  const locations = [
    { id: 1, name: 'North Gate - Alpha', total: 50, available: 12, status: 'Active', coords: { top: '20%', left: '30%' } },
    { id: 2, name: 'Tech Park - Beta', total: 120, available: 5, status: 'High Traffic', coords: { top: '50%', left: '60%' } },
    { id: 3, name: 'Visitor Lot - Gamma', total: 30, available: 28, status: 'Active', coords: { top: '70%', left: '20%' } },
    { id: 4, name: 'Underground - Delta', total: 200, available: 0, status: 'Full', coords: { top: '30%', left: '80%' } },
  ];

  const [activeLocation, setActiveLocation] = useState(locations[0].id);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* 2. Use the Dashboard Navbar here */}
      <DashboardNavbar />

      <main className="relative z-10 pt-24 px-4 max-w-[1400px] mx-auto h-screen flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 pt-8 shrink-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Topology</span>
            </h1>
            <p className="text-slate-400">Live hardware telemetry and slot availability.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mt-4 md:mt-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400 tracking-wide">SYSTEMS ONLINE</span>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 min-h-0">
          
          {/* 3D Isometric Map Container */}
          <div className="lg:col-span-2 relative bg-[#0f172a]/50 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative w-[600px] h-[600px] [transform:rotateX(60deg)_rotateZ(-45deg)] [transform-style:preserve-3d] transition-transform duration-1000 ease-in-out">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 shadow-[0_0_50px_rgba(0,0,0,0.8)_inset]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/30 bg-blue-900/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"></div>

              {locations.map((loc) => {
                const isActive = activeLocation === loc.id;
                const isFull = loc.available === 0;

                return (
                  <div 
                    key={loc.id}
                    className="absolute [transform-style:preserve-3d] cursor-pointer group"
                    style={{ top: loc.coords.top, left: loc.coords.left }}
                    onClick={() => setActiveLocation(loc.id)}
                  >
                    <div className={`
                      w-12 h-12 relative transition-all duration-500 ease-out
                      ${isActive ? '[transform:translateZ(60px)]' : '[transform:translateZ(20px)] group-hover:[transform:translateZ(40px)]'}
                    `}>
                      <div className={`absolute inset-0 border ${isActive ? 'border-white' : 'border-white/30'} backdrop-blur-md 
                        ${isFull ? 'bg-rose-500/40' : 'bg-cyan-500/40'}
                        ${isActive ? (isFull ? 'shadow-[0_0_30px_rgba(244,63,94,0.8)]' : 'shadow-[0_0_30px_rgba(6,182,212,0.8)]') : ''}
                      `}></div>
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[2px] 
                        ${isActive ? 'h-[60px]' : 'h-[20px] group-hover:h-[40px]'} 
                        ${isFull ? 'bg-gradient-to-b from-rose-500' : 'bg-gradient-to-b from-cyan-500'} to-transparent transition-all duration-500
                      `}></div>
                    </div>

                    <div className={`
                      absolute left-full top-0 ml-4 whitespace-nowrap [transform:rotateX(-90deg)_rotateY(45deg)] origin-left transition-opacity duration-300
                      ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}>
                      <div className="bg-slate-900/80 border border-white/20 px-3 py-1 rounded text-sm font-bold shadow-xl backdrop-blur-md">
                        {loc.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="bg-[#0f172a]/50 rounded-3xl border border-white/10 p-6 shadow-2xl overflow-y-auto flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b border-white/10 pb-4 mb-2">Zone Status</h2>
            
            {locations.map((loc) => {
              const isActive = activeLocation === loc.id;
              const isFull = loc.available === 0;
              const isLow = loc.available > 0 && loc.available <= 10;

              return (
                <div 
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`
                    p-5 rounded-2xl border cursor-pointer transition-all duration-300
                    ${isActive ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform scale-[1.02]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{loc.name}</h3>
                      <p className="text-slate-400 text-sm font-mono mt-1">ID: {loc.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                      ${isFull ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 
                        isLow ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}
                    `}>
                      {loc.status}
                    </span>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Available Slots</div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-black ${isFull ? 'text-rose-400' : 'text-white'}`}>
                          {loc.available}
                        </span>
                        <span className="text-slate-500 font-medium">/ {loc.total}</span>
                      </div>
                    </div>
                    
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isFull ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${(loc.available / loc.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}