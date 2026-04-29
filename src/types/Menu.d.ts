declare namespace Menu {
  interface MenuItem {
    label: string;
    icon?: string | React.ReactNode;
    colorScheme?:
      | 'blue'
      | 'purple'
      | 'gray'
      | 'green'
      | 'orange'
      | 'red'
      | 'pink'
      | 'teal'
      | 'indigo'
      | 'amber';
    slug?: string;
    path?: string;
    description?: string;
    badge?: string;
    badgeColor?: string;
    category?: string;
    children?: MenuItem[];
  }
}
