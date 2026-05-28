import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useGrievanceCategoriesQuery } from '../grievance-category/queries';

interface SelectCategoryProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectCategory<T extends FieldValues>({
  defaultOptionText,
  label = 'Category',
  ...props
}: SelectCategoryProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useGrievanceCategoriesQuery();

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
