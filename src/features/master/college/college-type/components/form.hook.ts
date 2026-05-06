import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.College.CollegeTypeForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
}));

export function useCollegeTypeForm(
  submitCallback: Forms.SubmitFunc<Master.College.CollegeTypeForm>,
  defaultValues?: Forms.FetchDataFunc<Master.College.CollegeTypeForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<Master.College.CollegeTypeForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
