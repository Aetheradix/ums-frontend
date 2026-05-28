import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<Grievance.CategoryToUserMappingForm>(o => ({
  categoryId: o.number().required().label('Category'),
  userId: o.string().required().label('User'),
}));

export function useCategoryToUserMappingForm(
  submitCallback: Forms.SubmitFunc<Grievance.CategoryToUserMappingForm>,
  defaultValues?: Forms.FetchDataFunc<Grievance.CategoryToUserMappingForm>
) {
  const form = useAppForm<Grievance.CategoryToUserMappingForm>({
    defaultValues: defaultValues,
    resolver: validation.resolver(schema),
  });

  // useFormServerError(form);

  const { register, handleSubmit, reset, setValue, watch } = form;

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    watch,
    setValue,
  };
}
