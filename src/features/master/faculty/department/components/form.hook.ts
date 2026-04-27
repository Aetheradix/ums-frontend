import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<DepartmentMaster.DepartmentForm>(o => ({
  name: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
  code: o
    .string()
    .required()
    .pattern(expressions.alphaNumericOnly)
    .messages({
      [keys.string.pattern]: errors.alphaNumericOnly,
    }),
  officeTypeId: o.number().required(),
  hodName: o.string().required(),
  contactNumber: o.number().required(),
}));

export function useDepartmentForm(
  submitCallback: Forms.SubmitFunc<DepartmentMaster.DepartmentForm>,
  defaultValues?: Forms.FetchDataFunc<DepartmentMaster.DepartmentForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<DepartmentMaster.DepartmentForm>({
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
