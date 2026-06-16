import React from 'react';

const testimonials = [
  { name: 'Rahim Uddin', role: 'Resident, Mirpur', text: 'WasteWise made paying my monthly bill so easy. I just use bKash from my phone!' },
  { name: 'Karim Ahmed', role: 'Collector', text: 'The QR scan feature saves so much time. I complete my route faster every day.' },
  { name: 'City Admin', role: 'Dhaka North', text: 'Analytics dashboard helps us track collection rates and resolve complaints quickly.' },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Trusted by Our Community</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-slate-600 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="font-semibold text-slate-800">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
