import { Button, ButtonPanel } from 'shared/components/buttons';
import { Checkbox, PasswordBox, TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useUserForm } from './form.hook';

interface UserFormProps {
  initialValues?: Master.UserManagement.UserItem;
  onSave: (data: Master.UserManagement.UserForm) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({
  initialValues,
  onSave,
  onCancel,
  isLoading,
}: UserFormProps) {
  const { control, handleSubmit, formState } = useUserForm(initialValues, {
    onSuccess: onSave,
  });

  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="vertical">
        <TextBox
          control={control}
          name="userName"
          label="Username"
          errorMessage={errors.userName?.message}
          required
        />
        <TextBox
          control={control}
          name="email"
          label="Email"
          errorMessage={errors.email?.message}
          required
        />
        {!initialValues && (
          <PasswordBox
            control={control}
            name="passwordHash"
            label="Password"
            errorMessage={errors.passwordHash?.message}
            required
          />
        )}
        <TextBox
          control={control}
          name="phoneNumber"
          label="Phone Number"
          errorMessage={errors.phoneNumber?.message}
        />
        <Checkbox
          control={control}
          name="emailConfirmed"
          label="Email Confirmed"
        />
        <Checkbox
          control={control}
          name="phoneNumberConfirmed"
          label="Phone Number Confirmed"
        />
      </InputPanel>

      <ButtonPanel>
        <Button
          type="submit"
          label={initialValues ? 'Update' : 'Create'}
          icon="save"
          isLoading={isLoading}
        />
        <Button
          type="button"
          label="Cancel"
          icon="times"
          className="p-button-secondary"
          onClick={onCancel}
        />
      </ButtonPanel>
    </form>
  );
}
