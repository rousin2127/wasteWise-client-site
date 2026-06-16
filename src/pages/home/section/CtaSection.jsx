import React from 'react';
import { Link } from 'react-router';

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 p-10 md:p-16 text-center text-white shadow-xl shadow-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make Your City Cleaner?</h2>
          <p className="text-emerald-100 mt-4 max-w-lg mx-auto">
            Join thousands of residents already using WasteWise for hassle-free waste management.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/register" className="px-8 py-3.5 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all shadow-lg">
              Get Started Free
            </Link>
            <Link to="/contact" className="px-8 py-3.5 bg-white/20 text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
