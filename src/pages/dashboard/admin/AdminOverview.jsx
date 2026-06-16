import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminOverview = () => {
  const { apiFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/admin/stats')
      .then(setStats)
      .catch((e) => setError(e.message));
  }, [apiFetch]);

  const maxChart = Math.max(...(stats?.chart?.map((c) => c.pickups) || [1]), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-sm text-slate-600 mt-1">Financial overview and pickup statistics.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Collected (BDT)</p>
          <p className="text-2xl font-semibold mt-1">{stats?.finance?.collected ?? 0}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Due (BDT)</p>
          <p className="text-2xl font-semibold mt-1">{stats?.finance?.due ?? 0}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Today Pickups</p>
          <p className="text-2xl font-semibold mt-1">{stats?.today?.pickups ?? 0}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Open Complaints</p>
          <p className="text-2xl font-semibold mt-1">{stats?.complaints?.open ?? 0}</p>
        </div>
      </div>

      <div className="p-5 rounded-xl border bg-white">
        <h3 className="font-semibold mb-4">Last 7 Days Pickups</h3>
        <div className="flex items-end gap-2 h-36">
          {(stats?.chart || []).map((c) => (
            <div key={c.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-600">{c.pickups}</span>
              <div className="w-full bg-emerald-500 rounded-t" style={{ height: `${(c.pickups / maxChart) * 100}%`, minHeight: c.pickups ? 4 : 0 }} />
              <span className="text-[10px] text-slate-500">{c.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
