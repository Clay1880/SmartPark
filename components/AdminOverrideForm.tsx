"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOverrideForm() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  const handleOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey) return;

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: 'error', message: data.message });
      } else {
        setStatus({ type: 'success', message: data.message });
        setPasskey(""); 
        router.refresh(); 
      }
    } catch (err) {
      setStatus({ type: 'error', message: "Network error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-rose-900/10 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 shadow-xl mb-12">
      <h3 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        Manual Override Console
      </h3>
      
      <form onSubmit={handleOverride} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter Passkey (e.g. PS-A1-X9K2)"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value.toUpperCase())}
          className="flex-1 bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-rose-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !passkey}
          className="px-8 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? "Processing..." : "Revoke Pass"}
        </button>
      </form>

      {status.message && (
        <div className={`mt-4 p-3 rounded-lg text-sm font-bold border ${status.type === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}