import React from 'react';
import { Link } from 'react-router';
import PageBanner from '../../components/shared/PageBanner';

const residentFeatures = [
  { icon: '📧', title: 'Email / Phone Registration', desc: 'Sign up with email or mobile number and OTP verification support.' },
  { icon: '📍', title: 'Location Pin', desc: 'Set holding/flat number and Google Map location for accurate pickup.' },
  { icon: '📅', title: 'Regular Schedule', desc: 'Automatic weekly collection on fixed days (e.g. Monday & Thursday).' },
  { icon: '📦', title: 'On-Demand Pickup', desc: 'Request one-time collection for events, heavy waste, e-waste, organic or plastic.' },
  { icon: '💳', title: 'Payment Gateway', desc: 'Pay monthly bills via bKash, Rocket, Nagad or Card with instant receipt.' },
  { icon: '📝', title: 'Complaints & Rating', desc: 'Report missed pickups and rate collector service from your dashboard.' },
  { icon: '📱', title: 'House QR Code', desc: 'Unique QR at your gate — collector scans to auto-mark waste collected.' },
  { icon: '📊', title: 'Bill Dashboard', desc: 'View current bill status, due amount, and payment history.' },
];

const collectorFeatures = [
  { icon: '🔐', title: 'Secure Login', desc: 'Admin-provided staff ID and password for field workers.' },
  { icon: '🗺️', title: 'Route Dashboard', desc: 'See today\'s assigned zone, vehicle, and full stop list.' },
  { icon: '🧭', title: 'Google Maps Navigation', desc: 'One-tap navigation to each resident\'s location.' },
  { icon: '✅', title: 'Status Updates', desc: 'Mark pickups as Collected, Skipped, or Locked with photo proof.' },
  { icon: '📷', title: 'QR Scanner', desc: 'Industry-standard QR scan at gate for verified collection.' },
];

const adminFeatures = [
  { icon: '👥', title: 'User Management', desc: 'Activate, deactivate, and manage residents and collectors.' },
  { icon: '📍', title: 'Zone & Route Management', desc: 'Divide city into zones, assign collectors and vehicles.' },
  { icon: '✔️', title: 'On-Demand Approval', desc: 'Review requests, set price, and assign collector.' },
  { icon: '📈', title: 'Analytics Dashboard', desc: 'Track revenue, dues, daily pickups, and 7-day charts.' },
  { icon: '🛠️', title: 'Complaint Resolution', desc: 'View and resolve resident complaints with admin notes.' },
];

const FeatureGroup = ({ title, items }) => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">{title}</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((f) => (
        <div key={f.title} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-3xl">{f.icon}</span>
          <h3 className="font-bold mt-3 text-slate-800">{f.title}</h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const Features = () => {
  return (
    <div>
      <PageBanner title="Features" subtitle="Complete waste management platform for residents, collectors, and city administrators." />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <FeatureGroup title="👤 Resident Features" items={residentFeatures} />
        <FeatureGroup title="🚛 Collector Features" items={collectorFeatures} />
        <FeatureGroup title="👑 Admin Features" items={adminFeatures} />

        <div className="text-center mt-8">
          <Link to="/register" className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-0">
            Start Using WasteWise
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
