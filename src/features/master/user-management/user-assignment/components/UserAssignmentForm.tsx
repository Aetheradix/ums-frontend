import { FormActions, FormGrid } from 'shared/new-components';
import { useUserAssignmentForm } from './form.hook';
import SelectUsers from '../../components/SelectUsers';
import SelectRoles from '../../components/SelectRoles';
import SelectDomain from '../../components/SelectDomain';

interface UserAssignmentFormProps {
  onSubmit: (data: UserManagement.UserAssignmentForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.UserAssignmentForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function UserAssignmentForm(props: UserAssignmentFormProps) {
  const { register, handleSubmit, reset } = useUserAssignmentForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <SelectUsers
          required
          disabled={props.isEditMode}
          {...register('userId')}
        />
        <SelectRoles required {...register('roleName')} />
        <SelectDomain required {...register('domain')} />
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
