import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useOfficeTypesQuery } from '../master/faculty/office-type/queries';

interface SelectOfficeTypeProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectOfficeType<T extends FieldValues>({
  defaultOptionText,
  label = 'Office Type',
  ...props
}: SelectOfficeTypeProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useOfficeTypesQuery();
  const activeData =
    data?.filter(
      (officeType: OfficeTypeMaster.OfficeTypeItem) =>
        officeType.isActive === true
    ) || [];

  return (
    <DropDownList
      data={activeData}
      loading={isLoading}
      textField="name"
      valueField="officeTypeId"
      optionValue="officeTypeId"
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
