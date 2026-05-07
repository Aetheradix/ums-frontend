import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.Sis.DegreeLevelForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
}));

export function useDegreeLevelForm(
  submitCallback: Forms.SubmitFunc<Master.Sis.DegreeLevelForm>,
  defaultValues?: Forms.FetchDataFunc<Master.Sis.DegreeLevelForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.Sis.DegreeLevelForm>({
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
