import { Button } from 'primereact/button';
import { useState } from 'react';

const categories = [
  { id: 'favourite', label: 'Favourite', icon: 'pi pi-star-fill' },
  { id: 'all', label: 'All' },
  { id: 'academics', label: 'Academics' },
  { id: 'hr', label: 'HR' },
  { id: 'finance', label: 'Finance' },
  { id: 'operation', label: 'Operation' },
];

export default function CategoryFilter() {
  const [activeTab, setActiveTab] = useState('favourite');

  return (
    <div className="flex align-items-center justify-content-between mb-5 px-2">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            label={cat.label}
            icon={cat.icon}
            onClick={() => setActiveTab(cat.id)}
            className={`p-button-rounded px-4 py-2 text-sm font-bold transition-all transition-duration-200 border-none shadow-none
              ${activeTab === cat.id 
                ? 'bg-blue-600 text-white shadow-3' 
                : 'bg-white text-700 hover:surface-100 border-1 border-100'}`}
            style={activeTab === cat.id ? { backgroundColor: '#2563eb' } : {}}
          />
        ))}
      </div>
      
      <Button 
        label="Customized Tiles" 
        icon="pi pi-arrow-right" 
        iconPos="right" 
        className="p-button-link font-bold text-blue-600 text-sm no-underline hover:underline"
      />
    </div>
  );
}

