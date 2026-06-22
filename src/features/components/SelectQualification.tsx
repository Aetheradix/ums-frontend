import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
import { useQualificationsQuery } from '../master/hr/qualification/queries';

interface SelectQualificationProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectQualification<T extends FieldValues>({
  defaultOptionText,
  label = 'Qualification Name',
  ...props
}: SelectQualificationProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useQualificationsQuery();
  const activeData = (data as Master.HR.QualificationItem[]).filter(
    item => item.isActive
  );

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
