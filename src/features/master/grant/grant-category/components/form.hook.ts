import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<GrantMaster.GrantCategoryForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
  grantTypeId: o.number().required(),
}));

export function useGrantCategoryForm(
  submitCallback: Forms.SubmitFunc<GrantMaster.GrantCategoryForm>,
  defaultValues?: Forms.FetchDataFunc<GrantMaster.GrantCategoryForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<GrantMaster.GrantCategoryForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
