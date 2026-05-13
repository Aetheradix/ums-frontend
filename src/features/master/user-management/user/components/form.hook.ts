import { useForm } from 'react-hook-form';

export function useUserForm(
  initialValues?: Master.UserManagement.UserItem,
  options?: {
    onSuccess?: (data: Master.UserManagement.UserForm) => void;
  }
) {
  const formHelpers = useForm<Master.UserManagement.UserForm>({
    defaultValues: initialValues || {
      userName: '',
      email: '',
      emailConfirmed: true,
      passwordHash: '',
      phoneNumber: '',
      phoneNumberConfirmed: true,
    },
  });

  const { handleSubmit } = formHelpers;

  const onSubmit = (data: Master.UserManagement.UserForm) => {
    options?.onSuccess?.(data);
  };

  return {
    ...formHelpers,
    handleSubmit: handleSubmit(onSubmit),
  };
}
