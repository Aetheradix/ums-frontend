import type { ReactNode } from 'react';
import { useState } from 'react';
import { FormPage, Tabs } from 'shared/new-components';
import type { TabItemProps } from 'shared/new-components/Tabs';
import './profile.css';

interface ProfilePageProps {
  title: string;
  description?: string;
  /** The horizontal banner card beneath the page header */
  summaryCard: ReactNode;
  /** Action buttons rendered top-right (edit, back, more menu, etc.) */
  actions?: ReactNode;
  /** Tab definitions — title + content. You define these per entity. */
  tabs: (Omit<TabItemProps, 'content'> & { content: ReactNode })[];
}

export default function ProfilePage({
  title,
  description,
  summaryCard,
  actions,
  tabs,
}: ProfilePageProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <FormPage title={title} description={description}>
      <div className="profile-page">
        {actions && <div className="profile-page-actions">{actions}</div>}

        {summaryCard}

        <Tabs
          activeIndex={activeTabIndex}
          onTabChange={e => setActiveTabIndex(e.index)}
          className="profile-page-tabs"
          tabs={tabs}
        />
      </div>
    </FormPage>
  );
}
