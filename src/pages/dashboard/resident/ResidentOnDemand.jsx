import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const WASTE_TYPES = ['e-waste', 'organic', 'plastic', 'general'];

const ResidentOnDemand = () => {
  const { apiFetch } = useAuth();
  const [requests, setRequests] = useState([]);
  const [wasteTypes, setWasteTypes] = useState(['general']);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/resident/on-demand').then((d) => setRequests(d.requests || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const toggleWaste = (type) => {
    setWasteTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/resident/on-demand', {
        method: 'POST',
        body: JSON.stringify({ wasteTypes, description }),
      });
      setDescription('');
      setMsg('Request submitted successfully.');
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">On-Demand Request</h2>
        <p className="text-sm text-slate-600 mt-1">Request a one-time pickup for events or heavy waste.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <form onSubmit={submit} className="p-5 rounded-xl border bg-white space-y-4">
        <div className="flex flex-wrap gap-3">
          {WASTE_TYPES.map((t) => (
            <label key={t} className="label cursor-pointer gap-2 border rounded-lg px-3 py-2">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-success" checked={wasteTypes.includes(t)} onChange={() => toggleWaste(t)} />
              <span className="text-sm capitalize">{t}</span>
            </label>
          ))}
        </div>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Describe your waste (event, heavy waste, etc.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="btn bg-emerald-500 text-white">Submit Request</button>
      </form>

      <div className="p-5 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">My Requests</h3>
        <div className="space-y-2">
          {requests.length === 0 ? (
            <p className="text-sm text-slate-500">No requests yet.</p>
          ) : (
            requests.map((r) => (
              <div key={r._id} className="text-sm border rounded-lg p-3">
                <p className="font-medium capitalize">{r.status} {r.price ? `• ${r.price} BDT` : ''}</p>
                <p className="text-slate-600">{r.wasteTypes?.join(', ')}</p>
                <p className="text-slate-500">{r.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentOnDemand;
