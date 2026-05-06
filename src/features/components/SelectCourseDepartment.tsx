import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useCourseDepartmentsQuery } from '../master/course/course-department/queries';

interface SelectCourseDepartmentProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectCourseDepartment<T extends FieldValues>({
  defaultOptionText,
  label = 'Department',
  ...props
}: SelectCourseDepartmentProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useCourseDepartmentsQuery();
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
