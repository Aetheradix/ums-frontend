import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useDepartmentsByGroupQuery } from '../master/faculty/department/queries';

interface SelectDepartmentByGroupProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
  departmentGroupId?: number;
}

export default function SelectDepartmentByGroup<T extends FieldValues>({
  defaultOptionText,
  label = 'Department',
  departmentGroupId,
  ...props
}: SelectDepartmentByGroupProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useDepartmentsByGroupQuery(departmentGroupId);

  const activeData = data.filter(item => item.isActive);

  return (
    <DropDownList
      data={activeData}
      loading={isLoading}
      textField="name"
      valueField="id"
      optionValue="id"
      label={label}
      required={true}
      defaultOptionText={defaultOptionText}
      placeholder={
        defaultOptionText === null || defaultOptionText === undefined
          ? `Select ${label}`
          : defaultOptionText
      }
      {...props}
    />
  );
}
