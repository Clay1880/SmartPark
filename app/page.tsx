import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  // 1. Check if the user has an active 30-day cookie!
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* --- SMART NAVBAR --- */}
      <nav className="relative z-50 border-b border-white/10 bg-[#0f172a]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                ParkSmart
              </span>
            </Link>

            {/* Smart Authentication Buttons */}
            <div className="flex items-center gap-4">
              {session ? (
                // IF LOGGED IN: Show their name and a Dashboard button
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-slate-300 font-medium">
                    Welcome back, <span className="text-white">{session.user?.name || "Driver"}</span>
                  </span>
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] transform active:scale-95"
                  >
                    Go to Dashboard &rarr;
                  </Link>
                </div>
              ) : (
                // IF LOGGED OUT: Show the standard Login and Signup buttons
                <>
                  <Link 
                    href="/login" 
                    className="hidden sm:block px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/5 transition-all transform active:scale-95"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
          Never circle the block <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            looking for parking again.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Real-time IoT sensor data connects you to empty parking slots instantly. Book, park, and pay seamlessly with the ParkSmart network.
        </p>

        {session ? (
          <Link href="/locations" className="px-8 py-4 rounded-2xl bg-white text-[#020617] font-black text-lg hover:bg-slate-200 transition-all shadow-xl transform active:scale-95">
            View Live Map
          </Link>
        ) : (
          <Link href="/signup" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] transform active:scale-95">
            Get Started Now
          </Link>
        )}
      </main>

    </div>
  );
}