import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useCourseStreamsQuery } from '../master/course/course-stream/queries';

interface SelectCourseStreamProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectCourseStream<T extends FieldValues>({
  defaultOptionText,
  label = 'Stream',
  ...props
}: SelectCourseStreamProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useCourseStreamsQuery();
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
