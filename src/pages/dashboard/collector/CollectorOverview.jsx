import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CollectorOverview = () => {
  const { user, apiFetch } = useAuth();
  const [route, setRoute] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/collector/route')
      .then((d) => setRoute(d.route))
      .catch((e) => setError(e.message));
  }, [apiFetch]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Route Overview</h2>
        <p className="text-sm text-slate-600 mt-1">Hello, {user?.name || user?.staffId}.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Zone</p>
          <p className="font-semibold text-lg mt-1">{route?.zoneName || '—'}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Vehicle</p>
          <p className="font-semibold text-lg mt-1">{route?.vehicleNo || '—'}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Total Stops</p>
          <p className="font-semibold text-lg mt-1">{route?.totalStops ?? 0}</p>
        </div>
        <div className="p-5 rounded-xl border bg-white shadow-sm">
          <p className="text-xs text-slate-500">Completed</p>
          <p className="font-semibold text-lg mt-1 text-emerald-600">{route?.completed ?? 0}</p>
        </div>
      </div>

      <div className="p-5 rounded-xl border bg-white">
        <p className="text-sm text-slate-600">
          Route date: <strong>{route?.routeDate || 'Today'}</strong>
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Go to <strong>Today&apos;s Tasks</strong> to update pickup status or use <strong>QR Scanner</strong> for quick collection.
        </p>
      </div>
    </div>
  );
};

export default CollectorOverview;
