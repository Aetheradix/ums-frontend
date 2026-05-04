import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useCourseLevelForm } from './form.hook';

interface CourseDepartmentFormProps {
  onSubmit: (data: CourseMaster.CourseDepartmentForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CourseMaster.CourseDepartmentForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function CourseLevelForm(props: CourseDepartmentFormProps) {
  const { register, handleSubmit, reset } = useCourseLevelForm(
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
