import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'shared/new-components/Breadcrumb';
import { useMenu } from '../../../../config/menu-routes';
import { homeUrls } from '../../urls';
import '../styles/subMenu.css';
import { useAuth } from 'auth/useAuth';

interface SubMenuHeaderProps {
  serviceTitle: string;
  category?: string;
}

function getModulePath(
  items: Menu.MenuItem[],
  slug: string,
  currentPath: Menu.MenuItem[] = []
): Menu.MenuItem[] | undefined {
  for (const item of items) {
    if (item.slug === slug) {
      return [...currentPath, item];
    }
    if (item.children) {
      const found = getModulePath(item.children, slug, [...currentPath, item]);
      if (found) return found;
    }
  }
  return undefined;
}

const SubMenuHeader: React.FC<SubMenuHeaderProps> = ({
  serviceTitle,
  category,
}) => {
  const menuConfig = useMenu();
  const { moduleId } = useParams<{ moduleId: string }>();
  const path = moduleId ? getModulePath(menuConfig, moduleId) : undefined;

  const { user } = useAuth();
  const firstName = user?.profile?.given_name || '';
  const lastName = user?.profile?.family_name || '';
  const userName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : user?.profile?.name || 'User';

  const breadcrumbItems = React.useMemo(() => {
    if (!path || path.length === 0) {
      return [
        { label: 'Home', to: homeUrls.menu.root },
        { label: serviceTitle },
      ];
    }

    const items: any[] = [{ label: 'Home', to: homeUrls.menu.root }];

    path.forEach((item, index) => {
      const isLast = index === path.length - 1;
      items.push({
        label: item.label,
        to: isLast
          ? undefined
          : item.slug
            ? `/home/sub-menu/${item.slug}`
            : undefined,
      });
    });

    return items;
  }, [path, serviceTitle, category]);

  return (
    <div className="submenu-header">
      <Breadcrumb items={breadcrumbItems} />

      <div className="submenu-welcome">
        <h1>
          Welcome, <span className="submenu-name">{userName}</span>
        </h1>
        <p>Select a submodule to manage your workspace.</p>
      </div>
    </div>
  );
};

export default SubMenuHeader;
