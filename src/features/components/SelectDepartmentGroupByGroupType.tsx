import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useDepartmentGroupsByGroupTypeQuery } from '../master/employee/settings/department-group/queries';

interface SelectDepartmentGroupByGroupTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
  departmentGroupTypeId?: number;
}

export default function SelectDepartmentGroupByGroupType<
  T extends FieldValues,
>({
  defaultOptionText,
  label = 'Department Group',
  departmentGroupTypeId,
  ...props
}: SelectDepartmentGroupByGroupTypeProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useDepartmentGroupsByGroupTypeQuery(
    departmentGroupTypeId
  );

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
