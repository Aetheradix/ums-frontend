import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<Master.Employee.DepartmentGroupForm>(o => ({
  departmentGroupTypeId: o.number().required(),
  name: o.string().required().max(50).label('Name'),
  code: o.string().required().max(10).label('Code'),
  isActive: o.boolean(),
}));

export function useDepartmentGroupForm(
  submitCallback: Forms.SubmitFunc<Master.Employee.DepartmentGroupForm>,
  defaultValues?: Forms.FetchDataFunc<Master.Employee.DepartmentGroupForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.Employee.DepartmentGroupForm>({
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
