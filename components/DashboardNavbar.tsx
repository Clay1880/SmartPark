"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'; // <-- Added useSession!

export default function DashboardNavbar() {
  const { data: session } = useSession(); // Fetch the logged-in user
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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

  const isActive = (path: string) => pathname === path;
  
  // Helper to grab the first letter of their name for the avatar
  const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : "U";

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
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/locations" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/locations') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Live Lots
              </Link>
              <Link 
                href="/wallet" 
                className={`px-3 py-2 text-sm font-semibold transition-colors ${isActive('/wallet') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Wallet
              </Link>
            </div>
          </div>

          {/* Right Side: Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none transition-transform active:scale-95"
            >
              {/* Display Name on Desktop */}
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold text-white leading-tight">{session?.user?.name || "Driver"}</p>
              </div>

              {/* Dynamic Initials Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-md hover:shadow-lg transition-shadow">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center border border-[#020617] text-white font-bold">
                  {getInitials(session?.user?.name || "Driver")}
                </div>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-[#0f172a] border border-white/10 shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all">
                <div className="py-1">
                  
                  {/* Mobile-only User Info inside dropdown */}
                  <div className="px-4 py-3 border-b border-white/10 mb-1 md:hidden">
                    <p className="text-sm font-bold text-white truncate">{session?.user?.name || "Driver"}</p>
                    <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
                  </div>

                  <Link 
                    href="/history" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-cyan-400 font-medium hover:bg-white/5 hover:text-cyan-300 transition-colors"
                  >
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