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
import CourseStreamForm from '../components/CourseStreamForm';
import {
  useCourseStreamActiveStatusMutation,
  useCourseStreamQuery,
  useCourseStreamsQuery,
  useCreateCourseStreamMutation,
  useUpdateCourseStreamMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useCourseStreamsQuery();
  const { mutateAsync: toggleStatus } = useCourseStreamActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: CourseMaster.CourseStreamItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Course Stream"
      description="Manage the list of all course streams in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={department => setPopup({ mode: 'edit', id: department.id })}
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
              cell: (item: CourseMaster.CourseStreamItem) => (
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
        title="Create Course Stream"
        subtitle="Fill in the details to add a new course stream."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Course Stream"
        subtitle="Update the details of the course stream."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateCourseStreamMutation();

  async function handleSubmit(data: CourseMaster.CourseStreamForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Stream created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create course stream');
    }
  }

  return <CourseStreamForm onSubmit={handleSubmit} isSaving={isPending} />;
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateCourseStreamMutation(id);
  const { data, isLoading } = useCourseStreamQuery(id);
  const DEFAULT: CourseMaster.CourseStreamForm = {
    code: '',
    name: '',
    isActive: true,
  };

  async function handleSubmit(formData: CourseMaster.CourseStreamForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Stream updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update course stream');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <CourseStreamForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
