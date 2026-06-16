import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CollectorScan = () => {
  const { apiFetch } = useAuth();
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [lastScan, setLastScan] = useState(null);

  const scanQr = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await apiFetch('/api/collector/scan', {
        method: 'POST',
        body: JSON.stringify({ qrCode }),
      });
      setMsg(res.message);
      setLastScan(res.resident);
      setQrCode('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">QR Scanner</h2>
        <p className="text-sm text-slate-600 mt-1">Scan resident gate QR to auto-mark waste collected.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      <form onSubmit={scanQr} className="p-6 rounded-xl border bg-white space-y-4 max-w-lg">
        <div className="w-full h-40 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <span className="text-5xl">📷</span>
        </div>
        <input
          className="input input-bordered w-full font-mono"
          placeholder="Enter or scan QR code (WW-...)"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          required
        />
        <button className="btn w-full bg-emerald-500 text-white">Scan & Mark Collected</button>
      </form>

      {lastScan && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 max-w-lg">
          <p className="font-semibold text-emerald-800">Last Scan: {lastScan.name}</p>
          <p className="text-sm text-emerald-700">Holding: {lastScan.holdingNo} | Flat: {lastScan.flatNo}</p>
        </div>
      )}
    </div>
  );
};

export default CollectorScan;
