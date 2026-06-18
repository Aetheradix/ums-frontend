import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/buttons';
import GridActionButtons from 'shared/components/grid/GridActionButtons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { useGetAllFullOnboardingQuery } from '../queries';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllFullOnboardingQuery();

  return (
    <FormPage
      title="Full Onboarding"
      description="View and manage employees onboarded through Full Onboarding."
    >
      <FormCard>
        {isLoading && <Loader />}

        <div className="employee-management-grid">
          <GridPanel
            data={data ?? []}
            columns={[
              {
                cell: (_, option) => <span>{option.rowIndex + 1}</span>,
                width: '30px',
              },
              { field: 'employeeCode', header: 'Employee Code' },
              { field: 'fullName', header: 'Name' },
              { field: 'gender', header: 'Gender' },
              { field: 'employeeNatureName', header: 'Nature' },
              { field: 'organizationUnitName', header: 'Org. Unit' },
              { field: 'postName', header: 'Post' },
              { field: 'subjectSpecializationName', header: 'Specialization' },
              {
                header: 'Action',
                sortable: false,
                cell: (item: EmployeeManagement.FullOnboardingItem) => (
                  <GridActionButtons
                    onView={() =>
                      navigate(
                        `/employee-management/manage-employees/${item.fullOnboardingId}`
                      )
                    }
                    onEdit={() =>
                      navigate(
                        `/employee-management/manage-employees/${item.fullOnboardingId}/edit`
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
                    navigate('/employee-management/full-onboarding/create')
                  }
                />
              </>
            }
          />
        </div>
      </FormCard>
    </FormPage>
  );
}
