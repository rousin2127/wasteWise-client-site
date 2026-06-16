import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminDashboard = () => {
  const { apiFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const [zoneName, setZoneName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [collectorForm, setCollectorForm] = useState({ name: '', staffId: '', password: '', phone: '', zoneId: '' });
  const [approval, setApproval] = useState({});

  const loadAll = async () => {
    setError('');
    const [s, u, z, r, c, col] = await Promise.all([
      apiFetch('/api/admin/stats'),
      apiFetch('/api/admin/users?role=resident'),
      apiFetch('/api/admin/zones'),
      apiFetch('/api/admin/on-demand?status=pending'),
      apiFetch('/api/admin/complaints'),
      apiFetch('/api/admin/users?role=collector'),
    ]);
    setStats(s);
    setUsers(u.users || []);
    setZones(z.zones || []);
    setRequests(r.requests || []);
    setComplaints(c.complaints || []);
    setCollectors(col.users || []);
  };

  useEffect(() => {
    loadAll().catch((e) => setError(e.message));
  }, [apiFetch]);

  const toggleUser = async (id, status) => {
    try {
      await apiFetch(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setMsg(`User ${status}`);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const createZone = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/admin/zones', {
        method: 'POST',
        body: JSON.stringify({ name: zoneName, vehicleNo }),
      });
      setZoneName('');
      setVehicleNo('');
      setMsg('Zone created');
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const createCollector = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/admin/collectors', {
        method: 'POST',
        body: JSON.stringify(collectorForm),
      });
      setCollectorForm({ name: '', staffId: '', password: '', phone: '', zoneId: '' });
      setMsg('Collector created');
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const approveRequest = async (id) => {
    const data = approval[id] || {};
    if (!data.price || !data.assignedCollectorId) {
      setError('Set price and collector for approval');
      return;
    }
    try {
      await apiFetch(`/api/admin/on-demand/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'scheduled',
          price: Number(data.price),
          assignedCollectorId: data.assignedCollectorId,
          scheduledAt: data.scheduledAt || new Date().toISOString(),
        }),
      });
      setMsg('Request approved and task assigned');
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const resolveComplaint = async (id) => {
    try {
      await apiFetch(`/api/admin/complaints/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'resolved', adminNote: 'Issue reviewed and action taken.' }),
      });
      setMsg('Complaint resolved');
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const generateRoute = async (zoneId) => {
    try {
      const res = await apiFetch('/api/admin/routes/generate', {
        method: 'POST',
        body: JSON.stringify({ zoneId }),
      });
      setMsg(`Route generated: ${res.created} tasks for ${res.zone}`);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const maxChart = Math.max(...(stats?.chart?.map((c) => c.pickups) || [1]), 1);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Collected (BDT)</p>
          <p className="text-xl font-semibold">{stats?.finance?.collected ?? 0}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Due (BDT)</p>
          <p className="text-xl font-semibold">{stats?.finance?.due ?? 0}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Today Pickups</p>
          <p className="text-xl font-semibold">{stats?.today?.pickups ?? 0}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Open Complaints</p>
          <p className="text-xl font-semibold">{stats?.complaints?.open ?? 0}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">Last 7 Days Pickups</h3>
        <div className="flex items-end gap-2 h-32">
          {(stats?.chart || []).map((c) => (
            <div key={c.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-emerald-500 rounded-t" style={{ height: `${(c.pickups / maxChart) * 100}%`, minHeight: c.pickups ? 4 : 0 }} />
              <span className="text-[10px] text-slate-500">{c.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <form onSubmit={createZone} className="p-4 rounded-xl border bg-white space-y-2">
          <h3 className="font-semibold">Create Zone</h3>
          <input className="input input-bordered w-full input-sm" placeholder="Zone name" value={zoneName} onChange={(e) => setZoneName(e.target.value)} required />
          <input className="input input-bordered w-full input-sm" placeholder="Vehicle no" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
          <button className="btn btn-sm bg-emerald-500 text-white">Add Zone</button>
        </form>

        <form onSubmit={createCollector} className="p-4 rounded-xl border bg-white space-y-2">
          <h3 className="font-semibold">Create Collector</h3>
          <input className="input input-bordered w-full input-sm" placeholder="Name" value={collectorForm.name} onChange={(e) => setCollectorForm({ ...collectorForm, name: e.target.value })} required />
          <input className="input input-bordered w-full input-sm" placeholder="Staff ID (COL-0002)" value={collectorForm.staffId} onChange={(e) => setCollectorForm({ ...collectorForm, staffId: e.target.value })} required />
          <input className="input input-bordered w-full input-sm" placeholder="Password" type="password" value={collectorForm.password} onChange={(e) => setCollectorForm({ ...collectorForm, password: e.target.value })} required />
          <select className="select select-bordered w-full select-sm" value={collectorForm.zoneId} onChange={(e) => setCollectorForm({ ...collectorForm, zoneId: e.target.value })}>
            <option value="">Select zone</option>
            {zones.map((z) => <option key={z._id} value={z._id}>{z.name}</option>)}
          </select>
          <button className="btn btn-sm bg-emerald-500 text-white">Create Collector</button>
        </form>
      </div>

      <div className="p-4 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">Zones & Route Generation</h3>
        <div className="space-y-2">
          {zones.map((z) => (
            <div key={z._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border rounded-lg p-2 text-sm">
              <div>
                <p className="font-medium">{z.name}</p>
                <p className="text-slate-500">Vehicle: {z.vehicleNo || '—'} • Collector: {z.collectorId || '—'}</p>
              </div>
              <button className="btn btn-sm btn-outline" onClick={() => generateRoute(z._id)}>Generate Today Route</button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">Pending On-Demand Requests</h3>
        {requests.length === 0 ? <p className="text-sm text-slate-500">No pending requests.</p> : requests.map((r) => (
          <div key={r._id} className="border rounded-lg p-3 mb-2 text-sm">
            <p className="font-medium">{r.residentName} — {r.holdingNo}/{r.flatNo}</p>
            <p className="text-slate-600">{r.wasteTypes?.join(', ')}: {r.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <input className="input input-bordered input-sm w-24" placeholder="Price" type="number" value={approval[r._id]?.price || ''} onChange={(e) => setApproval({ ...approval, [r._id]: { ...approval[r._id], price: e.target.value } })} />
              <select className="select select-bordered select-sm" value={approval[r._id]?.assignedCollectorId || ''} onChange={(e) => setApproval({ ...approval, [r._id]: { ...approval[r._id], assignedCollectorId: e.target.value } })}>
                <option value="">Collector</option>
                {collectors.map((c) => <option key={c._id} value={c._id}>{c.name} ({c.staffId})</option>)}
              </select>
              <button className="btn btn-sm bg-emerald-500 text-white" onClick={() => approveRequest(r._id)}>Approve</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <h3 className="font-semibold mb-3">Residents</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map((u) => (
              <div key={u._id} className="flex justify-between items-center text-sm border rounded p-2">
                <span>{u.name} ({u.holdingNo || u.flatNo})</span>
                <button className="btn btn-xs" onClick={() => toggleUser(u._id, u.status === 'active' ? 'inactive' : 'active')}>
                  {u.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white">
          <h3 className="font-semibold mb-3">Complaints</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {complaints.map((c) => (
              <div key={c._id} className="text-sm border rounded p-2">
                <p className="font-medium">{c.subject} <span className="capitalize text-slate-500">({c.status})</span></p>
                <p className="text-slate-600">{c.residentName}: {c.message}</p>
                {c.status !== 'resolved' && (
                  <button className="btn btn-xs mt-1 bg-emerald-500 text-white" onClick={() => resolveComplaint(c._id)}>Resolve</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
