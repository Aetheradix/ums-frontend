export default function Dashboard() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
      <p className="text-lg text-gray-700">
        You are successfully accessing the University Management System.
      </p>
      <div className="mt-4 grid">
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Total Students</div>
            <div className="text-3xl font-bold text-blue-600">1,248</div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Active Faculty</div>
            <div className="text-3xl font-bold text-green-600">84</div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-4 p-3">
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="text-900 font-medium mb-3">Pending Reports</div>
            <div className="text-3xl font-bold text-orange-600">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}

