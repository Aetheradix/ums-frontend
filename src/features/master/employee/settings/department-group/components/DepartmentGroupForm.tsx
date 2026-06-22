import { SelectDepartmentGroupType } from 'features/components';
import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useDepartmentGroupForm } from './form.hook';

interface DepartmentGroupFormProps {
  onSubmit: (data: Master.Employee.DepartmentGroupForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Employee.DepartmentGroupForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DepartmentGroupForm(props: DepartmentGroupFormProps) {
  const { register, handleSubmit, reset } = useDepartmentGroupForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <SelectDepartmentGroupType {...register('departmentGroupTypeId')} />

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
