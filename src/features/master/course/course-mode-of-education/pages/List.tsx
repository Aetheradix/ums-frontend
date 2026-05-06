import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useCourseModeOfEducationActiveStatusMutation,
  useCourseModeOfEducationsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCourseModeOfEducationsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCourseModeOfEducationActiveStatusMutation();

  const handleToggleStatus = async (
    item: CourseMaster.CourseModeOfEducationItem
  ) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Course Department"
      description="Manage the list of all course departments in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={department =>
            navigate(masterUrls.courseModeOfEducation.edit(department.id))
          }
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
              cell: (item: CourseMaster.CourseModeOfEducationItem) => (
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
              onClick={() => navigate(masterUrls.courseModeOfEducation.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
