import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useSubjectCategoriesQuery } from '../master/subject/subject-category/queries';

interface SelectSubjectCategoryProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectSubjectCategory<T extends FieldValues>({
  label = 'Subject Category',
  ...props
}: SelectSubjectCategoryProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useSubjectCategoriesQuery();
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
      placeholder={`Select ${label}`}
      {...props}
    />
  );
}
