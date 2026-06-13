import { useState, useEffect } from 'react';

const EMPTY_FORM = {
  name: '',
  category: '',
  serial_number: '',
  status: 'Available',
  assigned_to: '',
  location: '',
};

const FIELDS = [
  { label: 'Name *', name: 'name' },
  { label: 'Category', name: 'category' },
  { label: 'Serial Number', name: 'serial_number' },
  { label: 'Assigned To', name: 'assigned_to' },
  { label: 'Location', name: 'location' },
];

export default function AssetModal({ asset, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    setForm(
      asset
        ? {
            name: asset.name || '',
            category: asset.category || '',
            serial_number: asset.serial_number || '',
            status: asset.status || 'Available',
            assigned_to: asset.assigned_to || '',
            location: asset.location || '',
          }
        : EMPTY_FORM
    );
  }, [asset]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Asset name is required.');
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {asset ? 'Edit Asset' : 'Add New Asset'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {FIELDS.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Available</option>
              <option>In Use</option>
              <option>Under Maintenance</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 transition-colors"
            >
              {asset ? 'Save Changes' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
