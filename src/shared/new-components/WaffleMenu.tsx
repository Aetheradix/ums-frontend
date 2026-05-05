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
      ? 'bg-zinc-800 text-zinc-300 border-zinc-700/40'
      : 'bg-zinc-100 text-zinc-600 border-zinc-200/40',

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

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isWaffleOpen]);

  return (
    <div className="ws-waffle-wrapper relative">
      {/* Waffle Trigger */}
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

      {/* Dropdown */}
      {isWaffleOpen && (
        <div
          className={`absolute right-0 top-full mt-3 w-[430px] max-h-[560px] overflow-hidden rounded-3xl border z-50 ${
            isDarkMode
              ? 'bg-[#09090b] border-[#27272a] text-[#fafafa]'
              : 'bg-white border-zinc-200 text-zinc-800'
          }`}
          style={{
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-5 pt-4 pb-3 border-b ${
              isDarkMode ? 'border-[#27272a]' : 'border-zinc-100'
            }`}
          >
            <h3 className="text-lg font-bold tracking-tight">Quick Links</h3>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-[#18181b] border border-[#27272a] text-zinc-100 hover:bg-[#27272a]'
                  : 'bg-zinc-50 border border-zinc-100 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <i className="pi pi-pen-to-square text-base" />
              <span>Edit</span>
            </button>
          </div>

          {/* Favorites */}
          <div className="px-5 pt-4">
            <div
              className={`text-[11px] font-extrabold tracking-wider uppercase mb-3 ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              Favorites
            </div>

            <div className="grid grid-cols-4 gap-3">
              {menuConfig.slice(0, 4).map((item, i) => (
                <div
                  key={item.slug || i}
                  onClick={() => {
                    setIsWaffleOpen(false);

                    if (item.slug) {
                      navigate(`/home/sub-menu/${item.slug}`);
                    }
                  }}
                  className={`rounded-2xl p-3 cursor-pointer border transition-all duration-200 group ${
                    isDarkMode
                      ? 'bg-[#18181b]/70 border-[#27272a] hover:bg-[#18181b]'
                      : 'bg-zinc-50 border-zinc-100 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm mb-2 ${mapColorScheme(
                      item.colorScheme,
                      isDarkMode
                    )}`}
                  >
                    <i className={`pi ${mapToPiIcon(item.icon)} text-xl`} />
                  </div>

                  <p className="text-[11px] leading-tight font-medium line-clamp-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="px-5 py-5">
            <div
              className={`text-[11px] font-extrabold tracking-wider uppercase mb-3 ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Categories
            </div>

            <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
              {menuConfig.map((item, i) => (
                <div
                  key={item.slug || i}
                  onClick={() => {
                    setIsWaffleOpen(false);

                    if (item.slug) {
                      navigate(`/home/sub-menu/${item.slug}`);
                    }
                  }}
                  className={`flex items-center justify-between rounded-2xl px-3 py-3 cursor-pointer transition-all duration-200 group ${
                    isDarkMode ? 'hover:bg-[#18181b]' : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${mapColorScheme(
                        item.colorScheme,
                        isDarkMode
                      )}`}
                    >
                      <i className={`pi ${mapToPiIcon(item.icon)} text-lg`} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {item.label}
                      </p>

                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <i
                    className={`pi pi-angle-right text-sm ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`px-5 py-4 border-t ${
              isDarkMode ? 'border-[#27272a]' : 'border-zinc-100'
            }`}
          >
            <button
              className={`w-full rounded-2xl py-3 text-sm font-semibold transition-all ${
                isDarkMode
                  ? 'bg-[#18181b] hover:bg-[#27272a] text-[#fafafa]'
                  : 'bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              View All Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
