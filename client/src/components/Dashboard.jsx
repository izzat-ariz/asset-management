export default function Dashboard({ assets }) {
  const total = assets.length;
  const available = assets.filter((a) => a.status === 'Available').length;
  const inUse = assets.filter((a) => a.status === 'In Use').length;
  const maintenance = assets.filter((a) => a.status === 'Under Maintenance').length;

  const cards = [
    { label: 'Total Assets', value: total, bg: 'bg-gray-800', text: 'text-white' },
    { label: 'Available', value: available, bg: 'bg-green-500', text: 'text-white' },
    { label: 'In Use', value: inUse, bg: 'bg-blue-500', text: 'text-white' },
    { label: 'Under Maintenance', value: maintenance, bg: 'bg-red-500', text: 'text-white' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} ${card.text} rounded-xl p-5 shadow`}>
          <p className="text-sm opacity-80">{card.label}</p>
          <p className="text-3xl font-bold mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
