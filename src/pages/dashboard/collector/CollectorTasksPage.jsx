import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CollectorTasks = () => {
  const { apiFetch } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [proofPhoto, setProofPhoto] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/collector/tasks').then((d) => setTasks(d.tasks || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const updateStatus = async (taskId, status) => {
    try {
      await apiFetch(`/api/collector/tasks/${taskId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, proofPhoto: status !== 'collected' ? proofPhoto : '' }),
      });
      setMsg(`Marked as ${status}`);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const openMaps = (location) => {
    if (!location?.lat || !location?.lng) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Today&apos;s Tasks</h2>
        <p className="text-sm text-slate-600 mt-1">Update pickup status for each stop.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="p-4 rounded-xl border bg-white">
        <label className="text-sm font-medium">Proof photo URL (for Skipped/Locked)</label>
        <input className="input input-bordered w-full mt-1 input-sm" placeholder="https://..." value={proofPhoto} onChange={(e) => setProofPhoto(e.target.value)} />
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="p-5 rounded-xl border bg-white text-sm text-slate-500">No tasks for today. Ask admin to generate route.</div>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className="p-4 rounded-xl border bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold">{t.residentName}</p>
                <p className="text-xs text-slate-600">Holding/Flat: {t.holdingNo || '—'} {t.flatNo ? `(${t.flatNo})` : ''}</p>
                <p className="text-xs text-slate-500 capitalize">Status: {t.status} • {t.type}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.location && <button className="btn btn-sm btn-outline" onClick={() => openMaps(t.location)}>Navigate</button>}
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

export default CollectorTasks;
