import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CourseMaster.SubjectCategoryCourseForm>(o => ({
  categoryName: o
    .string()
    .required()
    .pattern(expressions.englishOnly)
    .messages({
      [keys.string.pattern]: errors.englishOnly,
    }),
  categoryNameHindi: o
    .string()
    .required()
    .pattern(expressions.hindiOnly)
    .messages({
      [keys.string.pattern]: errors.hindiOnly,
    }),
  categoryCode: o
    .string()
    .required()
    .pattern(expressions.alphaNumericOnly)
    .messages({
      [keys.string.pattern]: errors.alphaNumericOnly,
    }),
}));

export function useSubjectCategoryForm(
  submitCallback: Forms.SubmitFunc<CourseMaster.SubjectCategoryCourseForm>,
  defaultValues?: Forms.FetchDataFunc<CourseMaster.SubjectCategoryCourseForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<CourseMaster.SubjectCategoryCourseForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
