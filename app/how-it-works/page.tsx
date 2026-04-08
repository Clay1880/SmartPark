import Navbar from '@/components/Navbar';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Hardware Detection',
      desc: 'ESP32 IoT sensors instantly detect when a vehicle leaves a slot.',
      icon: '📡',
      gradient: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/50',
    },
    {
      num: '02',
      title: 'Cloud Sync',
      desc: 'Status updates are beamed to our secure PostgreSQL database in milliseconds.',
      icon: '☁️',
      gradient: 'from-indigo-500 to-purple-500',
      glow: 'shadow-purple-500/50',
    },
    {
      num: '03',
      title: 'Instant Booking',
      desc: 'You see the green slot on your app, tap, and lock it in.',
      icon: '📱',
      gradient: 'from-emerald-400 to-teal-400',
      glow: 'shadow-teal-500/50',
    },
    {
      num: '04',
      title: 'Secure Entry',
      desc: 'Scan your unique encrypted ID at the gate. The barrier opens.',
      icon: '🔐',
      gradient: 'from-orange-500 to-rose-500',
      glow: 'shadow-rose-500/50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />
      
      {/* 3D Fixed Background - Scrollbar Fixed! */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 w-[200vw] h-[150vh] [transform:rotateX(70deg)_translateY(-20%)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_40%,transparent_100%)] opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
      </div>

      <main className="relative z-10 pt-32 pb-32 px-4 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Works</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            From sensor to barrier. A seamless pipeline powered by Next.js and IoT.
          </p>
        </div>

        {/* 3D Timeline Container */}
        <div className="relative w-full [perspective:2000px]">
          
          {/* Center Glowing Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent md:-translate-x-1/2 rounded-full blur-[1px]"></div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={step.num}
                  className={`relative flex flex-col md:flex-row items-center w-full group pl-20 md:pl-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Timeline Node / Dot */}
                  <div className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-4 border-slate-700 group-hover:border-white transition-colors duration-300 z-20 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} shadow-[0_0_15px_rgba(255,255,255,0.8)]`}></div>
                  </div>

                  {/* 3D Card Container */}
                  <div className="w-full md:w-1/2 flex justify-center md:px-12 [transform-style:preserve-3d]">
                    <div 
                      className="relative w-full max-w-md h-72 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-700 ease-out 
                      group-hover:[transform:rotateX(10deg)_rotateY(calc(var(--tilt-y,1)*-10deg))_scale(1.05)] 
                      [transform-style:preserve-3d] cursor-pointer"
                      style={{ '--tilt-y': isEven ? 1 : -1 } as React.CSSProperties}
                    >
                      
                      {/* Deep Glowing Shadow underneath the card */}
                      <div className={`absolute -inset-2 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition duration-700 bg-gradient-to-r ${step.gradient} -z-10 [transform:translateZ(-50px)]`}></div>
                      
                      {/* Floating Content (Notice the translateZ) */}
                      <div className="relative h-full flex flex-col justify-between [transform:translateZ(40px)]">
                        
                        <div className="flex justify-between items-start">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl shadow-lg ${step.glow}`}>
                            {step.icon}
                          </div>
                          <span className="text-7xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-500 tracking-tighter">
                            {step.num}
                          </span>
                        </div>
                        
                        <div className="mt-auto">
                          <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                          <p className="text-slate-400 text-base leading-relaxed">{step.desc}</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2"></div>

                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}