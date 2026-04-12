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
  let userName = session.user.name || "Driver";
  
  // NEW: Instead of singular variables, we use an array to hold all active bookings!
  let activeBookings: any[] = [];

  try {
    // 1. Fetch User Data (Wallet Balance & Name)
    const usersRef = db.collection('users');
    const userSnapshot = await usersRef.where('email', '==', session.user.email).get();

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      walletBalance = userData.walletBalance || 0;
      userName = userData.username || userName;
    }

    // 2. Fetch ALL Live Booking Data! (Removed the .limit(1))
    const bookingsRef = db.collection('bookings');
    const bookingSnapshot = await bookingsRef
      .where('userEmail', '==', session.user.email)
      .where('status', '==', 'active')
      .get();

    if (!bookingSnapshot.empty) {
      // Map all documents into our array
      activeBookings = bookingSnapshot.docs.map(doc => doc.data());
    }

  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
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

        {/* Changed grid layout to automatically adapt based on how many tickets exist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* 1. DYNAMIC WALLET CARD (Always visible) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group flex flex-col justify-between h-full">
            <div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-colors"></div>
              <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Wallet Balance</h3>
              <div className="text-4xl font-black text-white mb-6">
                ₹{walletBalance.toFixed(2)}
              </div>
            </div>
            <Link href="/wallet" className="w-full">
              <button className="w-full text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl hover:bg-emerald-500/20 transition-colors cursor-pointer">
                + Add Funds
              </button>
            </Link>
          </div>

          {/* 2. DYNAMIC TICKETS (Maps through every active booking) */}
          {activeBookings.length > 0 ? (
            activeBookings.map((booking, index) => (
              <div key={index} className="bg-blue-900/20 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)] backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden transition-all flex flex-col justify-between h-full">
                
                {/* Top Section: Spot & Status */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-blue-300 font-bold text-sm uppercase tracking-wider">Reserved Slot</h3>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  </div>
                  
                  <div className="text-5xl font-black text-white mb-1">{booking.spotId}</div>
                  
                  <div className="text-emerald-400 text-sm font-medium mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Ready for Arrival
                  </div>
                </div>

                {/* Bottom Section: ID Pass */}
                <div className="mt-6">
  <div className="bg-[#020617]/60 border border-blue-500/30 rounded-xl p-4 w-full shadow-inner flex justify-between items-center">
    
    {/* Left Side: Entry Pass ID */}
    <div className="text-left">
      <p className="text-[10px] text-blue-400 uppercase tracking-widest mb-1 font-bold">Entry Pass ID</p>
      <p className="text-lg sm:text-xl font-mono font-black text-cyan-400 tracking-wider">{booking.bookingId}</p>
    </div>

    {/* Subtle Vertical Divider */}
    <div className="w-px h-10 bg-blue-500/30 mx-3"></div>

    {/* Right Side: Duration */}
    <div className="text-right">
      <p className="text-[10px] text-blue-400 uppercase tracking-widest mb-1 font-bold">Duration</p>
      <p className="text-lg sm:text-xl font-black text-white">
        {booking.hours}
        <span className="text-xs sm:text-sm text-slate-400 font-medium ml-1">
          hr{booking.hours > 1 ? 's' : ''}
        </span>
      </p>
    </div>

  </div>
</div>
              </div>
            ))
          ) : (
            
            /* EMPTY STATE: Shown only if they have 0 bookings */
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center py-12 md:col-span-2 lg:col-span-2 h-full">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-xl font-bold text-slate-300 mb-2">No active bookings</div>
              <p className="text-slate-500 text-sm max-w-sm">You haven't reserved any spots yet. Check the live map to find parking.</p>
            </div>
            
          )}

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