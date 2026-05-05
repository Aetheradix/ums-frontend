import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useCollegeCategoriesQuery,
  useCollegeCategoryActiveStatusMutation,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCollegeCategoriesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCollegeCategoryActiveStatusMutation();

  const handleToggleStatus = async (item: CollegeMaster.CollegeCategoryItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="College Category"
      description="Manage the list of all college categories in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={collegeCategory =>
            navigate(masterUrls.collegeCategory.edit(collegeCategory.id))
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
              cell: (item: CollegeMaster.CollegeCategoryItem) => (
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
              onClick={() => navigate(masterUrls.collegeCategory.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
