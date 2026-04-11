"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 1. Hide this public navbar on ALL authenticated app pages
  const appPages = ["/dashboard", "/locations", "/livelots", "/wallet", "/profile"];
  
  if (appPages.some(page => pathname.startsWith(page))) {
    return null; 
  }

  return (
    <nav className="relative z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              ParkSmart
            </span>
          </Link>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {session ? (
              // IF LOGGED IN: Smart Dashboard button (prevents overlap on mobile)
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-slate-300 font-medium">
                  Welcome back, <span className="text-white">{session.user?.name || "Driver"}</span>
                </span>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-500 hover:to-cyan-400 transition-all text-sm sm:text-base shadow-md whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Go to </span>Dashboard &rarr;
                </Link>
              </div>
            ) : (
              // IF LOGGED OUT: Desktop Buttons & Mobile Hamburger
              <>
                {/* Desktop view (Hidden on mobile) */}
                <div className="hidden sm:flex items-center gap-4">
                  <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                    Sign in
                  </Link>
                  <Link href="/signup" className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/5 transition-all">
                    Create Account
                  </Link>
                </div>

                {/* Mobile view: Hamburger Icon */}
                <button
                  type="button"
                  className="sm:hidden p-2 text-slate-300 hover:text-white focus:outline-none relative z-60"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)} 
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {!session && isMobileMenuOpen && (
        <div className="sm:hidden absolute top-20 left-0 w-full bg-[#0f172a] border-b border-white/10 shadow-2xl py-6 px-4 flex flex-col gap-4 z-[100]">
          <Link 
            href="/login" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center px-5 py-4 text-lg font-semibold text-white bg-white/5 rounded-xl border border-white/10 active:bg-white/10 transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href="/signup" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center px-5 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl active:opacity-80 transition-opacity"
          >
            Create Account
          </Link>
        </div>
      )}
    </nav>
  );
}