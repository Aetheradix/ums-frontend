import { useNocTypesQuery } from 'features/master/college/noc-type/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';

interface SelectNocTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
  appendTo?: 'self' | HTMLElement | (() => HTMLElement) | undefined | null;
}

export default function SelectNocType<T extends FieldValues>({
  defaultOptionText,
  label = 'NOC Type',
  ...props
}: SelectNocTypeProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useNocTypesQuery();
  const activeData =
    data?.filter((item: CollegeMaster.NocTypeItem) => item.isActive) || [];

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
