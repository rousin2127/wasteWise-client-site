import React from 'react';

const PageBanner = ({ title, subtitle }) => {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageBanner;
