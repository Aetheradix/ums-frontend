import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<Master.DepartmentForm>(o => ({
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
  contactNumber: o
    .string()
    .required()
    .max(15)
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      [keys.string.pattern]: 'Contact number must be 10 to 15 digits',
    }),
  departmentGroupId: o.number().required(),
}));

export function useDepartmentForm(
  submitCallback: Forms.SubmitFunc<Master.DepartmentForm>,
  defaultValues?: Forms.FetchDataFunc<Master.DepartmentForm>
) {
  const { register, control, handleSubmit, reset, setValue } =
    useAppForm<Master.DepartmentForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    setValue,
  };
}
