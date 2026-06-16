import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { getMenusForRole } from '../../../config/dashboardMenus';

const DashboardSidebar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { menus, basePath } = getMenusForRole(user?.role);
  const roleLabel = user?.role === 'admin' ? 'Admin' : user?.role === 'collector' ? 'Collector' : 'Resident';

  const handleLogout = () => {
    logOut().then(() => navigate('/login'));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
    }`;

  const sidebarContent = (
    <>
      <div className="px-4 py-5 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">
          Waste<span className="text-emerald-500">Wise</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">{roleLabel} Panel</p>
        <p className="text-sm font-medium text-slate-700 mt-2 truncate">{user?.name || user?.staffId}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path ? `${basePath}/${item.path}` : basePath}
            end={item.path === ''}
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-200 space-y-1">
        <NavLink to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100" onClick={() => setOpen(false)}>
          <span>🌐</span>
          <span>Back to Website</span>
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50"
        >
          <span>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button type="button" className="btn btn-sm btn-ghost" onClick={() => setOpen(true)} aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-slate-800">
          Waste<span className="text-emerald-500">Wise</span>
        </span>
        <span className="text-xs text-slate-500">{roleLabel}</span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <button type="button" className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} aria-label="Close menu" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
