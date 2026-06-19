import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CollegeMaster.NocTypeForm>(o => ({
  nocTypeName: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
}));

export function useNocTypeForm(
  submitCallback: Forms.SubmitFunc<CollegeMaster.NocTypeForm>,
  defaultValues?: Forms.FetchDataFunc<CollegeMaster.NocTypeForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<CollegeMaster.NocTypeForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
