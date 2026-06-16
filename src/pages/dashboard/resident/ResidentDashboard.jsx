import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const ResidentDashboard = () => {
  const { user, apiFetch } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setError('');
    apiFetch('/api/resident/summary')
      .then((d) => mounted && setSummary(d))
      .catch((e) => mounted && setError(e.message));
    return () => {
      mounted = false;
    };
  }, [apiFetch]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Resident Dashboard</h2>
      <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name || user?.email || 'Resident'}.</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Current Bill</p>
          <p className="text-xl font-semibold">{summary?.bill?.status || 'N/A'}</p>
          <p className="text-sm text-slate-600">Due: {summary?.bill?.dueAmount ?? '—'} BDT</p>
        </div>

        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Next Pickup</p>
          <p className="text-xl font-semibold">{summary?.nextPickup?.when || 'Not scheduled'}</p>
          <p className="text-sm text-slate-600">{summary?.nextPickup?.note || '—'}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;

