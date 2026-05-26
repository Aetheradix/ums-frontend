import { useStageApplyingQuery } from 'features/master/other/stage-applying/queries';
import type { FieldValues } from 'react-hook-form';
import { DropDownList } from 'shared/components/forms';
interface SelectStageApplyingProps<
  T extends FieldValues,
> extends Controls.FormProps<T> {
  label?: string;
  disabled?: boolean;
}

export default function SelectStageApplying<T extends FieldValues>({
  defaultOptionText,
  label = 'Stage Applying',
  ...props
}: SelectStageApplyingProps<T> &
  Controls.InputBlockProps & { defaultOptionText?: string }) {
  const { data, isLoading } = useStageApplyingQuery();

  return (
    <DropDownList
      data={data}
      loading={isLoading}
      textField="text"
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
