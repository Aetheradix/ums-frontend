import { InputSwitch } from 'primereact/inputswitch';
import { Controller, type FieldValues } from 'react-hook-form';
import InputBlock from './InputBlock';

interface SwitchProps<TForm extends FieldValues>
  extends
    Controls.FormProps<TForm>,
    Controls.InputBlockProps,
    Controls.InputProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  required?: boolean;
  subLabel?: string;
}

function InnerSwitch({
  id,
  name,
  label,
  errorMessage,
  checked,
  onChange,
  required,
  subLabel,
  ...rest
}: SwitchProps<FieldValues>) {
  const inputId = id ?? name;
  return (
    <InputBlock
      id={inputId}
      label={label}
      errorMessage={errorMessage}
      required={required}
      subLabel={subLabel}
    >
      <InputSwitch
        inputId={inputId}
        checked={checked ?? false}
        onChange={e => onChange?.(e.value ?? false)}
        {...rest}
      />
    </InputBlock>
  );
}

export default function Switch<TForm extends FieldValues>({
  name,
  control,
  checked,
  onChange,
  ...rest
}: SwitchProps<TForm>) {
  if (!control || !name) {
    return (
      <InnerSwitch
        name={name}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => {
        return (
          <InnerSwitch
            errorMessage={formState.errors[name]?.message?.toString()}
            {...rest}
            {...field}
            checked={field.value ?? false}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
}
