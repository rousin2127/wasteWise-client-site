import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const PAY_METHODS = ['bkash', 'rocket', 'nagad', 'card'];

const ResidentPayments = () => {
  const { apiFetch } = useAuth();
  const [summary, setSummary] = useState(null);
  const [bills, setBills] = useState([]);
  const [payMethod, setPayMethod] = useState('bkash');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    const [s, b] = await Promise.all([apiFetch('/api/resident/summary'), apiFetch('/api/resident/bills')]);
    setSummary(s);
    setBills(b.bills || []);
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, [apiFetch]);

  const payBill = async () => {
    if (!summary?.bill?._id) return;
    try {
      const res = await apiFetch('/api/resident/payments', {
        method: 'POST',
        body: JSON.stringify({ billId: summary.bill._id, method: payMethod, amount: summary.bill.dueAmount }),
      });
      setMsg(`Payment successful! Ref: ${res.txnRef}`);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payments</h2>
        <p className="text-sm text-slate-600 mt-1">Pay your monthly bill via bKash, Rocket, Nagad or Card.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}

      {summary?.bill?.status === 'due' && (
        <div className="p-5 rounded-xl border bg-white space-y-3">
          <p className="font-semibold">Current Due: {summary.bill.dueAmount} BDT</p>
          <div className="flex flex-wrap gap-2 items-center">
            <select className="select select-bordered select-sm" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
              {PAY_METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button className="btn btn-sm bg-emerald-500 text-white" onClick={payBill}>Pay Now</button>
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl border bg-white">
        <h3 className="font-semibold mb-3">Bill History</h3>
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <thead>
              <tr>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b._id}>
                  <td>{b.period}</td>
                  <td>{b.amount} BDT</td>
                  <td className="capitalize">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResidentPayments;
