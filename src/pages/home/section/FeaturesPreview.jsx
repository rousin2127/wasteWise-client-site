import React from 'react';
import { Link } from 'react-router';

const features = [
  { icon: '📅', title: 'Scheduled Pickup', desc: 'Automatic weekly waste collection on your chosen days.' },
  { icon: '📦', title: 'On-Demand Request', desc: 'One-time pickup for events, heavy or special waste.' },
  { icon: '💳', title: 'Online Payment', desc: 'Pay via bKash, Rocket, Nagad or Card instantly.' },
  { icon: '📱', title: 'QR Gate Scan', desc: 'Unique QR at each home for verified collection.' },
  { icon: '🗺️', title: 'Route Optimization', desc: 'Collectors get optimized routes on Google Maps.' },
  { icon: '📝', title: 'Complaints & Rating', desc: 'Report missed pickups and rate service quality.' },
];

const FeaturesPreview = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Everything You Need for Clean Cities</h2>
          <p className="text-slate-600 mt-4">From doorstep pickup to digital payments — WasteWise handles it all.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-bold text-lg mt-4 text-slate-800 group-hover:text-emerald-600 transition-colors">{f.title}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/features" className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-0">
            View All Features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;
