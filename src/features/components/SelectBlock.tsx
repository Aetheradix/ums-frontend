import { useBlocksQuery } from 'features/master/location/block/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';

interface SelectBlockProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectBlock<T extends FieldValues>({
  defaultOptionText,
  label = 'Block',
  ...props
}: SelectBlockProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useBlocksQuery();
  const activeData =
    data?.filter((item: Master.BlockItem) => item.isActive === true) || [];

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
