import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useAcademicYearActiveStatusMutation,
  useAcademicYearsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useAcademicYearsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useAcademicYearActiveStatusMutation();

  const handleToggleStatus = async (item: Master.AcademicYearItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Academic Year"
      description="Manage the list of all academic years in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={item => navigate(masterUrls.academicYear.edit(item.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.AcademicYearItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleToggleStatus(item)}
                />
              ),
            },
          ]}
          toolbar={
            <Button
              label="Create"
              icon="plus"
              variant="primary"
              onClick={() => navigate(masterUrls.academicYear.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
