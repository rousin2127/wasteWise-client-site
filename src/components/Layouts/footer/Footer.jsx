import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 font-sans">
            {/* Main Footer Content */}
            <div className=" max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
                
                {/* Column 1: Brand & Slogan */}
                <div className="flex flex-col gap-3 ">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Waste<span className="text-emerald-400">Wise</span>
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Empowering communities to manage waste efficiently, keep streets pristine, and build a sustainable tomorrow.
                    </p>
                </div>

                {/* Column 2: For Residents */}
                <div className='flex flex-col items-center justify-center'>
                    <h3 className="text-white font-semibold mb-4 -ml-4 tracking-wider uppercase text-xs">For Residents</h3>
                    <ul className="space-y-2.5 text-sm">
                        <li><a href="#pickup" className="hover:text-emerald-400 transition-colors">Schedule a Pickup</a></li>
                        <li><a href="#guidelines" className="hover:text-emerald-400 transition-colors">Waste Guidelines</a></li>
                        <li><a href="#rewards" className="hover:text-emerald-400 transition-colors">Eco Rewards</a></li>
                        <li><a href="#community" className="hover:text-emerald-400 transition-colors">Community Hub</a></li>
                    </ul>
                </div>

                {/* Column 3: For Riders */}
                <div className='flex flex-col items-center justify-center'>
                    <h3 className="text-white font-semibold mb-4 -ml-8 tracking-wider uppercase text-xs">For Riders</h3>
                    <ul className="space-y-2.5 text-sm">
                        <li><a href="#join-riders" className="hover:text-emerald-400 transition-colors">Become a Rider</a></li>
                        <li><a href="#earnings" className="hover:text-emerald-400 transition-colors">Earnings &amp; Perks</a></li>
                        <li><a href="#rider-app" className="hover:text-emerald-400 transition-colors">Rider Handbook</a></li>
                        <li><a href="#safety" className="hover:text-emerald-400 transition-colors">Safety Protocols</a></li>
                    </ul>
                </div  >

                {/* Column 4: Contact & Support */}
                <div className='flex flex-col items-center justify-center'>
                    <h3 className="text-white font-semibold mb-4 -ml-12 tracking-wider uppercase text-xs">Support</h3>
                    <ul className="space-y-2.5 text-sm">
                        <li><a href="#help" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                        <li><a href="#report" className="hover:text-emerald-400 transition-colors">Report an Issue</a></li>
                        <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                        <li className="text-xs text-gray-400 mt-4">Emergency Hotline:<br/><span className="text-emerald-400 font-medium">1-800-CLEAN-CITY</span></li>
                    </ul>
                </div>

            </div>

            {/* Divider Line */}
            <div className="border-t border-slate-800"></div>

            {/* Bottom Bar: Copyright & Fine Print */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Clean City Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                    <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                    <a href="#cookies" className="hover:text-gray-400 transition-colors">Cookie Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;