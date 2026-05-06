import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.College.CollegeCategoryForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
  collegeTypeId: o.number().required(),
}));

export function useCollegeCategoryForm(
  submitCallback: Forms.SubmitFunc<Master.College.CollegeCategoryForm>,
  defaultValues?: Forms.FetchDataFunc<Master.College.CollegeCategoryForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<Master.College.CollegeCategoryForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
