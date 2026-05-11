import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<GrantMaster.GrantTypeForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
}));

export function useGrantTypeForm(
  submitCallback: Forms.SubmitFunc<GrantMaster.GrantTypeForm>,
  defaultValues?: Forms.FetchDataFunc<GrantMaster.GrantTypeForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<GrantMaster.GrantTypeForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
