// pages/test-tool.js

import { useState } from 'react';

const platforms = [
  { id: 'bitget', label: 'Bitget' },
  { id: 'mexc',   label: 'MEXC'   },
  { id: 'phantom',label: 'Phantom Wallet' },
  { id: 'metamask',label:'MetaMask' },
  { id: 'trust',  label: 'Trust Wallet' },
];

export default function TestTool() {
  const [platform, setPlatform] = useState('bitget');
  const [creds, setCreds] = useState({ apiKey: '', secret: '', pass: '' });
  const [tx, setTx] = useState([]);
  const [err, setErr] = useState('');

  const loadData = async () => {
    setErr('');
    try {
      const res = await fetch(`/api/${platform}`, {
        headers: {
          'ACCESS-KEY': creds.apiKey,
          'ACCESS-SECRET': creds.secret,
          'ACCESS-PASSPHRASE': creds.pass,
        },
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setTx(json.transactions || []);
    } catch (e) {
      setErr(e.message);
      setTx([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Tool-Test</h1>
        {err && <div className="mb-4 text-red-600">{err}</div>}
        <label className="block mb-2">
          Plattform:
          <select
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          API Key:
          <input
            type="text"
            value={creds.apiKey}
            onChange={e => setCreds(c => ({ ...c, apiKey: e.target.value }))}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-2">
          Secret:
          <input
            type="text"
            value={creds.secret}
            onChange={e => setCreds(c => ({ ...c, secret: e.target.value }))}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Passphrase:
          <input
            type="text"
            value={creds.pass}
            onChange={e => setCreds(c => ({ ...c, pass: e.target.value }))}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <button
          onClick={loadData}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Transaktionen laden
        </button>

        {tx.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 border">Datum</th>
                  <th className="px-2 py-1 border">Asset</th>
                  <th className="px-2 py-1 border">Betrag</th>
                  <th className="px-2 py-1 border">Typ</th>
                </tr>
              </thead>
              <tbody>
                {tx.map((t, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <td className="px-2 py-1 border">{t.date}</td>
                    <td className="px-2 py-1 border">{t.asset}</td>
                    <td className="px-2 py-1 border">{t.amount}</td>
                    <td className="px-2 py-1 border">{t.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
