import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.Employee.ActionOptionForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    })
    .min(2)
    .max(100)
    .label('Action Option Name'),

  description: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    })
    .max(200)
    .label('Description'),
}));

export function useActionOptionForm(
  submitCallback: Forms.SubmitFunc<Master.Employee.ActionOptionForm>,
  defaultValues?: Forms.FetchDataFunc<Master.Employee.ActionOptionForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.Employee.ActionOptionForm>({
      defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
