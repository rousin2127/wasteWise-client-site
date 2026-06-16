import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const WASTE_TYPES = ['e-waste', 'organic', 'plastic', 'general'];
const PAY_METHODS = ['bkash', 'rocket', 'nagad', 'card'];

const ResidentDashboard = () => {
  const { user, apiFetch } = useAuth();
  const [summary, setSummary] = useState(null);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const [wasteTypes, setWasteTypes] = useState(['general']);
  const [description, setDescription] = useState('');
  const [complaintSubject, setComplaintSubject] = useState('');
  const [complaintMsg, setComplaintMsg] = useState('');
  const [rating, setRating] = useState(5);
  const [payMethod, setPayMethod] = useState('bkash');

  const loadAll = async () => {
    setError('');
    const [s, r, c] = await Promise.all([
      apiFetch('/api/resident/summary'),
      apiFetch('/api/resident/on-demand'),
      apiFetch('/api/resident/complaints'),
    ]);
    setSummary(s);
    setRequests(r.requests || []);
    setComplaints(c.complaints || []);
  };

  useEffect(() => {
    loadAll().catch((e) => setError(e.message));
  }, [apiFetch]);

  const toggleWaste = (type) => {
    setWasteTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const submitOnDemand = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/resident/on-demand', {
        method: 'POST',
        body: JSON.stringify({ wasteTypes, description }),
      });
      setDescription('');
      setMsg('On-demand request submitted.');
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const payBill = async () => {
    if (!summary?.bill?._id) return;
    try {
      const res = await apiFetch('/api/resident/payments', {
        method: 'POST',
        body: JSON.stringify({
          billId: summary.bill._id,
          method: payMethod,
          amount: summary.bill.dueAmount,
        }),
      });
      setMsg(`Payment done: ${res.txnRef}`);
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/resident/complaints', {
        method: 'POST',
        body: JSON.stringify({ subject: complaintSubject, message: complaintMsg, rating }),
      });
      setComplaintSubject('');
      setComplaintMsg('');
      setMsg('Complaint submitted.');
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Resident Dashboard</h2>
        <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name || 'Resident'}.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Current Bill</p>
          <p className="text-xl font-semibold capitalize">{summary?.bill?.status || '—'}</p>
          <p className="text-sm text-slate-600">Due: {summary?.bill?.dueAmount ?? 0} BDT</p>
          {summary?.bill?.status === 'due' && (
            <div className="mt-3 flex gap-2 items-center">
              <select className="select select-sm select-bordered" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                {PAY_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <button className="btn btn-sm bg-emerald-500 text-white" onClick={payBill}>Pay Now</button>
            </div>
          )}
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">Next Pickup</p>
          <p className="text-lg font-semibold">{summary?.nextPickup?.when || '—'}</p>
          <p className="text-sm text-slate-600">{summary?.nextPickup?.note}</p>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <p className="text-xs text-slate-500">House QR Code</p>
          <p className="text-lg font-mono font-semibold break-all">{summary?.qrCode || '—'}</p>
          <p className="text-xs text-slate-500 mt-1">Collector will scan this at your gate</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <form onSubmit={submitOnDemand} className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-semibold">On-Demand Pickup Request</h3>
          <div className="flex flex-wrap gap-2">
            {WASTE_TYPES.map((t) => (
              <label key={t} className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" checked={wasteTypes.includes(t)} onChange={() => toggleWaste(t)} />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
          <textarea
            className="textarea textarea-bordered w-full text-sm"
            placeholder="Describe your waste (event, heavy waste, etc.)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button className="btn btn-sm bg-emerald-500 text-white">Submit Request</button>
        </form>

        <form onSubmit={submitComplaint} className="p-4 rounded-xl border bg-white space-y-3">
          <h3 className="font-semibold">Complain & Feedback</h3>
          <input className="input input-bordered w-full input-sm" placeholder="Subject" value={complaintSubject} onChange={(e) => setComplaintSubject(e.target.value)} required />
          <textarea className="textarea textarea-bordered w-full text-sm" placeholder="Your message" value={complaintMsg} onChange={(e) => setComplaintMsg(e.target.value)} required />
          <div className="flex items-center gap-2">
            <span className="text-sm">Rating:</span>
            <select className="select select-sm select-bordered" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button className="btn btn-sm bg-emerald-500 text-white">Submit Complaint</button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <h3 className="font-semibold mb-3">My On-Demand Requests</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {requests.length === 0 ? <p className="text-sm text-slate-500">No requests yet.</p> : requests.map((r) => (
              <div key={r._id} className="text-sm border rounded-lg p-2">
                <p className="font-medium capitalize">{r.status} {r.price ? `• ${r.price} BDT` : ''}</p>
                <p className="text-slate-600">{r.wasteTypes?.join(', ')}</p>
                <p className="text-slate-500">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <h3 className="font-semibold mb-3">My Complaints</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {complaints.length === 0 ? <p className="text-sm text-slate-500">No complaints yet.</p> : complaints.map((c) => (
              <div key={c._id} className="text-sm border rounded-lg p-2">
                <p className="font-medium">{c.subject} <span className="text-slate-500 capitalize">({c.status})</span></p>
                <p className="text-slate-600">{c.message}</p>
                {c.adminNote && <p className="text-emerald-600 text-xs mt-1">Admin: {c.adminNote}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;
