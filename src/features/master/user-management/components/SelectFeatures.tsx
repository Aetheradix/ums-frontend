import { MultiSelect } from 'primereact/multiselect';
import { Controller, type FieldValues } from 'react-hook-form';
import { InputBlock } from 'shared/components/forms';
import { useFeaturesQuery } from '../role-permissions/queries';

export default function SelectFeatures<T extends FieldValues>({
  label = 'Feature',
  disabled,
  required,
  name,
  control,
}: Controls.FormProps<T> & {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const { data, isLoading } = useFeaturesQuery();

  return (
    <Controller
      control={control}
      name={name!}
      render={({ field, formState }) => (
        <InputBlock
          label={label}
          required={required}
          errorMessage={formState.errors[name!]?.message?.toString()}
        >
          <MultiSelect
            options={data}
            optionLabel="name"
            optionValue="value"
            value={field.value ?? []}
            onChange={e => field.onChange(e.value)}
            disabled={disabled || isLoading}
            placeholder="Select Feature"
            filter
            resetFilterOnHide
            display="chip"
            maxSelectedLabels={1}
            selectedItemsLabel="{0} items selected"
            appendTo="self"
            className="w-full flex items-center min-h-[44px]"
          />
        </InputBlock>
      )}
    />
  );
}
