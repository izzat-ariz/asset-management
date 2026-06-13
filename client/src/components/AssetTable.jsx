const STATUS_COLORS = {
  Available: 'bg-green-100 text-green-800',
  'In Use': 'bg-blue-100 text-blue-800',
  'Under Maintenance': 'bg-red-100 text-red-800',
};

const COLUMNS = ['Name', 'Category', 'Serial No.', 'Status', 'Assigned To', 'Location', 'Date Added', 'Actions'];

export default function AssetTable({
  assets, loading, search, setSearch, statusFilter, setStatusFilter, onEdit, onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Available</option>
          <option>In Use</option>
          <option>Under Maintenance</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {COLUMNS.map((col) => (
                <th key={col} className="px-4 py-3 text-left whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">Loading...</td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">No assets found.</td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{asset.name}</td>
                  <td className="px-4 py-3 text-gray-600">{asset.category || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{asset.serial_number || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[asset.status] || 'bg-gray-100 text-gray-600'}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{asset.assigned_to || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{asset.location || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(asset.date_added).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(asset)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(asset.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
