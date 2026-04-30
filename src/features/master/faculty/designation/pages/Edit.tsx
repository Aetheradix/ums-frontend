import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import DesignationForm from '../components/DesignationForm';
import { useDesignationQuery, useUpdateDesignationMutation } from '../queries';

const DEFAULT = {
  name: '',
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateDesignationMutation(id);
  const { data = DEFAULT, isLoading } = useDesignationQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DesignationForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Designation updated successfully.');
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
    <Modal header="Edit Designation" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
