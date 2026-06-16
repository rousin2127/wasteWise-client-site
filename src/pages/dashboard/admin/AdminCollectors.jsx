import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminCollectors = () => {
  const { apiFetch } = useAuth();
  const [collectors, setCollectors] = useState([]);
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ name: '', staffId: '', password: '', phone: '', zoneId: '' });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    const [c, z] = await Promise.all([
      apiFetch('/api/admin/users?role=collector'),
      apiFetch('/api/admin/zones'),
    ]);
    setCollectors(c.users || []);
    setZones(z.zones || []);
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/admin/collectors', { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', staffId: '', password: '', phone: '', zoneId: '' });
      setMsg('Collector created');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Collectors</h2>
        <p className="text-sm text-slate-600 mt-1">Create and manage garbage collector accounts.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <form onSubmit={submit} className="p-5 rounded-xl border bg-white grid md:grid-cols-2 gap-3">
        <input className="input input-bordered input-sm" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input input-bordered input-sm" placeholder="Staff ID (COL-0002)" value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} required />
        <input className="input input-bordered input-sm" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="select select-bordered select-sm" value={form.zoneId} onChange={(e) => setForm({ ...form, zoneId: e.target.value })}>
          <option value="">Select zone</option>
          {zones.map((z) => <option key={z._id} value={z._id}>{z.name}</option>)}
        </select>
        <button className="btn btn-sm bg-emerald-500 text-white md:col-span-2">Create Collector</button>
      </form>

      <div className="p-5 rounded-xl border bg-white space-y-2">
        {collectors.map((c) => (
          <div key={c._id} className="flex justify-between text-sm border rounded-lg p-3">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-slate-500 text-xs">{c.staffId} • Zone: {c.zoneId || '—'}</p>
            </div>
            <span className="badge badge-sm capitalize">{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCollectors;
