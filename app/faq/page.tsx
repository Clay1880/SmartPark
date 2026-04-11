"use client";

import { useState } from 'react';
// import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Parking & Booking',
      question: 'How does the auto-pay system actually work?',
      answer: 'Our system uses ESP32 IoT sensors located at every parking slot and gate. When you load funds into your ParkSmart digital wallet and enter the lot, the system starts a timer. When you leave, the gate sensor detects your exit and automatically deducts the exact amount for the time you spent. No physical tickets required.'
    },
    {
      category: 'Parking & Booking',
      question: 'What happens if I stay longer than my pre-booked time?',
      answer: 'Don\'t panic! If your meeting runs late, the system simply transitions you to our standard hourly rate. If you stay long enough, your rate will automatically cap at the $15.00 Daily Maximum, ensuring you never overpay.'
    },
    {
      category: 'Security & Hardware',
      question: 'Is my unique entry ID secure?',
      answer: 'Yes. Your entry ID is a randomly generated, cryptographically secure UUID that is linked directly to our PostgreSQL database. It is only valid for a single entry and exit cycle, making it impossible for someone else to copy or reuse your QR code.'
    },
    {
      category: 'Security & Hardware',
      question: 'What happens if the sensor or boom barrier fails?',
      answer: 'We have built-in fail-safes. If a hardware node loses connection, our command center is instantly notified. Every gate is equipped with a manual override button, and our 24/7 remote support team can manually verify your booking and open the gate via the cloud.'
    },
    {
      category: 'Account & Billing',
      question: 'Can I get a refund if I cancel my pre-booked slot?',
      answer: 'Yes! You can cancel any pre-booked daily or overnight pass up to 15 minutes before your scheduled arrival time for a full, automatic refund back to your digital wallet.'
    },
    {
      category: 'Account & Billing',
      question: 'How do I get receipts for business expenses?',
      answer: 'A detailed digital receipt is automatically emailed to you the moment your vehicle exits the lot. You can also download a PDF summary of all your parking history from your account dashboard.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* <Navbar /> */}

      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vh] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Questions</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about our smart sensors, billing, and how to park seamlessly.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md
                  ${isOpen 
                    ? 'bg-white/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
              >
                {/* FIX: Changed to type="button" to prevent form behaviors, 
                  and increased padding (px-4 py-5 md:px-6) for better mobile tapping. 
                */}
                <button 
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 md:px-6 py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <div className="pr-4">
                    <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2 block">
                      {faq.category}
                    </span>
                    <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`relative w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 
                    ${isOpen ? 'bg-blue-500 border-blue-400 rotate-180' : 'bg-transparent border-white/20 group-hover:border-white/50 rotate-0'}
                  `}>
                    <div className="absolute w-3 h-[2px] bg-white rounded-full"></div>
                    <div className={`absolute w-[2px] h-3 bg-white rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                  </div>
                </button>

                {/* FIX: Changed max-h-48 to max-h-[1000px] so it never cuts off text on mobile phones.
                */}
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100 pb-6 px-4 md:px-6' : 'max-h-0 opacity-0 px-4 md:px-6 overflow-hidden'
                  }`}
                >
                  <div className="w-full h-px bg-white/10 mb-5"></div>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-b from-[#0f172a] to-transparent rounded-3xl border border-white/10 p-8 md:p-10 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/30">
            <span className="text-2xl">🤔</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Can't find the answer you're looking for? Our support team is currently operational and ready to help.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1">
            Contact Support
          </Link>
        </div>

      </main>
    </div>
  );
}