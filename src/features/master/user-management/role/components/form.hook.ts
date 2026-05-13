import { useMemo } from 'react';
import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.UserManagement.RoleForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.alphaNumericOnlyWithSpace)
    .messages({
      [keys.string.pattern]: errors.alphaNumericOnlyWithSpace,
    }),
}));

export function useRoleForm(
  submitCallback: Forms.SubmitFunc<Master.UserManagement.RoleForm>,
  defaultValues?: Forms.FetchDataFunc<Master.UserManagement.RoleForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.UserManagement.RoleForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return useMemo(
    () => ({
      register,
      control,
      handleSubmit: handleSubmit(submitCallback),
      reset,
    }),
    [register, control, handleSubmit, submitCallback, reset]
  );
}
