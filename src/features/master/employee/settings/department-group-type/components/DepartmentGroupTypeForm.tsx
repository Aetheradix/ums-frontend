import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useDepartmentGroupTypeForm } from './form.hook';

interface DepartmentGroupTypeFormProps {
  onSubmit: (data: Master.Employee.DepartmentGroupTypeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Employee.DepartmentGroupTypeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DepartmentGroupTypeForm(
  props: DepartmentGroupTypeFormProps
) {
  const { register, handleSubmit, reset } = useDepartmentGroupTypeForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          placeholder="Enter name"
          {...register('name')}
          maxLength={50}
          required
        />

        <TextBox
          label="Code"
          placeholder="Enter code"
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
