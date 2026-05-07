import { TextBox } from '../../../../../shared/components/forms';
import { FormActions, FormGrid } from '../../../../../shared/new-components';
import { useUserForm } from './form.hook';

interface UserFormProps {
  onSubmit: (data: Master.UserManagement.UserForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.UserManagement.UserForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function UserForm(props: UserFormProps) {
  const { register, handleSubmit, reset } = useUserForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter User Name"
          {...register('UserName')}
          maxLength={50}
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
