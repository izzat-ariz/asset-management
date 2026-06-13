import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AssetTable from './components/AssetTable';
import AssetModal from './components/AssetModal';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchAssets = async () => {
    setLoading(true);
    const res = await fetch('/api/assets');
    const data = await res.json();
    setAssets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAdd = () => {
    setEditingAsset(null);
    setModalOpen(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this asset?')) return;
    await fetch(`/api/assets/${id}`, { method: 'DELETE' });
    fetchAssets();
  };

  const handleSave = async (formData) => {
    const method = editingAsset ? 'PUT' : 'POST';
    const url = editingAsset ? `/api/assets/${editingAsset.id}` : '/api/assets';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setModalOpen(false);
    fetchAssets();
  };

  const filtered = assets.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.category || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Asset Management</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Asset
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <Dashboard assets={assets} />
        <AssetTable
          assets={filtered}
          loading={loading}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {modalOpen && (
        <AssetModal
          asset={editingAsset}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
