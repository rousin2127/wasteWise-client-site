import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminOnDemand = () => {
  const { apiFetch } = useAuth();
  const [requests, setRequests] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [approval, setApproval] = useState({});
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    const [r, c] = await Promise.all([
      apiFetch('/api/admin/on-demand?status=pending'),
      apiFetch('/api/admin/users?role=collector'),
    ]);
    setRequests(r.requests || []);
    setCollectors(c.users || []);
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const approve = async (id) => {
    const data = approval[id] || {};
    if (!data.price || !data.assignedCollectorId) {
      setError('Set price and collector');
      return;
    }
    try {
      await apiFetch(`/api/admin/on-demand/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'scheduled',
          price: Number(data.price),
          assignedCollectorId: data.assignedCollectorId,
          scheduledAt: new Date().toISOString(),
        }),
      });
      setMsg('Request approved');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">On-Demand Requests</h2>
        <p className="text-sm text-slate-600 mt-1">Review, set price and assign collector.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="p-5 rounded-xl border bg-white text-sm text-slate-500">No pending requests.</div>
        ) : (
          requests.map((r) => (
            <div key={r._id} className="p-4 rounded-xl border bg-white text-sm">
              <p className="font-medium">{r.residentName} — {r.holdingNo}/{r.flatNo}</p>
              <p className="text-slate-600 mt-1">{r.wasteTypes?.join(', ')}: {r.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <input className="input input-bordered input-sm w-24" placeholder="Price" type="number" value={approval[r._id]?.price || ''} onChange={(e) => setApproval({ ...approval, [r._id]: { ...approval[r._id], price: e.target.value } })} />
                <select className="select select-bordered select-sm" value={approval[r._id]?.assignedCollectorId || ''} onChange={(e) => setApproval({ ...approval, [r._id]: { ...approval[r._id], assignedCollectorId: e.target.value } })}>
                  <option value="">Collector</option>
                  {collectors.map((c) => <option key={c._id} value={c._id}>{c.name} ({c.staffId})</option>)}
                </select>
                <button className="btn btn-sm bg-emerald-500 text-white" onClick={() => approve(r._id)}>Approve</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOnDemand;
