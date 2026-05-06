import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useCourseMastersQuery } from '../master/course/course-master/queries';

interface SelectCourseProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectCourse<T extends FieldValues>({
  defaultOptionText,
  label = 'Course',
  ...props
}: SelectCourseProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useCourseMastersQuery();
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
