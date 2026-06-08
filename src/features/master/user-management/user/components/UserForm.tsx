import { TextBox, Checkbox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useUserForm } from './form.hook';

interface UserFormProps {
  onSubmit: (data: UserManagement.UserForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.UserForm>;
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
          label="User Name"
          placeholder="Enter User Name"
          {...register('userName')}
          required
        />
        <TextBox
          label="First Name"
          placeholder="Enter First Name"
          {...register('firstName')}
          required
        />
        <TextBox
          label="Last Name"
          placeholder="Enter Last Name"
          {...register('lastName')}
          required
        />
        <TextBox
          label="Email"
          placeholder="Enter Email"
          {...register('email')}
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
