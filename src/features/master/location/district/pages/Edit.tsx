import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import DistrictForm from '../components/DistrictForm';
import { useDistrictQuery, useUpdateDistrictMutation } from '../queries';

const DEFAULT: Master.DistrictForm = {
  code: '',
  name: '',
  divisionId: 0,
  isActive: true,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateDistrictMutation(id);
  const { data = DEFAULT, isLoading } = useDistrictQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DistrictForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('District updated successfully.');
          props.onSave();
        }
      }}
    />
  );
}

export default function Edit() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Edit District" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
