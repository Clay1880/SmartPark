import Navbar from '@/components/Navbar';

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Quick Stop',
      type: 'Hourly Rate',
      price: '$2.00',
      period: '/ hour',
      description: 'Perfect for quick errands, meetings, or grabbing a coffee.',
      features: [
        'Pay exactly for the minutes you use',
        'Auto-deducts when you leave',
        'Instant receipt via email',
        '15-minute grace period'
      ],
      highlighted: false,
      buttonText: 'Add Funds to Wallet',
      gradient: 'from-slate-400 to-slate-500',
      glow: 'shadow-slate-500/20'
    },
    {
      name: 'Commuter Pass',
      type: 'Daily Maximum',
      price: '$15.00',
      period: '/ day',
      description: 'Park the whole day without worrying about hourly meters ticking.',
      features: [
        'Price caps automatically at $15',
        'Valid for 24 hours from entry',
        'Multiple entries/exits allowed',
        'Guaranteed spot with pre-booking'
      ],
      highlighted: true, // Pops out as the best deal
      buttonText: 'Pre-book a Day Pass',
      gradient: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/40'
    },
    {
      name: 'Night Owl',
      type: 'Overnight Rate',
      price: '$8.00',
      period: '/ night',
      description: 'Secure overnight parking from 8:00 PM to 8:00 AM.',
      features: [
        'Flat rate for the whole night',
        '24/7 security & lighting',
        'Extends to hourly rate after 8 AM',
        'Easy QR code gate access'
      ],
      highlighted: false,
      buttonText: 'Book Overnight',
      gradient: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-transparent blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-md">
            Pay only for what you use
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Simple, fair <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Pricing</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            No subscriptions. No hidden fees. Our IoT sensors track exactly when you arrive and leave, so you only pay for your actual time parked.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto mb-24">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2
                ${plan.highlighted 
                  ? `bg-white/10 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)] md:scale-105 z-10` 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
                } backdrop-blur-xl border`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-xs font-bold shadow-lg tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{plan.type}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-8 min-h-[40px]">{plan.description}</p>

              {/* Price Display */}
              <div className="mb-8 flex items-end gap-1">
                <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${plan.gradient}`}>
                  {plan.price}
                </span>
                <span className="text-slate-500 font-medium mb-2">{plan.period}</span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 min-h-[160px]">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 shrink-0 mt-0.5 text-transparent bg-clip-text bg-gradient-to-br ${plan.gradient}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl
                  ${plan.highlighted 
                    ? `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90` 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {plan.buttonText}
              </button>

            </div>
          ))}
        </div>

        {/* Seamless Payment Info Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-white">How IoT Auto-Pay Works</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Load money into your ParkSmart digital wallet. When you arrive, our ESP32 gate sensors verify your unique ID. When you leave, the system calculates your exact time and deducts the precise amount from your wallet. Zero tickets, zero waiting.
              </p>
              <button className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-2 transition-colors">
                Learn more about our technology 
                <span className="text-xl">→</span>
              </button>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative bg-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
                <span className="text-4xl">📱</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}