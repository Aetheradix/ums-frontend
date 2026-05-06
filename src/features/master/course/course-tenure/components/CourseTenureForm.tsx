import { FormActions, FormGrid } from 'shared/new-components';
import { TextBox } from 'shared/components/forms';
import { useCourseTenureForm } from './form.hook';

interface CourseTenureFormProps {
  onSubmit: (data: CourseMaster.CourseTenureForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CourseMaster.CourseTenureForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function CourseTenureForm(props: CourseTenureFormProps) {
  const { register, handleSubmit, reset } = useCourseTenureForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Code"
          placeholder="Enter Department Code"
          {...register('code')}
          maxLength={10}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Department Name"
          {...register('name')}
          maxLength={100}
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
