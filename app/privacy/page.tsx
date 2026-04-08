import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const lastUpdated = "April 6, 2026";

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content: (
        <>
          <p className="mb-4">To provide our seamless auto-pay parking experience, we collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Account Data:</strong> Name, email address, and encrypted password.</li>
            <li><strong>Vehicle Data:</strong> License plate numbers or unique vehicle identifiers used for gate verification.</li>
            <li><strong>Financial Data:</strong> Digital wallet balances and transaction history. (Note: Actual credit card numbers are processed directly by our secure payment partners like Stripe, and never touch our servers).</li>
            <li><strong>Location & Usage Data:</strong> Entry and exit timestamps at specific ParkSmart locations.</li>
          </ul>
        </>
      )
    },
    {
      id: "iot-sensors",
      title: "2. IoT Hardware & Sensor Data",
      content: (
        <>
          <p className="mb-4">Transparency regarding our physical hardware is our top priority:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Distance, Not Video:</strong> Our ESP32 nodes and HC-SR04 sensors strictly measure physical distance using ultrasonic waves to determine if a slot is occupied. <strong>We do not use cameras, microphones, or facial recognition</strong> at the individual parking slot level.</li>
            <li><strong>Ephemeral Processing:</strong> Sensor telemetry is processed in real-time. Once your parking session is completed and billed, the minute-by-minute sensor pings are aggregated and anonymized.</li>
          </ul>
        </>
      )
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      content: (
        <>
          <p className="mb-4">We use the collected data strictly to operate and improve the ParkSmart platform:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>To verify your identity at parking gates using your encrypted UUID.</li>
            <li>To accurately calculate your parking duration and deduct the correct wallet amount.</li>
            <li>To send automated digital receipts and booking confirmations.</li>
            <li>To monitor hardware health and dispatch technicians if a sensor goes offline.</li>
          </ul>
        </>
      )
    },
    {
      id: "sharing",
      title: "4. Data Sharing & Third Parties",
      content: (
        <>
          <p className="mb-4">We do not sell your personal data. We only share information with trusted third parties essential to operating our service:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Cloud Providers:</strong> Secure database hosting (e.g., PostgreSQL/Supabase).</li>
            <li><strong>Payment Processors:</strong> To handle wallet top-ups and refunds securely.</li>
            <li><strong>Legal Compliance:</strong> If required by law enforcement with a valid subpoena or court order regarding a specific vehicle.</li>
          </ul>
        </>
      )
    },
    {
      id: "security",
      title: "5. Data Security",
      content: (
        <p>
          All data transmitted between your mobile app, our ESP32 hardware nodes, and our Next.js servers is encrypted using industry-standard TLS. Your unique gate-entry IDs are cryptographically hashed, ensuring they cannot be intercepted or duplicated.
        </p>
      )
    },
    {
      id: "rights",
      title: "6. Your Rights",
      content: (
        <p>
          You have the right to access, update, or delete your personal information at any time from your account dashboard. If you request account deletion, all associated vehicle and location history will be permanently anonymized or destroyed within 30 days.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50vw] h-[50vw] bg-blue-600 blur-[150px] rounded-full"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Last Updated: <span className="text-slate-200 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-tr-3xl"></div>

          <div className="prose prose-invert prose-blue max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-10">
              At ParkSmart, we believe that urban mobility should be frictionless, but never at the cost of your privacy. This policy outlines exactly what data our IoT sensors collect, how our software processes it, and the strict measures we take to protect it.
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full inline-block"></span>
                    {section.title}
                  </h2>
                  <div className="text-slate-300 leading-relaxed pl-5">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contact Banner */}
        <div className="mt-16 text-center bg-[#0f172a] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-white mb-2">Privacy Concerns?</h3>
            <p className="text-slate-400 text-sm max-w-md">
              If you have any questions about how we handle your data or our physical hardware, our Data Protection Officer is ready to help.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/5">
            Contact Privacy Team
          </Link>
        </div>

      </main>
    </div>
  );
}   