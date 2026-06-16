import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const {user, logOut}= useAuth();
    const navigate = useNavigate()

    const handleLogOut = () =>{
        logOut()
        .then(res =>{
            navigate('/login')
        })
        
        .catch(error =>{
            console.log(error)
        })
    }

    const links = [
        { label: 'Home', to: '/' },
        { label: 'Dashboard', to: '/dashboard' },
    ];

    return (
        <nav className="  navbar bg-base-100 shadow-sm sticky top-0 z-50 ">
            {/* Mobile View: Left aligned burger menu */}
            {/* Desktop View: Left aligned burger (hidden) */}
            <div className='navbar max-w-7xl mx-auto'>
            <div className="navbar-start w-1/4 lg:w-1/2 ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        {/* Map used for Mobile Links */}
                        {links.map((link, index) => (
                            <li key={index}><Link to={link.to}>{link.label}</Link></li>
                        ))}
                    </ul>
                </div>
                
                {/* Desktop Logo (Hidden on mobile) */}
                <h2 className="text-2xl font-bold text-gray-950 tracking-wide hidden lg:block ">
                        Waste<span className="text-emerald-400">Wise</span>
                    </h2>
            </div>

            {/* Mobile View: Centered Logo */}
            {/* Desktop View: Centered Navigation Links */}
            <div className="navbar-center w-1/2 lg:w-auto flex justify-center lg:block">
                {/* Mobile-only Logo */}
<h2 className="text-2xl font-bold text-gray-950 tracking-wide lg:hidden text-center">
                        Waste<span className="text-emerald-400">Wise</span>
                    </h2>                
                {/* Desktop-only Navigation Links */}
                <ul className="menu menu-horizontal px-1 gap-4 hidden lg:flex">
                    {/* Map used for Desktop Links */}
                    {links.map((link, index) => (
                        <li key={index}><Link to={link.to}>{link.label}</Link></li>
                    ))}
                </ul>
            </div>

            {/* Right aligned action button */}
            <div className="navbar-end w-1/4 lg:w-1/2">
                {
                    user ? <a onClick={handleLogOut} className="btn btn-sm md:btn-md bg-[#009661]">Log Out</a> :
                    <Link to={'/login'} className="btn btn-sm md:btn-md bg-[#009661]">Login</Link>

                }
            </div>
            </div>
        </nav>
    );
};

export default Navbar;