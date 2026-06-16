import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminResidents = () => {
  const { apiFetch } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => apiFetch('/api/admin/users?role=resident').then((d) => setUsers(d.users || []));

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const toggleUser = async (id, status) => {
    try {
      await apiFetch(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setMsg(`User ${status}`);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Residents</h2>
        <p className="text-sm text-slate-600 mt-1">Verify, activate or deactivate resident accounts.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <div className="p-5 rounded-xl border bg-white">
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center text-sm border rounded-lg p-3">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-slate-500 text-xs">{u.holdingNo || u.flatNo} • {u.email || u.phone}</p>
              </div>
              <button className="btn btn-xs" onClick={() => toggleUser(u._id, u.status === 'active' ? 'inactive' : 'active')}>
                {u.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminResidents;
