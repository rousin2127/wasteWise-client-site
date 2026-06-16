import React from 'react';
import { Link } from 'react-router';

const roles = [
  {
    icon: '👤',
    title: 'Resident',
    desc: 'Request pickups, pay bills, file complaints, and get your unique house QR code.',
    features: ['Weekly schedule', 'On-demand pickup', 'bKash / Nagad pay', 'Complaint box'],
    link: '/register',
    cta: 'Join as Resident',
  },
  {
    icon: '🚛',
    title: 'Collector',
    desc: 'Get daily routes, navigate with maps, scan QR codes, and update pickup status.',
    features: ['Route dashboard', 'Google Maps nav', 'QR scanner', 'Photo proof upload'],
    link: '/contact',
    cta: 'Contact Admin',
  },
  {
    icon: '👑',
    title: 'Admin',
    desc: 'Manage zones, assign collectors, approve requests, and view analytics.',
    features: ['Zone management', 'User control', 'Finance dashboard', 'Complaint resolution'],
    link: '/login',
    cta: 'Admin Login',
  },
];

const RolesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">For Everyone</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Built for Three Roles</h2>
          <p className="text-slate-600 mt-4">Residents, collectors, and city admins — each gets a tailored experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((r) => (
            <div key={r.title} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <span className="text-5xl">{r.icon}</span>
              <h3 className="text-xl font-bold mt-4 text-slate-800">{r.title}</h3>
              <p className="text-slate-600 text-sm mt-2">{r.desc}</p>
              <ul className="mt-4 space-y-2">
                {r.features.map((f) => (
                  <li key={f} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to={r.link} className="btn btn-sm mt-6 bg-emerald-500 hover:bg-emerald-600 text-white border-0 w-full">
                {r.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
