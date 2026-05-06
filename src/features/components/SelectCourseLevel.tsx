import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useCourseLevelsQuery } from '../master/course/course-level/queries';

interface SelectCourseLevelProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectCourseLevel<T extends FieldValues>({
  defaultOptionText,
  label = 'Level',
  ...props
}: SelectCourseLevelProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useCourseLevelsQuery();
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
