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
import ProgrammeModeOfEducationForm from '../components/ProgrammeModeOfEducationForm';
import {
  useProgrammeModeOfEducationActiveStatusMutation,
  useProgrammeModeOfEducationQuery,
  useProgrammeModeOfEducationsQuery,
  useCreateProgrammeModeOfEducationMutation,
  useUpdateProgrammeModeOfEducationMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useProgrammeModeOfEducationsQuery();
  const { mutateAsync: toggleStatus } =
    useProgrammeModeOfEducationActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (
    item: CourseMaster.ProgrammeModeOfEducationItem
  ) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Programme Mode of Education"
      description="Manage the list of all Programme Mode of Educations in the system."
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
              cell: (item: CourseMaster.ProgrammeModeOfEducationItem) => (
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
        title="Create Programme Mode of Education"
        subtitle="Fill in the details to add a new Programme Mode of Education."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Programme Mode of Education"
        subtitle="Update the details of the Programme Mode of Education."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } =
    useCreateProgrammeModeOfEducationMutation();

  async function handleSubmit(data: CourseMaster.ProgrammeModeOfEducationForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success(
          'Programme Mode of Education created successfully.'
        );
        onClose();
      }
    } catch {
      ToastService.error('Failed to create Programme Mode of Education');
    }
  }

  return (
    <ProgrammeModeOfEducationForm
      onSubmit={handleSubmit}
      isSaving={isPending}
    />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } =
    useUpdateProgrammeModeOfEducationMutation(id);
  const { data, isLoading } = useProgrammeModeOfEducationQuery(id);
  const DEFAULT: CourseMaster.ProgrammeModeOfEducationForm = {
    code: '',
    name: '',
    isActive: true,
  };

  async function handleSubmit(
    formData: CourseMaster.ProgrammeModeOfEducationForm
  ) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success(
          'Programme Mode of Education updated successfully.'
        );
        onClose();
      }
    } catch {
      ToastService.error('Failed to update Programme Mode of Education');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <ProgrammeModeOfEducationForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
