import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';

export default function MainHeader() {
  return (
    <div className="bg-white border-bottom-1 border-100 px-4 py-3 flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-3">
        <div
          className="bg-900 text-white border-round-md flex align-items-center justify-content-center font-bold shadow-sm"
          style={{ width: '40px', height: '40px', backgroundColor: '#18181b' }}
        >
          N
        </div>
        <div>
          <div
            className="font-bold text-base line-height-1"
            style={{ color: 'var(--dark-text, #111827)' }}
          >
            UMS ERP
          </div>
          <div
            className="text-xs font-bold mt-1"
            style={{ color: 'var(--dark-text-secondary, #6b7280)' }}
          >
            Workspace OS
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl px-8 ml-8">
        <div className="relative w-full h-3rem">
          <i
            className="pi pi-search text-500 absolute left-0 top-50 translate-middle-y ml-3"
            style={{ pointerEvents: 'none' }}
          ></i>
          <InputText
            placeholder="Search Services,records,people..."
            className="w-full border-none h-full border-round-lg text-sm font-semibold"
            style={{
              backgroundColor: 'var(--dark-input-bg, #f4f4f5)',
              paddingLeft: '3rem',
            }}
          />
        </div>
      </div>

      <div className="flex align-items-center gap-4 text-700">
        <div className="flex gap-4 pr-3 border-right-1 border-100">
          <i className="pi pi-question-circle text-2xl cursor-pointer hover:text-blue-600 transition-colors"></i>
          <div className="relative cursor-pointer">
            <i className="pi pi-bell text-2xl hover:text-blue-600 transition-colors"></i>
            <span
              className="absolute top-0 right-0 bg-red-500 border-circle flex align-items-center justify-content-center text-white font-bold"
              style={{
                width: '15px',
                height: '15px',
                fontSize: '9px',
                transform: 'translate(40%, -20%)',
              }}
            >
              1
            </span>
          </div>
          <i className="pi pi-th-large text-2xl cursor-pointer hover:text-blue-600 transition-colors"></i>
        </div>

        <div className="flex align-items-center gap-2 cursor-pointer">
          <Avatar
            label="AL"
            shape="circle"
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          />
          <span className="font-bold text-900 text-sm">Alex Lin</span>
          <i className="pi pi-chevron-down text-xs text-400"></i>
        </div>
      </div>
    </div>
  );
}
