import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminZones = () => {
  const { apiFetch } = useAuth();
  const [zones, setZones] = useState([]);
  const [zoneName, setZoneName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/admin/zones').then((d) => setZones(d.zones || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const createZone = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/admin/zones', { method: 'POST', body: JSON.stringify({ name: zoneName, vehicleNo }) });
      setZoneName('');
      setVehicleNo('');
      setMsg('Zone created');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const generateRoute = async (zoneId) => {
    try {
      const res = await apiFetch('/api/admin/routes/generate', { method: 'POST', body: JSON.stringify({ zoneId }) });
      setMsg(`Route generated: ${res.created} tasks for ${res.zone}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Zones & Routes</h2>
        <p className="text-sm text-slate-600 mt-1">Manage city zones and generate daily collection routes.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <form onSubmit={createZone} className="p-5 rounded-xl border bg-white flex flex-wrap gap-3">
        <input className="input input-bordered input-sm flex-1 min-w-[200px]" placeholder="Zone name" value={zoneName} onChange={(e) => setZoneName(e.target.value)} required />
        <input className="input input-bordered input-sm" placeholder="Vehicle no" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
        <button className="btn btn-sm bg-emerald-500 text-white">Add Zone</button>
      </form>

      <div className="p-5 rounded-xl border bg-white space-y-2">
        {zones.map((z) => (
          <div key={z._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border rounded-lg p-3 text-sm">
            <div>
              <p className="font-medium">{z.name}</p>
              <p className="text-slate-500">Vehicle: {z.vehicleNo || '—'} • Collector: {z.collectorId || '—'}</p>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => generateRoute(z._id)}>Generate Today Route</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminZones;
