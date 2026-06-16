import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminComplaints = () => {
  const { apiFetch } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/admin/complaints').then((d) => setComplaints(d.complaints || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const resolve = async (id) => {
    try {
      await apiFetch(`/api/admin/complaints/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'resolved', adminNote: 'Issue reviewed and action taken.' }),
      });
      setMsg('Complaint resolved');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complaints</h2>
        <p className="text-sm text-slate-600 mt-1">Review and resolve resident complaints.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="space-y-2">
        {complaints.map((c) => (
          <div key={c._id} className="p-4 rounded-xl border bg-white text-sm">
            <p className="font-medium">{c.subject} <span className="capitalize text-slate-500">({c.status})</span></p>
            <p className="text-slate-600">{c.residentName}: {c.message}</p>
            {c.rating && <p className="text-xs text-slate-500 mt-1">Rating: {c.rating}/5</p>}
            {c.status !== 'resolved' && (
              <button className="btn btn-xs mt-2 bg-emerald-500 text-white" onClick={() => resolve(c._id)}>Resolve</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComplaints;
