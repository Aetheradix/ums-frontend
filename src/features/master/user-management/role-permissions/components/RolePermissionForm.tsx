import { FormActions, FormGrid } from 'shared/new-components';
import SelectDomain from '../../components/SelectDomain';
import SelectFeatures from '../../components/SelectFeatures';
import SelectRights from '../../components/SelectRights';
import SelectRoles from '../../components/SelectRoles';
import { useRolePermissionForm } from './form.hook';

interface RolePermissionFormProps {
  onSubmit: (data: UserManagement.RolePermissionCreate) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.RolePermissionCreate>;
  isSaving?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

export default function RolePermissionForm(props: RolePermissionFormProps) {
  const { register, handleSubmit, reset } = useRolePermissionForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={props.columns ?? 4}>
        <SelectRoles required {...register('roleName')} />
        <SelectDomain required {...register('domain')} />
        <SelectFeatures required {...register('feature')} />
        <SelectRights required {...register('action')} />
      </FormGrid>

      <FormActions
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
      />
    </form>
  );
}
