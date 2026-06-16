import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { mainNavLinks } from '../../../config/siteNav';

const Navbar = () => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-emerald-600 ${
      isActive ? 'text-emerald-600' : 'text-slate-600'
    }`;

  return (
    <nav className="navbar bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="navbar max-w-7xl mx-auto w-full px-2">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border">
              {mainNavLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={navLinkClass}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide">
            Waste<span className="text-emerald-500">Wise</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {mainNavLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navLinkClass} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <Link to="/dashboard" className="btn btn-sm md:btn-md bg-emerald-500 hover:bg-emerald-600 text-white border-0">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm md:btn-md btn-ghost hidden sm:inline-flex">Login</Link>
              <Link to="/register" className="btn btn-sm md:btn-md bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
