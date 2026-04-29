interface ServiceTileProps {
  title: string;
  icon: string;
  iconColor?: string;
  iconBg?: string;
}

export default function ServiceTile({ title, icon, iconColor = '#2563eb', iconBg = '#eff6ff' }: ServiceTileProps) {
  return (
    <div className="card-tile surface-card p-4 border-round-3xl shadow-1 hover:shadow-4 border-1 border-transparent hover:border-blue-100 cursor-pointer transition-all transition-duration-300 flex flex-column h-full relative overflow-hidden"
         style={{ minHeight: '220px' }}>
      
      {/* Top right arrow in circle */}
      <div className="absolute top-0 right-0 m-3 flex align-items-center justify-content-center border-round-circle bg-gray-100" 
           style={{ width: '28px', height: '28px' }}>
        <i className="pi pi-arrow-up-right text-xs text-700 font-bold"></i>
      </div>

      <div className="flex align-items-center justify-content-center border-round-2xl mb-4" 
           style={{ width: '64px', height: '64px', backgroundColor: iconBg }}>
        <i className={`${icon} text-3xl`} style={{ color: iconColor }}></i>
      </div>
      
      <h3 className="text-lg font-bold text-900 line-height-3 mb-0 mt-auto pr-2">
        {title}
      </h3>
    </div>
  );
}

