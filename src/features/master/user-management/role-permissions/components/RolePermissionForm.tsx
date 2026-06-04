import { FormActions, FormGrid } from 'shared/new-components';
import { useRolePermissionForm } from './form.hook';
import SelectRoles from '../../components/SelectRoles';
import SelectDomain from '../../components/SelectDomain';
import SelectFeatures from '../../components/SelectFeatures';
import SelectRights from '../../components/SelectRights';

interface RolePermissionFormProps {
  onSubmit: (data: UserManagement.RolePermissionCreate) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.RolePermissionCreate>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function RolePermissionForm(props: RolePermissionFormProps) {
  const { register, handleSubmit, reset } = useRolePermissionForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <SelectRoles
          required
          disabled={props.isEditMode}
          {...register('roleName')}
        />
        <SelectDomain
          required
          disabled={props.isEditMode}
          {...register('domain')}
        />
        <SelectFeatures
          required
          disabled={props.isEditMode}
          {...register('feature')}
        />
        <SelectRights required {...register('action')} />
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
