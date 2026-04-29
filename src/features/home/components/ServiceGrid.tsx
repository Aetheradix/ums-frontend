import ServiceTile from './ServiceTile';

const services = [
  { title: 'Student Information System', icon: 'pi pi-graduation-cap', color: '#2563eb', bg: '#eff6ff' },
  { title: 'Faculty Portal', icon: 'pi pi-users', color: '#9333ea', bg: '#faf5ff' },
  { title: 'Registrar / Admin Dashboard', icon: 'pi pi-id-card', color: '#0f172a', bg: '#f1f5f9' },
  { title: 'Curriculog — Curriculum Governance', icon: 'pi pi-book', color: '#16a34a', bg: '#f0fdf4' },
  { title: 'Competency Tracking', icon: 'pi pi-power-off', color: '#ea580c', bg: '#fff7ed' },
  { title: 'Career Gateway', icon: 'pi pi-shopping-bag', color: '#dc2626', bg: '#fef2f2' },
  { title: 'ICON - Research Compliance', icon: 'pi pi-shield', color: '#ea580c', bg: '#fff7ed' },
  { title: 'Disability Center', icon: 'pi pi-user', color: '#dc2626', bg: '#fef2f2' },
  { title: 'Student ID & Campus Allowance', icon: 'pi pi-id-card', color: '#2563eb', bg: '#eff6ff' },
  { title: 'University Queue - Virtual Queuing', icon: 'pi pi-calendar-times', color: '#9333ea', bg: '#faf5ff' },
  { title: 'FIXIT — Facility Management', icon: 'pi pi-cog', color: '#475569', bg: '#f8fafc' },
  { title: 'Scholarship & Grants', icon: 'pi pi-verified', color: '#16a34a', bg: '#f0fdf4' },
];

export default function ServiceGrid() {
  return (
    <div className="grid">
      {services.map((service, index) => (
        <div key={index} className="col-12 sm:col-6 lg:col-4 xl:col-2 p-2">
          <ServiceTile 
            title={service.title} 
            icon={service.icon} 
            iconColor={service.color}
            iconBg={service.bg}
          />
        </div>
      ))}
    </div>
  );
}
