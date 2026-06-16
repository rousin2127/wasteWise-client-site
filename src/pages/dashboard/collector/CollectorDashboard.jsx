import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CollectorDashboard = () => {
  const { user, apiFetch } = useAuth();
  const [route, setRoute] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [proofPhoto, setProofPhoto] = useState('');

  const loadAll = async () => {
    setError('');
    const [r, t] = await Promise.all([
      apiFetch('/api/collector/route'),
      apiFetch('/api/collector/tasks'),
    ]);
    setRoute(r.route);
    setTasks(t.tasks || []);
  };

  useEffect(() => {
    loadAll().catch((e) => setError(e.message));
  }, [apiFetch]);

  const updateStatus = async (taskId, status) => {
    try {
      await apiFetch(`/api/collector/tasks/${taskId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, proofPhoto: status !== 'collected' ? proofPhoto : '' }),
      });
      setMsg(`Task marked as ${status}`);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const scanQr = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/collector/scan', {
        method: 'POST',
        body: JSON.stringify({ qrCode }),
      });
      setMsg(res.message);
      setQrCode('');
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const openMaps = (location) => {
    if (!location?.lat || !location?.lng) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Collector Dashboard</h2>
        <p className="text-sm text-slate-600 mt-1">Hello, {user?.name || user?.staffId}.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="grid md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Zone</p>
          <p className="font-semibold">{route?.zoneName || '—'}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Vehicle</p>
          <p className="font-semibold">{route?.vehicleNo || '—'}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Total Stops</p>
          <p className="font-semibold">{route?.totalStops ?? 0}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Completed</p>
          <p className="font-semibold">{route?.completed ?? 0}</p>
        </div>
      </div>

      <form onSubmit={scanQr} className="p-4 rounded-xl border bg-white flex flex-col md:flex-row gap-3">
        <input
          className="input input-bordered flex-1"
          placeholder="Scan or enter resident QR code (WW-...)"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          required
        />
        <button className="btn bg-emerald-500 text-white">Scan QR & Mark Collected</button>
      </form>

      <div className="p-4 rounded-xl border bg-white">
        <label className="text-sm font-medium">Proof photo URL (for Skipped/Locked)</label>
        <input className="input input-bordered w-full mt-1 input-sm" placeholder="https://..." value={proofPhoto} onChange={(e) => setProofPhoto(e.target.value)} />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">Today&apos;s Route Tasks</h3>
        {tasks.length === 0 ? (
          <div className="p-4 rounded-xl border bg-white text-sm text-slate-500">No tasks assigned for today. Ask admin to generate route.</div>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className="p-4 rounded-xl border bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold">{t.residentName}</p>
                <p className="text-xs text-slate-600">Holding/Flat: {t.holdingNo || '—'} {t.flatNo ? `(${t.flatNo})` : ''}</p>
                <p className="text-xs text-slate-500 capitalize">Status: {t.status} • {t.type}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.location && (
                  <button className="btn btn-sm btn-outline" onClick={() => openMaps(t.location)}>Navigate</button>
                )}
                <button className="btn btn-sm bg-emerald-500 text-white" onClick={() => updateStatus(t._id, 'collected')}>Collected</button>
                <button className="btn btn-sm" onClick={() => updateStatus(t._id, 'skipped')}>Skipped</button>
                <button className="btn btn-sm" onClick={() => updateStatus(t._id, 'locked')}>Locked</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectorDashboard;
