import { Column } from 'primereact/column';
import {
  DataTable,
  type DataTableProps,
  type DataTableValueArray,
} from 'primereact/datatable';
import React from 'react';
import { Loader } from '../progress';
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
    rowsPerPageOptions: [10, 20, 30, 50],
    paginatorTemplate:
      'CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    currentPageReportTemplate: 'Showing {first}-{last} of {totalRecords} items',
  };

  if (pagination === true) {
    return { rows: 10, ...defaultProps };
  }

  const paginationType = pagination as Controls.PaginationProps;

  return {
    ...defaultProps,
    rows: paginationType.rows ?? 10,
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

  // 🔥 Dummy data for testing
  const dummyData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `State ${i + 1}`,
    code: `C${i + 1}`,
    isActive: i % 2 === 0,
  }));
  return (
    <DataTable
      value={
        (data && (data as DataTableValueArray).length
          ? data
          : dummyData) as DataTableValueArray
      }
      scrollable
      scrollHeight={rest.scrollHeight ?? '500px'}
      className="w-full"
      globalFilterFields={searchFields as string[]}
      emptyMessage="No Records Found"
      loadingIcon={<Loader type="inline" />}
      {...(rest as DataTableProps<DataTableValueArray>)}
      onValueChange={onValueChange as (e: DataTableValueArray) => void}
      {...pageProps}
      paginator={!!pageProps}
      pageLinkSize={3}
      paginatorDropdownAppendTo={document.body}
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
          className="grid-action-col-sm"
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
          className="grid-action-col-md"
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
