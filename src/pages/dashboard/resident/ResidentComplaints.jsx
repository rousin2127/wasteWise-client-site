import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const ResidentComplaints = () => {
  const { apiFetch } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/resident/complaints').then((d) => setComplaints(d.complaints || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/resident/complaints', {
        method: 'POST',
        body: JSON.stringify({ subject, message, rating }),
      });
      setSubject('');
      setMessage('');
      setMsg('Complaint submitted.');
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complaints & Feedback</h2>
        <p className="text-sm text-slate-600 mt-1">Report missed pickups or rate our service.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <form onSubmit={submit} className="p-5 rounded-xl border bg-white space-y-3">
        <input className="input input-bordered w-full" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <textarea className="textarea textarea-bordered w-full" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <div className="flex items-center gap-2">
          <span className="text-sm">Rating:</span>
          <select className="select select-bordered select-sm" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} ★</option>
            ))}
          </select>
        </div>
        <button className="btn bg-emerald-500 text-white">Submit</button>
      </form>

      <div className="p-5 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">My Complaints</h3>
        <div className="space-y-2">
          {complaints.map((c) => (
            <div key={c._id} className="text-sm border rounded-lg p-3">
              <p className="font-medium">{c.subject} <span className="text-slate-500 capitalize">({c.status})</span></p>
              <p className="text-slate-600">{c.message}</p>
              {c.adminNote && <p className="text-emerald-600 text-xs mt-1">Admin: {c.adminNote}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResidentComplaints;
