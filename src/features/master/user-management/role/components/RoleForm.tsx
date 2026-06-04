import { TextBox, Checkbox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useRoleForm } from './form.hook';

interface RoleFormProps {
  onSubmit: (data: UserManagement.UserRoleForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.UserRoleForm>;
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
          label="Role Name"
          placeholder="Enter Role Name"
          {...register('name')}
          required
        />
        <TextBox
          label="Description"
          placeholder="Enter Description"
          {...register('description')}
          required
        />
        <Checkbox label="Is Active" {...register('isActive')} />
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
