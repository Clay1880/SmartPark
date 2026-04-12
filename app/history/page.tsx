import DashboardNavbar from '@/components/DashboardNavbar';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect('/login');

  let bookings: any[] = [];

  try {
    const bookingsRef = db.collection('bookings');
    // Fetch all bookings for this specific user
    const snapshot = await bookingsRef.where('userEmail', '==', session.user.email).get();
    
    if (!snapshot.empty) {
      // Map the data and sort by newest first using standard JS so we don't need Firebase composite indexes
      bookings = snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } catch (error) {
    console.error("Error fetching parking history:", error);
  }

  // Format date nicely (e.g., "Oct 24, 2025 • 2:30 PM")
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <DashboardNavbar />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <main className="relative z-10 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <div className="mb-10">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-4">&larr; Back to Dashboard</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Parking <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">History</span></h1>
          <p className="text-slate-400">View all your past and active parking sessions.</p>
        </div>
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No history yet</h3>
              <p className="text-slate-400 mb-6">You haven't made any parking reservations.</p>
              <Link href="/locations" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md">Book a Spot</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all ${booking.status === 'active' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="flex items-start md:items-center gap-4 mb-4 md:mb-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl border ${booking.status === 'active' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-white/5 text-slate-300 border-white/10'}`}>
                      {booking.spotId}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white font-mono">{booking.bookingId}</h4>
                        {booking.status === 'active' && <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">Active</span>}
                      </div>
                      <p className="text-sm text-slate-400">{formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-1 border-t border-white/10 md:border-0 pt-4 md:pt-0">
                    <div className="text-sm text-slate-400">{booking.hours} Hour{booking.hours > 1 ? 's' : ''}</div>
                    <div className="text-xl font-black text-emerald-400">₹{booking.totalCost}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}