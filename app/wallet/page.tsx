"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WalletPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const presetAmounts = [100, 500, 1000];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 10) {
      setError("Please enter a minimum amount of ₹10");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 1. Simulate a payment gateway delay (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Ping our new API route to update Firebase
      const res = await fetch("/api/wallet/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      if (!res.ok) throw new Error("Failed to add funds");

      // 3. Show the success checkmark
      setIsSuccess(true);

      // 4. Send them back to the dashboard after a brief moment
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh(); // Forces the dashboard to fetch the new Firebase balance!
      }, 1500);

    } catch (err) {
      setError("Transaction failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center pt-24 px-4 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-4">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Add Funds to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Wallet</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Simulate a top-up for your ParkSmart account.</p>
        </div>

        {/* The Glass Panel */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md flex flex-col justify-center items-center z-20 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-slate-400">₹{amount} added to your wallet.</p>
              <p className="text-sm text-slate-500 mt-4 animate-pulse">Redirecting...</p>
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-6">
            
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/50 rounded-lg p-3 text-sm text-rose-400 text-center font-medium">
                {error}
              </div>
            )}

            {/* Quick Select Buttons */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-3 block">Quick Select</label>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      amount === preset 
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label htmlFor="amount" className="text-sm font-medium text-slate-300 mb-2 block">
                Custom Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                  placeholder="0.00"
                  min="10"
                  className="w-full pl-10 pr-5 py-4 rounded-xl bg-[#020617]/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg font-bold"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Proceed to Pay"
              )}
            </button>

          </form>
        </div>
        
        {/* Mock Payment Disclaimer */}
        <p className="text-center mt-6 text-xs text-slate-500 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          This is a simulated payment gateway. No real money is charged.
        </p>

      </div>
    </div>
  );
}