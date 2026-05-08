import { useCallback, useState } from 'react';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import AcademicYearForm from '../components/AcademicYearForm';
import {
  useAcademicYearsQuery,
  useAcademicYearStatusMutation,
  useCreateAcademicYearMutation,
  useGetAcademicYearByIdQuery,
  useUpdateAcademicYearMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useAcademicYearsQuery();
  const { mutateAsync: toggleStatus } = useAcademicYearStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: Master.Other.AcademicYearItem) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Academic Year"
      description="Manage the list of all academic years in the system."
    >
      <FormCard>
        <GridPanel
          data={data as Master.Other.AcademicYearItem[]}
          loading={isLoading}
          onEdit={academicYear =>
            setPopup({ mode: 'edit', id: academicYear.id })
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'session', header: 'Session' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.Other.AcademicYearItem) => (
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
        title="Create Academic Year"
        subtitle="Fill in the details to add a new academic year."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Academic Year"
        subtitle="Update the details of the academic year."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateAcademicYearMutation();

  async function handleSubmit(data: Master.Other.AcademicYearForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Academic year created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create academic year.');
    }
  }

  return <AcademicYearForm onSubmit={handleSubmit} isSaving={isPending} />;
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateAcademicYearMutation(id);

  const { data, isLoading } = useGetAcademicYearByIdQuery(id);

  const DEFAULT: Master.Other.AcademicYearForm = {
    name: '',
    session: '',
    isActive: true,
  };

  async function handleSubmit(formData: Master.Other.AcademicYearForm) {
    try {
      const result = await mutateAsync(formData);

      if (result) {
        ToastService.success('Academic year updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update academic year.');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <AcademicYearForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
