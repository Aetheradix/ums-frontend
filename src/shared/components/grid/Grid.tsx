import { Column } from 'primereact/column';
import {
  DataTable,
  type DataTableProps,
  type DataTableValueArray,
} from 'primereact/datatable';
import React from 'react';
import ButtonColumn from './ButtonColumn';
import './Grid.css';

function mapColumns<T>(columns: Controls.ColumnProps<T>[]) {
  return columns.map(
    ({ sortable = true, filter = false, footer = false, ...column }) => {
      return (
        <Column
          body={column.cell}
          field={column.field as string}
          header={column.header}
          style={{ width: column.width }}
          sortable={column.field && sortable ? sortable : false}
          sortField={column.field as string}
          filter={filter}
          footer={column.field && footer ? footer : true}
        />
      );
    }
  );
}

function paginationProps(pagination: Controls.Pagination) {
  if (pagination === false) {
    return undefined;
  }

  const defaultProps = {
    rowsPerPageOptions: [10, 20, 30, 50, 100, 150, 200],
    currentPageReportTemplate: '{first}-{last} of {totalRecords} records',
    paginatorTemplate:
      'RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport',
  };
  if (pagination === true) {
    return { rows: 100, ...defaultProps };
  }

  const paginationType = pagination as Controls.PaginationProps;

  return {
    ...defaultProps,
    rows: paginationType.rows ?? 100,
  };
}

function Grid<T>({
  data,
  columns,
  editCaption,
  removeCaption,
  onEdit,
  onRemove,
  searchFields,
  pagination = true,
  onValueChange,
  ...rest
}: React.PropsWithChildren<Controls.GridProps<T>>) {
  const pageProps = paginationProps(pagination);
  return (
    <DataTable
      value={data as DataTableValueArray}
      scrollable
      scrollHeight={rest.scrollHeight ?? '500px'}
      style={{ width: '100%' }}
      globalFilterFields={searchFields as string[]}
      emptyMessage="No Records Found"
      {...(rest as DataTableProps<DataTableValueArray>)}
      onValueChange={onValueChange as (e: DataTableValueArray) => void}
      {...pageProps}
      paginator={!!pageProps}
      paginatorLeft={
        <span className="font-semibold text-sm">Records Per Page</span>
      }
      paginatorDropdownAppendTo="self"
      stripedRows
      removableSort={false}
      virtualScrollerOptions={
        rest.lazyVirtualization
          ? { disabled: false, lazy: true, itemSize: 50 }
          : undefined
      }
    >
      {columns && mapColumns(columns)}
      {rest.children}
      {onEdit ? (
        <Column
          header="Action"
          style={{ width: 110 }}
          body={item => (
            <ButtonColumn
              caption={editCaption ?? 'Edit'}
              icon="pencil"
              onClick={() => onEdit(item)}
            />
          )}
        />
      ) : undefined}

      {onRemove ? (
        <Column
          header="Action"
          style={{ width: 130 }}
          body={item => (
            <ButtonColumn
              caption={removeCaption ?? 'Remove'}
              icon="trash"
              onClick={() => onRemove(item)}
            />
          )}
        />
      ) : undefined}
    </DataTable>
  );
}

export default Grid;
