import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useDesignationsByEmployeeTypeQuery } from '../master/hr/designation/queries';

interface SelectDesignationByEmployeeTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
  employeeType?: string;
}

export default function SelectDesignationByEmployeeType<T extends FieldValues>({
  defaultOptionText,
  label = 'Designation',
  employeeType,
  ...props
}: SelectDesignationByEmployeeTypeProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useDesignationsByEmployeeTypeQuery(employeeType);

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
