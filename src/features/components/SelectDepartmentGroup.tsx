import { useDepartmentGroupsQuery } from 'features/master/employee/settings/department-group/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';

interface SelectDepartmentGroupProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectDepartmentGroup<T extends FieldValues>({
  defaultOptionText,
  label = 'Department Group',
  ...props
}: SelectDepartmentGroupProps<T> &
  Controls.InputBlockProps & {
    defaultOptionText?: string;
  }) {
  const { data, isLoading } = useDepartmentGroupsQuery();

  return (
    <DropDownList
      data={data?.filter(group => group.isActive) || []}
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
