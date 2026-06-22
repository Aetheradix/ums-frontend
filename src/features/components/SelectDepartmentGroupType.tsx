import { useDepartmentGroupTypesQuery } from 'features/master/employee/settings/department-group-type/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';

interface SelectDepartmentGroupTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;

  disabled?: boolean;
}

export default function SelectDepartmentGroupType<T extends FieldValues>({
  defaultOptionText,
  label = 'Department Group Type',
  ...props
}: SelectDepartmentGroupTypeProps<T> &
  Controls.InputBlockProps & {
    defaultOptionText?: string;
  }) {
  const { data, isLoading } = useDepartmentGroupTypesQuery();

  return (
    <DropDownList
      data={data}
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
