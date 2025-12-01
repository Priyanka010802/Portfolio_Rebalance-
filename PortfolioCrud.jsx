import React, { useState } from 'react';

export default function Portfolio({ portfolio, setPortfolio }) {
  const [form, setForm] = useState({ name: '', value: '', targetPercent: '', volatility: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.value || !form.targetPercent) return;

    if (editingId) {
      const updated = portfolio.map(asset =>
        asset.id === editingId ? { ...asset, ...form, value: +form.value, targetPercent: +form.targetPercent, volatility: +form.volatility || 0 } : asset
      );
      setPortfolio(updated);
      setEditingId(null);
    } else {
      const newAsset = { ...form, id: Date.now(), value: +form.value, targetPercent: +form.targetPercent, volatility: +form.volatility || 0 };
      setPortfolio([...portfolio, newAsset]);
    }
    setForm({ name: '', value: '', targetPercent: '', volatility: '' });
  };

  const handleDelete = id => setPortfolio(portfolio.filter(asset => asset.id !== id));

  const handleEdit = asset => setForm({
    name: asset.name,
    value: asset.value,
    targetPercent: asset.targetPercent,
    volatility: asset.volatility,
  }, setEditingId(asset.id));

  return (
    <>
      <h2>Portfolio Management</h2>
      <form onSubmit={handleSubmit} className="mb-3 d-flex gap-2 flex-wrap">
        <input className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/>
        <input className="form-control" type="number" step="0.01" placeholder="Value" value={form.value} onChange={e => setForm({...form, value: e.target.value})} required/>
        <input className="form-control" type="number" step="0.01" placeholder="Target %" value={form.targetPercent} onChange={e => setForm({...form, targetPercent: e.target.value})} required/>
        <input className="form-control" type="number" step="0.01" placeholder="Volatility" value={form.volatility} onChange={e => setForm({...form, volatility: e.target.value})} />
        <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button className="btn btn-secondary" type="button" onClick={() => { setForm({name:'',value:'',targetPercent:'',volatility:''}); setEditingId(null); }}>Cancel</button>}
      </form>

      <table className="table table-striped">
        <thead><tr><th>Name</th><th>Value</th><th>Target %</th><th>Volatility</th><th>Actions</th></tr></thead>
        <tbody>
          {portfolio.map(asset => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.value.toFixed(2)}</td>
              <td>{(asset.targetPercent * 100).toFixed(2)}%</td>
              <td>{(asset.volatility * 100).toFixed(2)}%</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(asset)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(asset.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {portfolio.length === 0 && <tr><td colSpan="5" className="text-center">No assets found.</td></tr>}
        </tbody>
      </table>
    </>
  );
}
