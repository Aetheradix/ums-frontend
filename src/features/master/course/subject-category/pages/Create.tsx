import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import SubjectCategoryCourseForm from '../components/SubjectCategoryForm';
import { useCreateSubjectCategoryMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateSubjectCategoryMutation();

  async function handleSubmit(data: CourseMaster.SubjectCategoryCourseForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Subject Category created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create subject category');
    }
  }
  return (
    <SubjectCategoryCourseForm onSubmit={handleSubmit} isSaving={isPending} />
  );
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Subject Category" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
