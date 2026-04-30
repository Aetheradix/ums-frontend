import { useState } from 'react';
import { TextBox } from '../components/forms';
import { Grid } from '../components/grid';
import './GridPanel.css';

interface GridPanelProps<T> extends Controls.GridProps<T> {
  title?: string;
  toolbar?: React.ReactElement;
  searchBox?: boolean;
  exportExcel?: boolean;
  onExportExcel?: () => void;
  isExporting?: boolean;
  print?: boolean;
  onPrint?: () => void;
  isPrint?: boolean;
  cellMemo?: boolean;
  actionButtons?: React.ReactElement;
  onValueChange?: (value: T[]) => void;
  onSort?: (e: { sortField?: string; sortOrder?: number }) => void;
  onFilter?: (e: { globalFilter?: string }) => void;
  sortField?: string | null;
  sortOrder?: number | null;
}

export default function GridPanel<T>({
  title,
  toolbar,
  searchBox = true,
  exportExcel = false,
  onExportExcel,
  isExporting,
  print = false,
  onPrint,
  isPrint,
  cellMemo = true,
  actionButtons,
  onValueChange,
  onSort,
  onFilter,
  sortField,
  sortOrder,
  ...rest
}: GridPanelProps<T>) {
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');

  const currentGlobalFilter = rest.globalFilter ?? internalGlobalFilter;

  const handleFilterChange = (value: string) => {
    if (onFilter) {
      onFilter({ globalFilter: value });
    } else {
      setInternalGlobalFilter(value);
    }
  };

  return (
    <div className="grid-panel-wrapper">
      <div className="grid-panel-header">
        <span className="grid-panel-title">{title}</span>
        <div className="grid-panel-toolbar">
          {toolbar}
          {actionButtons}
          {searchBox ? (
            <TextBox
              value={currentGlobalFilter}
              onChange={handleFilterChange}
              placeholder="Search..."
              icon="search"
              iconPosition="right"
            />
          ) : undefined}
        </div>
      </div>
      <Grid
        {...rest}
        globalFilter={currentGlobalFilter}
        cellMemo={cellMemo}
        onValueChange={onValueChange}
        onSort={onSort}
        onFilter={onFilter}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
}
