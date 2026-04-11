// import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function TermsOfService() {
  const lastUpdated = "April 6, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <p>
          By accessing or using the ParkSmart platform, mobile application, or physical parking facilities equipped with our IoT sensor technology, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the service.
        </p>
      )
    },
    {
      id: "accounts",
      title: "2. Accounts & Digital Wallets",
      content: (
        <>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Wallet Funding:</strong> To use the automated parking gates, you must maintain a positive balance in your ParkSmart digital wallet or have a valid, authorized payment method linked to your account.</li>
            <li><strong>Auto-Deduction Authorization:</strong> By entering a ParkSmart facility, you explicitly authorize our system to calculate your parking duration via our ESP32 hardware sensors and automatically deduct the corresponding fee from your wallet upon exit.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and unique QR entry codes. ParkSmart is not liable for unauthorized use of your entry IDs.</li>
          </ul>
        </>
      )
    },
    {
      id: "facility-rules",
      title: "3. Facility Usage & Hardware",
      content: (
        <>
          <p className="mb-4">When using a parking lot managed by our software:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Hardware Tampering:</strong> Any attempt to tamper with, block, or damage the physical ESP32 sensor nodes, ultrasonic detectors, or boom barriers will result in immediate account termination and potential legal action.</li>
            <li><strong>Space Allocation:</strong> You must park exclusively within the designated lines of the slot you booked or were assigned. Our sensors map specific geometric areas; parking across multiple slots may result in double-billing or towing.</li>
            <li><strong>Overstaying:</strong> If you exceed your pre-booked time, the system will automatically transition you to the standard hourly rate until you reach the daily maximum cap.</li>
          </ul>
        </>
      )
    },
    {
      id: "liability",
      title: "4. Limitation of Liability",
      content: (
        <>
          <p className="mb-4"><strong>Park at your own risk.</strong> ParkSmart provides the software and sensor infrastructure to facilitate parking, but we do not assume liability for the physical facility.</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>We are not responsible for theft, loss, or damage to your vehicle or its contents while parked in a facility using our technology.</li>
            <li>We are not liable for delays caused by hardware failure, network outages, or boom barrier malfunctions, though our 24/7 support team will attempt to resolve such issues immediately via remote override.</li>
          </ul>
        </>
      )
    },
    {
      id: "refunds",
      title: "5. Refunds & Disputes",
      content: (
        <p>
          Pre-booked daily or overnight passes can be canceled for a full refund to your digital wallet up to 15 minutes before the scheduled arrival. Disputes regarding auto-deducted times must be submitted to our support team within 7 days of the parking session. We will cross-reference your claim with our PostgreSQL database logs and sensor telemetry to resolve the issue.
        </p>
      )
    },
    {
      id: "termination",
      title: "6. Termination",
      content: (
        <p>
          We reserve the right to suspend or terminate your account at any time, without notice, for conduct that we believe violates these Terms of Service, is harmful to other users, or damages our physical hardware infrastructure.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* <Navbar /> */}

      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-full h-[600px] opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[10%] w-[40vw] h-[40vw] bg-cyan-600 blur-[150px] rounded-full"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Service</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Last Updated: <span className="text-slate-200 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          
          {/* Decorative Corner Element */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-tl-3xl"></div>

          <div className="prose prose-invert prose-cyan max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
              Please read these terms carefully. They govern your use of the ParkSmart software, digital wallet ecosystem, and interactions with our physical IoT hardware infrastructure.
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full inline-block"></span>
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

        {/* Bottom Legal Contact Banner */}
        <div className="mt-16 text-center bg-[#0f172a] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-white mb-2">Legal Inquiries?</h3>
            <p className="text-slate-400 text-sm max-w-md">
              For questions regarding our terms of service, liability policies, or hardware agreements, please reach out to our legal team.
            </p>
          </div>
          <Link href="/contact" className="shrink-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/5">
            Contact Legal
          </Link>
        </div>

      </main>
    </div>
  );
}