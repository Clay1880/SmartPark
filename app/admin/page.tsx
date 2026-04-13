import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import AdminOverrideForm from '@/components/AdminOverrideForm';

export default async function AdminDashboard() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    }

    const ADMIN_EMAIL = "prince.singh.1887.1920@gmail.com";

    if (session.user.email !== ADMIN_EMAIL) {
        redirect('/dashboard');
    }

    let totalRevenue = 0;
    let activeCars = 0;
    let allBookings: any[] = [];
    let activeBookings: any[] = [];

    try {
        const bookingsRef = db.collection('bookings');
        const snapshot = await bookingsRef.get();

        if (!snapshot.empty) {
            allBookings = snapshot.docs
                .map(doc => doc.data())
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            allBookings.forEach(booking => {
                // Add up all the money made
                totalRevenue += booking.totalCost || 0;

                // Separate out the cars currently in the lot
                if (booking.status === 'active') {
                    activeCars++;
                    activeBookings.push(booking);
                }
            });
        }
    } catch (error) {
        console.error("Error fetching admin data:", error);
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-rose-500/30">

            {/* Admin Warning Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Simple Admin Navbar */}
            <nav className="relative z-50 border-b border-white/10 bg-[#0f172a]/50 backdrop-blur-md h-16 flex items-center px-4 sm:px-8 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="font-black tracking-widest uppercase text-rose-400 text-sm">Admin Control Center</span>
                </div>
                <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">Exit Admin &rarr;</Link>
            </nav>

            <main className="relative z-10 pt-12 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">

                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Overview</span>
                    </h1>
                    <p className="text-slate-400">Live metrics and facility status.</p>
                </div>

                {/* METRICS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Total Lifetime Revenue</h3>
                        <div className="text-4xl font-black text-emerald-400 mt-4">₹{totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-slate-500 mt-2">Gross volume processed</p>
                    </div>

                    <div className="bg-rose-900/10 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 shadow-[0_0_30px_rgba(244,63,94,0.05)] relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <h3 className="text-rose-400 font-bold text-sm uppercase tracking-wider">Live Occupancy</h3>
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                        </div>
                        <div className="text-5xl font-black text-white mt-3">{activeCars}</div>
                        <p className="text-xs text-slate-400 mt-2">Vehicles currently on campus</p>
                    </div>

                    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <h3 className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">Total Bookings</h3>
                        <div className="text-4xl font-black text-white mt-4">{allBookings.length}</div>
                        <p className="text-xs text-slate-500 mt-2">All-time reservations</p>
                    </div>

                </div>

                <AdminOverrideForm />

                {/* LIVE CARS ON CAMPUS */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    Active Vehicles
                    <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full font-black border border-rose-500/30">LIVE</span>
                </h2>

                <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl mb-12">
                    {activeBookings.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 font-medium">The lot is currently empty.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-slate-400">
                                        <th className="p-4 font-medium">Spot</th>
                                        <th className="p-4 font-medium">Entry ID</th>
                                        <th className="p-4 font-medium">User Email</th>
                                        <th className="p-4 font-medium text-right">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {activeBookings.map((booking, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <span className="bg-white/10 text-white font-black px-3 py-1.5 rounded-lg border border-white/10">{booking.spotId}</span>
                                            </td>
                                            <td className="p-4 font-mono text-cyan-400 font-bold">{booking.bookingId}</td>
                                            <td className="p-4 text-slate-300">{booking.userEmail}</td>
                                            <td className="p-4 text-right text-white font-bold">{booking.hours} hr{booking.hours > 1 ? 's' : ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}