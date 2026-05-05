import { FormActions, FormGrid } from 'shared/new-components';
import { TextBox } from 'shared/components/forms';
import { useAcademicYearForm } from './form.hook';

interface AcademicYearFormProps {
  onSubmit: (data: Master.AcademicYearForm) => Promise<void>;
  fetchData?: Master.AcademicYearForm;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function AcademicYearForm(props: AcademicYearFormProps) {
  const { register, handleSubmit, reset } = useAcademicYearForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          placeholder="Enter Academic Year Name (e.g. 2024-25)"
          {...register('name')}
          maxLength={100}
          required
        />
        <TextBox
          label="Code"
          placeholder="Enter Academic Year Code"
          {...register('code')}
          maxLength={10}
          required
        />
      </FormGrid>

      <FormActions
        isEditMode={props.isEditMode}
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
      />
    </form>
  );
}
