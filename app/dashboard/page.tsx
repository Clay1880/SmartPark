import DashboardNavbar from '@/components/DashboardNavbar';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/signup');
  }

  let walletBalance = 0;
  let activeParking = false;
  let currentSessionId = null;
  let userName = session.user.name || "Driver";

  // 4. Fetch the real, live data from Firebase Firestore
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', session.user.email).get();

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      walletBalance = userData.walletBalance || 0;
      activeParking = userData.activeParking || false;
      currentSessionId = userData.currentSessionId || null;
      userName = userData.username || userName;
    }
  } catch (error) {
    console.error("Error fetching user data from Firebase:", error);
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <DashboardNavbar />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName}</span>
          </h1>
          <p className="text-slate-400">Here is your parking status and account overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* DYNAMIC WALLET CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-colors"></div>
            <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Wallet Balance</h3>
            <div className="text-4xl font-black text-white mb-4">
              ₹{walletBalance.toFixed(2)}
            </div>
            <Link href="/wallet">
            <button className="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors cursor-pointer">
              + Add Funds
            </button>
            </Link>
          </div>

          {/* DYNAMIC ACTIVE PARKING CARD */}
          <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all
            ${activeParking ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/10'}
          `}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">Active Parking</h3>
              {activeParking && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </div>

            {activeParking ? (
              <>
                <div className="text-2xl font-bold text-white mb-1">Vehicle Parked</div>
                <div className="text-slate-400 text-sm mb-4">Session Active • Auto-pay enabled</div>
                <div className="text-blue-400 text-sm font-mono bg-blue-500/10 px-3 py-1.5 rounded inline-block border border-blue-500/20">
                  ID: {currentSessionId || 'PENDING'}
                </div>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-slate-300 mb-2 mt-4">No vehicle parked</div>
                <p className="text-slate-500 text-sm">Your vehicle is currently not detected in any ParkSmart facility.</p>
              </>
            )}
          </div>

          {/* HISTORY CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Total Time Parked</h3>
            <div className="text-4xl font-black text-white mb-4">0<span className="text-xl text-slate-500 font-medium ml-1">hrs</span></div>
            <p className="text-sm text-slate-400">Your parking history will appear here.</p>
          </div>

        </div>

        <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need a spot right now?</h2>
            <p className="text-slate-400">Check live sensor data to find empty slots near you.</p>
          </div>
          <Link href="/locations" className="shrink-0 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform active:scale-[0.98]">
            View Live Map
          </Link>
        </div>

      </main>
    </div>
  );
}