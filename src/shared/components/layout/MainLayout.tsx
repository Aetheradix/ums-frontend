import { masterUrls } from 'features/master/urls';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-column min-h-screen">
      <header className="bg-blue-600 text-white p-3 flex justify-content-between align-items-center shadow-2">
        <div className="text-xl font-bold">University Management System</div>
        <div className="flex align-items-center gap-3">
          <span>Welcome, User</span>
          {/* Logout button can be hidden or disabled as there's no auth */}
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-100 p-3 w-15rem border-right-1 border-300">
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-3 border-round no-underline transition-colors transition-duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold shadow-1'
                      : 'text-700 hover:bg-gray-200'
                  }`
                }
              >
                <i className="pi pi-home mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  `block p-3 border-round no-underline transition-colors transition-duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold shadow-1'
                      : 'text-700 hover:bg-gray-200'
                  }`
                }
              >
                <i className="pi pi-users mr-2" />
                Students
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block p-3 border-round no-underline transition-colors transition-duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold shadow-1'
                      : 'text-700 hover:bg-gray-200'
                  }`
                }
              >
                <i className="pi pi-cog mr-2" />
                Settings
              </NavLink>
            </li>

            <div className="text-500 font-bold mt-4 mb-2 uppercase text-xs">
              Masters
            </div>
            <li className="mb-2">
              <NavLink
                to={masterUrls.subjectCategory.root}
                className={({ isActive }) =>
                  `block p-3 border-round no-underline transition-colors transition-duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold shadow-1'
                      : 'text-700 hover:bg-gray-200'
                  }`
                }
              >
                <i className="pi pi-list mr-2" />
                Subject Category
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to={masterUrls.officeType.root}
                className={({ isActive }) =>
                  `block p-3 border-round no-underline transition-colors transition-duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold shadow-1'
                      : 'text-700 hover:bg-gray-200'
                  }`
                }
              >
                <i className="pi pi-list mr-2" />
                Office Type
              </NavLink>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-4 surface-ground">{children}</main>
      </div>

      <footer className="bg-gray-800 text-white p-3 text-center">
        &copy; 2026 University Management System. All rights reserved.
      </footer>
    </div>
  );
}
