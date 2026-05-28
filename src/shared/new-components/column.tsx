import type { ReactNode } from 'react';

interface ColumnProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 6 | 12; // Controls widths
  className?: string;
}

export function Column({ children, span = 12, className = '' }: ColumnProps) {
  // Mapping spans to Tailwind width percentages
  const widthClasses: Record<number, string> = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-1/4', // 25% width
    4: 'w-1/3', // 33.33% width
    5: 'w-2/3', // 66.67% width
    6: 'w-1/2', // 50% width
    12: 'w-full', // 100% width
  };

  return (
    <div className={`px-3 mb-4 ${widthClasses[span]} ${className}`}>
      {children}
    </div>
  );
}

// A Row wrapper companion to hold your columns
export function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap -mx-3">{children}</div>;
}
