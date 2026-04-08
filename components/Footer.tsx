"use client"
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] text-slate-400 pt-16 pb-8 overflow-hidden border-t border-white/10 font-sans">
      
      {/* Subtle Top Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                ParkSmart
              </span>
            </Link>
            <p className="text-sm leading-relaxed pr-4">
              Revolutionizing urban mobility with real-time IoT sensor integration. Find, book, and secure your parking spot in seconds.
            </p>
            {/* Social Icons (Placeholders) */}
            <div className="flex gap-4 pt-2">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href={`#${social}`} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-white transition-all">
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/how-it-works" className="hover:text-blue-400 transition-colors">How it Works</Link></li>
              <li><Link href="/locations" className="hover:text-blue-400 transition-colors">Live Locations</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link href="/hardware" className="hover:text-blue-400 transition-colors">ESP32 Setup Guide</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Get the latest updates on new parking zones and hardware features.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-lg bg-[#0f172a]/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />
              <button 
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} ParkSmart. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Systems Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}