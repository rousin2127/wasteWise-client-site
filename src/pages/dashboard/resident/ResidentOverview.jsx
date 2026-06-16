import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const ResidentOverview = () => {
  const { user, apiFetch } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/resident/summary')
      .then(setSummary)
      .catch((e) => setError(e.message));
  }, [apiFetch]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name || 'Resident'}.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Current Bill</p>
          <p className="text-2xl font-semibold capitalize mt-1">{summary?.bill?.status || '—'}</p>
          <p className="text-sm text-slate-600 mt-1">Due: {summary?.bill?.dueAmount ?? 0} BDT</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Next Pickup</p>
          <p className="text-xl font-semibold mt-1">{summary?.nextPickup?.when || '—'}</p>
          <p className="text-sm text-slate-600 mt-1">{summary?.nextPickup?.note}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentOverview;
