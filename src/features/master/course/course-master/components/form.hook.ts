import { errors } from 'config/errors';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

const schema = validation.create<CourseMaster.CourseMasterForm>(o => ({
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
  levelId: o.number().required(),
  departmentId: o.number().required(),
  streamId: o.number().required(),
  modeId: o.number().required(),
  tenureId: o.number().required(),
  examTypeId: o.number().required(),
  totalTerms: o.number().required(),
  description: o.string(),
}));

export function useCourseMasterForm(
  submitCallback: Forms.SubmitFunc<CourseMaster.CourseMasterForm>,
  defaultValues?: Forms.FetchDataFunc<CourseMaster.CourseMasterForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<CourseMaster.CourseMasterForm>({
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
