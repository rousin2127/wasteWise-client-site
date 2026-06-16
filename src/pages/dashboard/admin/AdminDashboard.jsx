import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminDashboard = () => {
  const { apiFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setError('');
    apiFetch('/api/admin/stats')
      .then((d) => mounted && setStats(d))
      .catch((e) => mounted && setError(e.message));
    return () => {
      mounted = false;
    };
  }, [apiFetch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Total Collected (BDT)</p>
          <p className="text-xl font-semibold">{stats?.finance?.collected ?? '—'}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Total Due (BDT)</p>
          <p className="text-xl font-semibold">{stats?.finance?.due ?? '—'}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Today Pickups</p>
          <p className="text-xl font-semibold">{stats?.today?.pickups ?? '—'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

