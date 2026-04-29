import { Button } from 'primereact/button';

export default function DashboardHeader() {
  return (
    <div className="p-6 border-round-3xl mb-6 flex flex-column md:flex-row align-items-center justify-content-between relative" 
         style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)', border: '1px solid #e2e8f0' }}>
      
      <div className="z-1">
        <div className="flex align-items-center gap-2 mb-4">
          <span className="bg-white text-900 text-xs font-bold border-1 border-100 border-round-2xl px-3 py-2 shadow-sm flex align-items-center">
            <i className="pi pi-hashtag text-blue-500 mr-2" style={{ fontSize: '10px' }}></i>
            Logged in via UMS SSO · session expires in 86 days
          </span>
        </div>
        <h1 className="text-6xl font-bold text-900 mb-3" style={{ letterSpacing: '-1px' }}>
          Welcome, <span className="text-blue-600">Alex Lin</span>
        </h1>
        <p className="text-xl text-500 font-medium max-w-lg line-height-3">
          Your unified workspace. Every service, every record — one tile away.
        </p>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0 z-1">
        <Button 
          label="Export" 
          icon="pi pi-external-link" 
          className="p-button-outlined p-button-secondary bg-white border-300 text-900 font-bold px-4 py-2 border-round-lg shadow-sm" 
          style={{ borderColor: '#cbd5e1' }}
        />
        <Button 
          label="New record" 
          icon="pi pi-plus" 
          className="p-button-raised border-none px-4 py-2 border-round-lg shadow-lg font-bold" 
          style={{ background: '#1a1a1a', color: 'white' }}
        />
      </div>
    </div>
  );
}

