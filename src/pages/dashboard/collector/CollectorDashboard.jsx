import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CollectorDashboard = () => {
  const { user, apiFetch } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setError('');
    apiFetch('/api/collector/tasks')
      .then((d) => mounted && setTasks(d?.tasks || []))
      .catch((e) => mounted && setError(e.message));
    return () => {
      mounted = false;
    };
  }, [apiFetch]);

  const updateStatus = async (taskId, status) => {
    try {
      await apiFetch(`/api/collector/tasks/${taskId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      const refreshed = await apiFetch('/api/collector/tasks');
      setTasks(refreshed?.tasks || []);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Collector Dashboard</h2>
      <p className="text-sm text-slate-600 mt-1">Hello, {user?.name || user?.staffId || 'Collector'}.</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <div className="p-4 rounded-xl border bg-white">No tasks assigned for today.</div>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className="p-4 rounded-xl border bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold">{t.residentName || 'Resident'}</p>
                <p className="text-xs text-slate-600">
                  Holding/Flat: {t.holdingNo || '—'} {t.flatNo ? `(${t.flatNo})` : ''}
                </p>
                <p className="text-xs text-slate-500">Status: {t.status}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm bg-emerald-500 text-white" onClick={() => updateStatus(t._id, 'collected')}>
                  Mark Collected
                </button>
                <button className="btn btn-sm" onClick={() => updateStatus(t._id, 'skipped')}>
                  Skipped
                </button>
                <button className="btn btn-sm" onClick={() => updateStatus(t._id, 'locked')}>
                  Locked
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectorDashboard;

