import React from 'react';

const types = [
  { icon: '🌿', name: 'Organic', color: 'bg-green-100 text-green-700 border-green-200' },
  { icon: '♻️', name: 'Plastic', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { icon: '💻', name: 'E-Waste', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { icon: '🗑️', name: 'General', color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const WasteTypesSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Waste Categories</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">We Collect All Types of Waste</h2>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">Proper segregation helps recycling and keeps our city green.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {types.map((t) => (
            <div key={t.name} className={`p-8 rounded-2xl border ${t.color}`}>
              <span className="text-4xl">{t.icon}</span>
              <p className="font-bold text-lg mt-3">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WasteTypesSection;
