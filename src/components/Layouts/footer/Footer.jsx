import React from 'react';
import { Link } from 'react-router';
import { mainNavLinks } from '../../../config/siteNav';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Waste<span className="text-emerald-400">Wise</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Smart waste management for cleaner cities. Schedule pickups, pay bills, and track collection — all in one platform.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {mainNavLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-emerald-400 transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">For Users</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Register as Resident</Link></li>
            <li><Link to="/features" className="hover:text-emerald-400 transition-colors">Resident Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">Collector Workflow</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Admin Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2.5 text-sm">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📧 support@wastewise.com</li>
            <li>📞 +880 1700-000000</li>
            <li className="text-emerald-400 font-medium pt-2">24/7 Emergency Hotline</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800" />
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} WasteWise. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-gray-300">Privacy</Link>
          <Link to="/about" className="hover:text-gray-300">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
