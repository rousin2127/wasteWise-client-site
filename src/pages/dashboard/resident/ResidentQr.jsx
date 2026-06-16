import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const ResidentQr = () => {
  const { user, apiFetch } = useAuth();
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/api/resident/qr')
      .then((d) => setQrCode(d.qrCode))
      .catch((e) => setError(e.message));
  }, [apiFetch]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My QR Code</h2>
        <p className="text-sm text-slate-600 mt-1">Print this code and place it at your gate for collector scanning.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="p-8 rounded-xl border bg-white text-center max-w-md mx-auto shadow-sm">
        <div className="w-48 h-48 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <span className="text-6xl">📱</span>
        </div>
        <p className="font-mono text-xl font-bold mt-6 break-all text-emerald-600">{qrCode || '—'}</p>
        <p className="text-sm text-slate-500 mt-2">{user?.name}</p>
        <p className="text-xs text-slate-400">Holding: {user?.holdingNo || '—'} | Flat: {user?.flatNo || '—'}</p>
      </div>
    </div>
  );
};

export default ResidentQr;
