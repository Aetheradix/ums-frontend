import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useCourseLevelActiveStatusMutation,
  useCourseLevelsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCourseLevelsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCourseLevelActiveStatusMutation();

  const handleToggleStatus = async (item: CourseMaster.CourseLevelItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Course Levels"
      description="Manage the list of all course level in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={level => navigate(masterUrls.courseLevel.edit(level.id))}
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
              cell: (item: CourseMaster.CourseLevelItem) => (
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
              onClick={() => navigate(masterUrls.courseLevel.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
