import SelectPreviousInstituteType from 'features/components/SelectPreviousInstitutionType';
import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useRoleForm } from './form.hook';

interface RoleFormProps {
  onSubmit: (data: Master.UserManagement.RoleForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.UserManagement.RoleForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function RoleForm(props: RoleFormProps) {
  const { register, handleSubmit, reset } = useRoleForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Role Name"
          {...register('name')}
          maxLength={50}
          required
        />
        <SelectPreviousInstituteType />
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
