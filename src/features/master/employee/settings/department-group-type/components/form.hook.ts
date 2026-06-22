import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<Master.Employee.DepartmentGroupTypeForm>(
  o => ({
    name: o.string().required().max(50).label('Name'),
    code: o.string().required().max(10).label('Code'),
    isActive: o.boolean().label('Is Active'),
  })
);

export function useDepartmentGroupTypeForm(
  submitCallback: Forms.SubmitFunc<Master.Employee.DepartmentGroupTypeForm>,
  defaultValues?: Forms.FetchDataFunc<Master.Employee.DepartmentGroupTypeForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.Employee.DepartmentGroupTypeForm>({
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
