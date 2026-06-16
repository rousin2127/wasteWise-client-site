import React from 'react';
import { Link } from 'react-router';
import PageBanner from '../../components/shared/PageBanner';

const steps = [
  {
    role: 'Resident',
    icon: '👤',
    steps: [
      'Register with email/phone, holding number & map location',
      'Get automatic weekly pickup schedule',
      'Request on-demand pickup when needed (events, heavy waste)',
      'Pay monthly bill via bKash, Rocket, Nagad or Card',
      'File complaint if pickup is missed',
    ],
  },
  {
    role: 'Collector',
    icon: '🚛',
    steps: [
      'Login with admin-provided staff ID & password',
      'View today\'s route and assigned homes',
      'Navigate to each stop using Google Maps',
      'Scan resident QR code or manually update status',
      'Upload photo proof for skipped/locked homes',
    ],
  },
  {
    role: 'Admin',
    icon: '👑',
    steps: [
      'Create zones and assign collectors + vehicles',
      'Generate daily collection routes per zone',
      'Approve on-demand requests with pricing',
      'Monitor finance, pickups, and analytics',
      'Resolve resident complaints',
    ],
  },
];

const HowItWorks = () => {
  return (
    <div>
      <PageBanner title="How It Works" subtitle="A simple workflow connecting residents, collectors, and city management." />
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {steps.map((group) => (
          <div key={group.role} className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <span className="text-5xl">{group.icon}</span>
              <h2 className="text-2xl font-bold text-slate-800 mt-4">{group.role}</h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {group.steps.map((step, i) => (
                <div key={step} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center p-10 rounded-2xl bg-emerald-50 border border-emerald-100">
          <h3 className="text-xl font-bold text-slate-800">Ready to get started?</h3>
          <p className="text-slate-600 mt-2">Register as a resident in under 2 minutes.</p>
          <Link to="/register" className="btn mt-4 bg-emerald-500 hover:bg-emerald-600 text-white border-0">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
