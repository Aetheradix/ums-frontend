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
import CourseModeOfEducationForm from '../components/CourseModeOfEducationForm';
import {
  useCourseModeOfEducationActiveStatusMutation,
  useCourseModeOfEducationQuery,
  useCourseModeOfEducationsQuery,
  useCreateCourseModeOfEducationMutation,
  useUpdateCourseModeOfEducationMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useCourseModeOfEducationsQuery();
  const { mutateAsync: toggleStatus } =
    useCourseModeOfEducationActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (
    item: CourseMaster.CourseModeOfEducationItem
  ) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Course Department"
      description="Manage the list of all course departments in the system."
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
              onClick={() => setPopup({ mode: 'create' })}
            />
          }
          searchBox
        />
      </FormCard>

      <FormPopup
        visible={popup.mode === 'create'}
        onHide={closePopup}
        title="Create Course Department"
        subtitle="Fill in the details to add a new course department."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Course Department"
        subtitle="Update the details of the course department."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateCourseModeOfEducationMutation();

  async function handleSubmit(data: CourseMaster.CourseModeOfEducationForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Department created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create course department');
    }
  }

  return (
    <CourseModeOfEducationForm onSubmit={handleSubmit} isSaving={isPending} />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateCourseModeOfEducationMutation(id);
  const { data, isLoading } = useCourseModeOfEducationQuery(id);
  const DEFAULT: CourseMaster.CourseModeOfEducationForm = {
    code: '',
    name: '',
    isActive: true,
  };

  async function handleSubmit(
    formData: CourseMaster.CourseModeOfEducationForm
  ) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Department updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update course department');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <CourseModeOfEducationForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
