"use client";

import { useState } from 'react';
// import Navbar from '@/components/Navbar';

export default function HardwareSetup() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cppCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const components = [
    { name: 'ESP32 Dev Board', desc: 'The brain of the node with built-in Wi-Fi.', icon: '🔌', color: 'from-blue-500 to-cyan-400' },
    { name: 'HC-SR04 Sensor', desc: 'Ultrasonic sensor to detect car presence.', icon: '📡', color: 'from-purple-500 to-pink-500' },
    { name: 'Jumper Wires', desc: 'Standard Dupont wires (Female-to-Female).', icon: '🪢', color: 'from-emerald-400 to-teal-500' },
  ];

  const cppCode = `
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Your Next.js Production URL or Local IP
const char* serverName = "http://YOUR_NEXTJS_IP:3000/api/sensor";
const String secretKey = "YOUR_SECRET_KEY";
const String slotId = "slot_001"; // Change per ESP32

// HC-SR04 Pins
const int trigPin = 5;
const int echoPin = 18;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  long duration;
  int distance;
  
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; // Distance in cm
  
  // If distance < 50cm, a car is parked
  bool isOccupied = distance < 50 ? true : false;
  
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON Payload
    String jsonPayload = "{\"slotId\":\"" + slotId + "\", \"isOccupied\":" + String(isOccupied) + ", \"secretKey\":\"" + secretKey + "\"}";
    
    int httpResponseCode = http.POST(jsonPayload);
    http.end();
  }
  
  delay(5000); // Wait 5 seconds before next ping
}
`.trim();

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* <Navbar /> */}

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-4 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 backdrop-blur-md">
            Developer Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Integration</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Build your sensor nodes. Flash the firmware. Connect directly to your Next.js PostgreSQL database in real-time.
          </p>
        </div>

        {/* 3D Components Section */}
        <h2 className="text-3xl font-bold mb-8 text-center">Required Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 [perspective:1000px]">
          {components.map((comp) => (
            <div 
              key={comp.name}
              className="relative h-64 w-full group [transform-style:preserve-3d] cursor-pointer"
            >
              <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:[transform:rotateX(15deg)_rotateY(10deg)_scale(1.05)] shadow-xl group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.2)]">
                {/* Floating Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${comp.color} flex items-center justify-center text-4xl mb-4 shadow-lg transform transition-transform duration-500 group-hover:[transform:translateZ(40px)]`}>
                  {comp.icon}
                </div>
                {/* Floating Text */}
                <div className="transform transition-transform duration-500 group-hover:[transform:translateZ(20px)]">
                  <h3 className="text-xl font-bold mb-2 text-white">{comp.name}</h3>
                  <p className="text-slate-400 text-sm">{comp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wiring Table */}
        <div className="max-w-3xl mx-auto mb-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/30">1</span>
            Wiring Map
          </h2>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f172a]/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">HC-SR04 Pin</th>
                  <th className="px-6 py-4 font-semibold">ESP32 Pin</th>
                  <th className="px-6 py-4 font-semibold">Wire Color (Standard)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-400">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-rose-400">VCC</td>
                  <td className="px-6 py-4 font-mono text-white">VIN / 5V</td>
                  <td className="px-6 py-4">Red</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">TRIG</td>
                  <td className="px-6 py-4 font-mono text-white">GPIO 5</td>
                  <td className="px-6 py-4">Blue</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-amber-400">ECHO</td>
                  <td className="px-6 py-4 font-mono text-white">GPIO 18</td>
                  <td className="px-6 py-4">Yellow</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">GND</td>
                  <td className="px-6 py-4 font-mono text-white">GND</td>
                  <td className="px-6 py-4">Black</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Terminal */}
        <div className="max-w-4xl mx-auto relative group">
          {/* Deep Glow behind the terminal */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-500 -z-10"></div>
          
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-4 text-xs font-mono text-slate-400">main.cpp</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="text-xs font-bold px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2"
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
            
            {/* The Code */}
            <div className="p-6 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed bg-[#020617]/50">
              <pre><code>
                {cppCode.split('\n').map((line, i) => (
                  <div key={i} className="hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                    <span className="text-slate-600 select-none mr-4 w-6 inline-block text-right">{i + 1}</span>
                    {/* Basic syntax highlighting simulation */}
                    <span dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/#include/g, '<span class="text-pink-400">#include</span>')
                        .replace(/const char\*/g, '<span class="text-cyan-400">const char*</span>')
                        .replace(/String/g, '<span class="text-cyan-400">String</span>')
                        .replace(/int/g, '<span class="text-cyan-400">int</span>')
                        .replace(/long/g, '<span class="text-cyan-400">long</span>')
                        .replace(/void/g, '<span class="text-purple-400">void</span>')
                        .replace(/true/g, '<span class="text-orange-400">true</span>')
                        .replace(/false/g, '<span class="text-orange-400">false</span>')
                        .replace(/(\/\/.+)/g, '<span class="text-slate-500 italic">$1</span>') // Comments
                        .replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>') // Strings
                    }}></span>
                  </div>
                ))}
              </code></pre>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}