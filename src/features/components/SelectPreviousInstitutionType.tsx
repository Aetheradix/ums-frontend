import { usePreviousInstituteTypeQuery } from 'features/master/other/previous-institute-type/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';

interface SelectPreviousInstituteTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectPreviousInstituteType<T extends FieldValues>({
  defaultOptionText,
  label = 'Previous Institute Type',
  ...props
}: SelectPreviousInstituteTypeProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = usePreviousInstituteTypeQuery();

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
