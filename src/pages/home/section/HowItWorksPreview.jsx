import React from 'react';
import { Link } from 'react-router';

const steps = [
  { step: '01', title: 'Register', desc: 'Sign up with email/phone, set holding number & map location.' },
  { step: '02', title: 'Schedule', desc: 'Get automatic weekly pickup or request on-demand collection.' },
  { step: '03', title: 'Collect', desc: 'Collector scans your QR code and marks waste as collected.' },
  { step: '04', title: 'Pay & Track', desc: 'Pay monthly bill online and track everything from dashboard.' },
];

const HowItWorksPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Simple Steps to a Cleaner Home</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative p-6 rounded-2xl border border-slate-100 bg-slate-50">
              <span className="text-5xl font-black text-emerald-100">{s.step}</span>
              <h3 className="font-bold text-lg text-slate-800 mt-2">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{s.desc}</p>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute -right-3 top-1/2 text-emerald-300 text-2xl">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/how-it-works" className="text-emerald-600 font-semibold hover:underline">
            Learn more about the process →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPreview;
