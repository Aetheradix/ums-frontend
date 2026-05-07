import { useCallback, useState } from 'react';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import { ToastService } from 'services';
import CourseExamTypeForm from '../components/CourseExamTypeForm';
import {
  useCourseExamTypeItemActiveStatusMutation,
  useCourseExamTypeQuery,
  useCourseExamTypesQuery,
  useCreateCourseExamTypeMutation,
  useUpdateCourseExamTypeMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useCourseExamTypesQuery();
  const { mutateAsync: toggleStatus } =
    useCourseExamTypeItemActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: CourseMaster.CourseExamTypeItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Course Exam Type"
      description="Manage the list of all course Exam Type in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={examtype => setPopup({ mode: 'edit', id: examtype.id })}
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
              onClick={() => setPopup({ mode: 'create' })}
            />
          }
          searchBox
        />
      </FormCard>

      <FormPopup
        visible={popup.mode === 'create'}
        onHide={closePopup}
        title="Create Course Level"
        subtitle="Fill in the details to add a new course level."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Course Exam Type"
        subtitle="Update the details of the course Exam Type."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateCourseExamTypeMutation();

  async function handleSubmit(data: CourseMaster.CourseExamTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Level created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create course level');
    }
  }

  return <CourseExamTypeForm onSubmit={handleSubmit} isSaving={isPending} />;
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateCourseExamTypeMutation(id);
  const { data, isLoading } = useCourseExamTypeQuery(id);
  const DEFAULT: CourseMaster.CourseExamTypeForm = {
    code: '',
    name: '',
    isActive: true,
  };

  async function handleSubmit(formData: CourseMaster.CourseExamTypeForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Exam Type updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update course Exam Type');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <CourseExamTypeForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
