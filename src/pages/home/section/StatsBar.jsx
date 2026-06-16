import React from 'react';

const StatsBar = () => {
  const stats = [
    { value: '10K+', label: 'Homes Served' },
    { value: '500+', label: 'Daily Pickups' },
    { value: '98%', label: 'On-Time Collection' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <section className="bg-emerald-500 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
            <p className="text-sm text-emerald-100 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
