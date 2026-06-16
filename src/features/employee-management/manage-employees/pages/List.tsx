import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/buttons';
import GridActionButtons from 'shared/components/grid/GridActionButtons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { useGetBasicEmployeesQuery } from '../queries';

const PAGE_SIZE = 10;

export default function List() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isPlaceholderData } = useGetBasicEmployeesQuery(
    pageNumber,
    PAGE_SIZE
  );

  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <FormPage
      title="Manage Employee"
      description="View and manage the list of all employees in the system."
    >
      <FormCard>
        {isLoading && <Loader />}

        <div className="employee-management-grid">
          <GridPanel
            data={items}
            pagination={false}
            loading={isPlaceholderData}
            columns={[
              {
                cell: (_, option) => (
                  <span>
                    {(pageNumber - 1) * PAGE_SIZE + option.rowIndex + 1}
                  </span>
                ),
                width: '30px',
              },
              { field: 'employeeCode', header: 'Employee Code' },
              { field: 'fullName', header: 'Name' },
              { field: 'gender', header: 'Gender' },
              { field: 'employeeNature', header: 'Nature' },
              { field: 'organizationUnit', header: 'Org. Unit' },
              { field: 'post', header: 'Post' },
              { field: 'subjectSpecialization', header: 'Specialization' },
              {
                header: 'Action',
                sortable: false,
                cell: (item: EmployeeManagement.EmployeeBasicInfoDto) => (
                  <GridActionButtons
                    onView={() =>
                      navigate(
                        `/employee-management/manage-employees/${item.id}`
                      )
                    }
                    onEdit={() =>
                      navigate(
                        `/employee-management/manage-employees/${item.id}/edit`
                      )
                    }
                    onDelete={() => {}}
                  />
                ),
              },
            ]}
            searchBox
            searchPlaceholder="Search by code, name, gender, nature, organization unit, post, specialization..."
            actionButtons={
              <>
                <Button
                  label="Export"
                  icon="download"
                  variant="outlined"
                  size="small"
                  onClick={() => {}}
                />

                <Button
                  label="Add Employee"
                  icon="plus"
                  variant="primary"
                  size="small"
                  onClick={() =>
                    navigate('/employee-management/quick-onboarding')
                  }
                />
              </>
            }
          />

          {/* Server-side Pagination Controls */}
          {totalCount > 0 && (
            <div className="flex items-center justify-between mt-3 px-2">
              <span className="text-sm text-gray-500">
                Showing {(pageNumber - 1) * PAGE_SIZE + 1}–
                {Math.min(pageNumber * PAGE_SIZE, totalCount)} of {totalCount}{' '}
                employees
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-button p-button-outlined p-button-sm"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber(prev => prev - 1)}
                >
                  <i className="pi pi-angle-left" />
                </button>

                <span className="text-sm font-medium">
                  Page {pageNumber} of {data?.totalPages ?? 1}
                </span>

                <button
                  type="button"
                  className="p-button p-button-outlined p-button-sm"
                  disabled={pageNumber >= (data?.totalPages ?? 1)}
                  onClick={() => setPageNumber(prev => prev + 1)}
                >
                  <i className="pi pi-angle-right" />
                </button>
              </div>
            </div>
          )}
        </div>
      </FormCard>
    </FormPage>
  );
}
