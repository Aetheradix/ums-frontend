import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CourseMaster.CourseTenureForm>(o => ({
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
}));

export function useCourseTenureForm(
  submitCallback: Forms.SubmitFunc<CourseMaster.CourseTenureForm>,
  defaultValues?: Forms.FetchDataFunc<CourseMaster.CourseTenureForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<CourseMaster.CourseTenureForm>({
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
