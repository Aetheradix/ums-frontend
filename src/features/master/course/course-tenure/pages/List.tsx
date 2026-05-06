import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useCourseTenureActiveStatusMutation,
  useCourseTenuresQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCourseTenuresQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCourseTenureActiveStatusMutation();

  const handleToggleStatus = async (item: CourseMaster.CourseTenureItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Course Tenure"
      description="Manage the list of all course Tenure in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={tenure => navigate(masterUrls.courseTenure.edit(tenure.id))}
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
              cell: (item: CourseMaster.CourseTenureItem) => (
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
              onClick={() => navigate(masterUrls.courseTenure.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
