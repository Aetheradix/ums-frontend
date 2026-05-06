import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CourseMaster.CourseExamTypeForm>(o => ({
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
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.alphaNumericOnly,
    }),
}));

export function useCourseExamTypeForm(
  submitCallback: Forms.SubmitFunc<CourseMaster.CourseExamTypeForm>,
  defaultValues?: Forms.FetchDataFunc<CourseMaster.CourseExamTypeForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<CourseMaster.CourseExamTypeForm>({
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
