import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useCourseExamTypeItemActiveStatusMutation,
  useCourseExamTypesQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCourseExamTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCourseExamTypeItemActiveStatusMutation();

  const handleToggleStatus = async (item: CourseMaster.CourseExamTypeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Course Exam Type"
      description="Manage the list of all course Exam Type in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={examtype =>
            navigate(masterUrls.courseExamType.edit(examtype.id))
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
              cell: (item: CourseMaster.CourseExamTypeItem) => (
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
              onClick={() => navigate(masterUrls.courseExamType.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
