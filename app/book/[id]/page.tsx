"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function BookSlotPage() {
  const router = useRouter();
  const params = useParams(); // This grabs the "A1" or "C4" directly from the URL!
  const spotId = params.id as string;

  const [hours, setHours] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<React.ReactNode>("");
  
  // NEW: State to hold the unique ID returned from the database
  const [bookingId, setBookingId] = useState<string | null>(null);

  const hourlyRate = 100; // ₹50 per hour
  const gst = Math.floor(0.18 * hours * hourlyRate)
  const totalCost = hours * hourlyRate + gst + 15;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spotId, hours, totalCost }),
      });

      // 1. SAFELY check if the response is JSON before trying to parse it
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await res.json() : null;

      // 2. If the backend rejected it (e.g. 400 Insufficient Funds)
      if (!res.ok) {
        setError(
          <span className="flex flex-col items-center gap-2 mt-1">
            <span>{data?.message || `Server Error: ${res.status}. Check your terminal.`}</span>
            <Link 
              href="/wallet" 
              className="inline-block bg-rose-500/20 border border-rose-500/50 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-rose-500/40 hover:scale-105 transition-all shadow-md"
            >
              Add funds to Wallet &rarr;
            </Link>
          </span>
        );
        setIsLoading(false);
        return; 
      }

      // Capture the ID and trigger the success screen!
      setBookingId(data.bookingId);
      setIsSuccess(true);
      
      // Increased to 4.5 seconds so they can see their ID
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 4500);

    } catch (err: any) {
      console.error("Booking Error:", err);
      setError("Network error. Please check your internet connection.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center pt-24 px-4 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/locations" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-4">
            &larr; Back to Live Map
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Reserve <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Slot {spotId}</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Secure your parking space instantly.</p>
        </div>

        {/* The Glass Panel */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md flex flex-col justify-center items-center z-20 animate-in fade-in duration-300 p-6">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4 border border-blue-500/50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Slot Confirmed!</h2>
              
              {/* THE DIGITAL TICKET UI */}
              <div className="bg-[#020617]/50 border border-white/10 rounded-xl p-5 my-4 w-full text-center shadow-inner">
                 <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Your Entry Pass</p>
                 <p className="text-3xl font-mono font-black text-cyan-400 tracking-wider">{bookingId}</p>
              </div>

              <p className="text-sm text-slate-400 text-center px-4">Show this ID at the parking entrance.</p>
              <p className="text-xs text-slate-500 mt-8 animate-pulse">Navigating to Dashboard...</p>
            </div>
          )}

          <form onSubmit={handleBooking} className="space-y-6">
            
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/50 rounded-lg p-3 text-sm text-rose-400 text-center font-medium">
                {error}
              </div>
            )}

            {/* Duration Selector */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-3 block">Estimated Duration</label>
              <div className="flex items-center justify-between bg-[#020617]/50 border border-white/10 rounded-xl p-2">
                <button 
                  type="button" 
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xl font-bold"
                >
                  -
                </button>
                <div className="text-xl font-black">
                  {hours} <span className="text-sm font-medium text-slate-400">Hour{hours > 1 ? 's' : ''}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setHours(Math.min(24, hours + 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Rate per hour</span>
                <span>₹{hourlyRate}.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Platform Fee</span>
                <span>₹15.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>GST(18%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                <span className="text-slate-300 font-medium">Total Cost</span>
                <span className="text-2xl font-black text-emerald-400">₹{totalCost}.00</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                "Confirm & Pay"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}