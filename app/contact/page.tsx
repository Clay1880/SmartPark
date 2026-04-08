"use client";
import Navbar from '@/components/Navbar';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our IoT parking integration or need support? Send us a message and our team will respond swiftly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Information (Takes up 2/5 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Info Card 1 */}
            <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl border border-blue-500/30">
                  📍
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Headquarters</h3>
                  <p className="text-slate-400">123 Innovation Drive<br/>Tech District, City 40001</p>
                </div>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl border border-cyan-500/30">
                  ✉️
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-slate-400">support@parksmart.io<br/>sales@parksmart.io</p>
                </div>
              </div>
            </div>

            {/* Info Card 3 */}
            <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl border border-indigo-500/30">
                  📞
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-slate-400">+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (Takes up 3/5 width on desktop) */}
          <div className="lg:col-span-3">
            <form 
              className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
              onSubmit={(e) => e.preventDefault()} // Prevents page reload for now
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-300 ml-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="John"
                    className="w-full px-5 py-4 rounded-xl bg-[#0f172a]/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-300 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Doe"
                    className="w-full px-5 py-4 rounded-xl bg-[#0f172a]/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 mb-6">
                <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 rounded-xl bg-[#0f172a]/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-xl bg-[#0f172a]/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}