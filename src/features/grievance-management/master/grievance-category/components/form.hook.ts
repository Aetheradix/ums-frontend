import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<GrievanceCategoryMaster.GrievanceCategoryForm>(
  o => ({
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
    categoryType: o.string().required(),
  })
);

export function useGrievanceCategoryForm(
  submitCallback: Forms.SubmitFunc<GrievanceCategoryMaster.GrievanceCategoryForm>,
  defaultValues?: Forms.FetchDataFunc<GrievanceCategoryMaster.GrievanceCategoryForm>
) {
  const { register, handleSubmit, reset } =
    useAppForm<GrievanceCategoryMaster.GrievanceCategoryForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
