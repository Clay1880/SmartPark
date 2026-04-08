"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- We added this!
import { signOut } from 'next-auth/react';

export default function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get the current URL path
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo and Links */}
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                ParkSmart
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {/* Dynamic Links! They change color based on the URL */}
              <a 
                href="/dashboard" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Dashboard
              </a>
              <a 
                href="/locations" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/locations') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Live Lots
              </a>
              <a 
                href="/wallet" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/wallet') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Wallet
              </a>
            </div>
          </div>

          {/* Right Side: Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-md hover:shadow-lg transition-shadow">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center border border-[#020617]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0f172a] border border-white/10 shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all">
                <div className="py-1">
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                    Profile Settings
                  </Link>
                  <Link href="/history" className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                    Parking History
                  </Link>
                  
                  <div className="h-px bg-white/10 my-1"></div>
                  
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}