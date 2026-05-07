import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.UserManagement.UserForm>(o => ({
  UserName: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
  code: o
    .string()
    .required()
    .pattern(expressions.alphaNumericOnlyWithSpace)
    .messages({
      [keys.string.pattern]: errors.alphaNumericOnly,
    }),
}));

export function useUserForm(
  submitCallback: Forms.SubmitFunc<Master.UserManagement.UserForm>,
  defaultValues?: Forms.FetchDataFunc<Master.UserManagement.UserForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.UserManagement.UserForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
