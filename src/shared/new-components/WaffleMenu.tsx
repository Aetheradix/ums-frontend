import { menuConfig } from 'config/menu-routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WaffleMenuProps {
  isDarkMode?: boolean;
}

const mapToPiIcon = (icon: any) => {
  if (typeof icon !== 'string') return 'pi-th-large';
  const map: Record<string, string> = {
    school: 'pi-book',
    groups: 'pi-users',
    grid_view: 'pi-th-large',
    menu_book: 'pi-bookmark',
    bolt: 'pi-bolt',
    work: 'pi-briefcase',
    science: 'pi-compass',
    accessible: 'pi-user',
    credit_card: 'pi-id-card',
    desktop_windows: 'pi-desktop',
    build: 'pi-cog',
    workspace_premium: 'pi-star-fill',
    settings: 'pi-sliders-v',
    apartment: 'pi-building',
    edit_location: 'pi-map-marker',
    domain: 'pi-home',
    badge: 'pi-id-card',
  };
  return map[icon || ''] || `pi-${icon || 'th-large'}`;
};

const mapColorScheme = (
  colorScheme: string | undefined,
  isDarkMode: boolean
) => {
  const map: Record<string, string> = {
    blue: isDarkMode
      ? 'bg-blue-900/30 text-blue-300 border-blue-700/40'
      : 'bg-blue-50 text-blue-600 border-blue-100',
    purple: isDarkMode
      ? 'bg-purple-900/30 text-purple-300 border-purple-700/40'
      : 'bg-purple-50 text-purple-600 border-purple-100',
    gray: isDarkMode
      ? 'bg-slate-700 text-slate-300 border-slate-600/40'
      : 'bg-slate-100 text-slate-600 border-slate-200/40',
    green: isDarkMode
      ? 'bg-emerald-900/30 text-emerald-300 border-emerald-700/40'
      : 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: isDarkMode
      ? 'bg-orange-900/30 text-orange-300 border-orange-700/40'
      : 'bg-orange-50 text-orange-600 border-orange-100',
    red: isDarkMode
      ? 'bg-red-900/30 text-red-300 border-red-700/40'
      : 'bg-red-50 text-red-600 border-red-100',
    pink: isDarkMode
      ? 'bg-pink-900/30 text-pink-300 border-pink-700/40'
      : 'bg-pink-50 text-pink-600 border-pink-100',
    teal: isDarkMode
      ? 'bg-teal-900/30 text-teal-300 border-teal-700/40'
      : 'bg-teal-50 text-teal-600 border-teal-100',
    indigo: isDarkMode
      ? 'bg-indigo-900/30 text-indigo-300 border-indigo-700/40'
      : 'bg-indigo-50 text-indigo-600 border-indigo-100',
    amber: isDarkMode
      ? 'bg-amber-900/30 text-amber-300 border-amber-700/40'
      : 'bg-amber-50 text-amber-600 border-amber-100',
  };
  return map[colorScheme || ''] || map.gray;
};

export default function WaffleMenu({ isDarkMode = false }: WaffleMenuProps) {
  const [isWaffleOpen, setIsWaffleOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isWaffleOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.ws-waffle-wrapper')) {
        setIsWaffleOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isWaffleOpen]);

  return (
    <div className="ws-waffle-wrapper relative">
      <div
        className={`ws-icon-btn ${isWaffleOpen ? 'ws-active' : ''}`}
        onClick={() => setIsWaffleOpen(prev => !prev)}
        title="Waffle Menu"
        style={{ cursor: 'pointer' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </div>

      {isWaffleOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-[320px] max-h-[480px] overflow-y-auto ${isDarkMode ? 'bg-slate-800 border-slate-700/80 text-white' : 'bg-white border-slate-200/80 text-slate-800'} border rounded-2xl shadow-xl z-50 p-4 grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-150 select-none`}
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          {menuConfig.map((item, i) => (
            <div
              key={item.slug || i}
              onClick={() => {
                setIsWaffleOpen(false);
                if (item.slug) {
                  navigate(`/home/sub-menu/${item.slug}`);
                }
              }}
              className={`flex flex-col items-center p-3 rounded-xl ${isDarkMode ? 'hover:bg-slate-700/60' : 'hover:bg-slate-50'} transition-all cursor-pointer text-center group`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform mb-2 border shadow-sm ${mapColorScheme(item.colorScheme, isDarkMode)}`}
              >
                <i className={`pi ${mapToPiIcon(item.icon)} text-2xl`}></i>
              </div>
              <span
                className={`text-xs font-medium ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'} transition-colors line-clamp-2 min-h-[32px] flex items-center justify-center leading-tight`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
