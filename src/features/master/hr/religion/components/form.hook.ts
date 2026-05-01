import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.ReligionForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
}));

export function useReligionForm(
  submitCallback: Forms.SubmitFunc<Master.ReligionForm>,
  defaultValues?: Master.ReligionForm
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.ReligionForm>({
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
