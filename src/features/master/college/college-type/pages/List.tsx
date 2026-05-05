import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useCollegeTypesQuery, useCollegeTypeActiveStatusMutation } from '../queries';

export default function List() {
  const { data, isLoading } = useCollegeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCollegeTypeActiveStatusMutation();

  const handleToggleStatus = async (item: CollegeMaster.CollegeTypeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="College Type"
      description="Manage the list of all college types in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={collegeType =>
            navigate(masterUrls.collegeType.edit(collegeType.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: CollegeMaster.CollegeTypeItem) => (
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
              onClick={() => navigate(masterUrls.collegeType.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
