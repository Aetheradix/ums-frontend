import { masterUrls } from 'features/master/urls';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-column min-h-screen">


      <div className="flex flex-1 ">
        {/* <aside className="bg-gray-100 p-3 w-15rem border-right-1 border-300">
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
          </ul>
        </aside> */}

        <main className="flex-1 surface-ground">{children}</main>
      </div>




      {/* Footer */}
      <div className="footer">
        <span>© 2026 UMS Systems - Enterprise Operating System</span>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </div>
    </div>
  );
}
