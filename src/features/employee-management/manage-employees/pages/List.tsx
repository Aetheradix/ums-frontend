import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { useGetBasicEmployeesQuery } from '../queries';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBasicEmployeesQuery();

  return (
    <FormPage
      title="Manage Employee"
      description="View and manage the list of all employees in the system."
    >
      <FormCard>
        {isLoading && <Loader />}
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
            { field: 'employeeNature', header: 'Nature' },
            // { field: 'organizationUnit', header: 'Org. Unit' },
            // { field: 'post', header: 'Post' },
            // { field: 'subjectSpecialization', header: 'Specialization' },
            {
              header: 'Action',
              sortable: false,
              cell: (item: EmployeeManagement.EmployeeBasicInfoDto) => (
                <Button
                  label="View Profile"
                  icon="eye"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate(`/employee-management/manage-employees/${item.id}`)
                  }
                />
              ),
            },
          ]}
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
