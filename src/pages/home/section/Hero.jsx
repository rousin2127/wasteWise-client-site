import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium border border-emerald-500/30">
            🌿 Smart City Waste Management
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Clean Streets,
            <span className="text-emerald-400"> Clear Future</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
            WasteWise connects residents, collectors, and city admins — schedule pickups, pay bills online, and track waste collection in real time.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/register" className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105">
              Register as Resident
            </Link>
            <Link to="/how-it-works" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 backdrop-blur transition-all">
              See How It Works
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🏠', title: 'Residents', desc: 'Request & pay online' },
            { icon: '🚛', title: 'Collectors', desc: 'Route & QR scan' },
            { icon: '📊', title: 'Analytics', desc: 'Real-time tracking' },
            { icon: '♻️', title: 'Eco-Friendly', desc: 'Smart recycling' },
          ].map((card) => (
            <div key={card.title} className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition-all">
              <span className="text-3xl">{card.icon}</span>
              <p className="font-semibold mt-3">{card.title}</p>
              <p className="text-sm text-slate-400 mt-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
