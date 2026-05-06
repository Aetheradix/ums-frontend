import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CourseMaster.CourseModeOfEducationForm>(o => ({
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

export function useCourseModeOfEducationForm(
  submitCallback: Forms.SubmitFunc<CourseMaster.CourseModeOfEducationForm>,
  defaultValues?: Forms.FetchDataFunc<CourseMaster.CourseModeOfEducationForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<CourseMaster.CourseModeOfEducationForm>({
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
