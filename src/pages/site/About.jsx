import React from 'react';
import { Link } from 'react-router';
import PageBanner from '../../components/shared/PageBanner';

const About = () => {
  return (
    <div>
      <PageBanner title="About WasteWise" subtitle="Building smarter, cleaner cities through technology." />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <section className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-800">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mt-3">
            WasteWise is a comprehensive waste management platform designed for Bangladeshi cities. We connect residents who need reliable waste collection with trained collectors and city administrators who oversee the entire operation.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Our goal is to reduce missed pickups, improve payment collection, and give city authorities real-time visibility into waste operations — making urban living cleaner and more sustainable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Why WasteWise?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Digital First', desc: 'Online registration, payments, and tracking — no paperwork.' },
              { title: 'QR Verified', desc: 'Every home gets a unique QR for tamper-proof collection proof.' },
              { title: 'Role-Based', desc: 'Separate dashboards for residents, collectors, and admins.' },
              { title: 'Local Payments', desc: 'bKash, Rocket, Nagad integration for easy bill payment.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center">
          <h2 className="text-2xl font-bold">Join the Clean City Movement</h2>
          <p className="text-emerald-100 mt-2">Be part of the solution. Register today.</p>
          <Link to="/register" className="btn mt-4 bg-white text-emerald-600 hover:bg-emerald-50 border-0">
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
