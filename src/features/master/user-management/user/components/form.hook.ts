import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<UserManagement.UserForm>(o => ({
  userName: o
    .string()
    .required()
    .max(20)
    .pattern(/^[a-zA-Z0-9._-]+$/)
    .messages({
      'string.pattern.base':
        'Only letters, numbers, dots, underscores, and hyphens are allowed',
    })
    .label('User Name'),
  firstName: o
    .string()
    .required()
    .max(30)
    .pattern(/^[a-zA-Z\s'.\-]+$/)
    .messages({
      'string.pattern.base':
        'Only letters, spaces, hyphens, apostrophes, and dots are allowed',
    })
    .label('First Name'),
  lastName: o
    .string()
    .required()
    .max(30)
    .pattern(/^[a-zA-Z\s'.\-]+$/)
    .messages({
      'string.pattern.base':
        'Only letters, spaces, hyphens, apostrophes, and dots are allowed',
    })
    .label('Last Name'),
  email: o
    .string()
    .required()
    .email({ tlds: { allow: false } })
    .label('Email'),
  isActive: o.boolean().optional(),
}));

export function useUserForm(
  submitCallback: Forms.SubmitFunc<UserManagement.UserForm>,
  defaultValues?: Forms.FetchDataFunc<UserManagement.UserForm>
) {
  const { register, control, handleSubmit, reset, setValue } =
    useAppForm<UserManagement.UserForm>({
      defaultValues: defaultValues ?? {
        isActive: true,
      },
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    setValue,
  };
}
