import type { SubmitEventHandler } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextArea, TextBox } from 'shared/components/forms';

// ── Private: Renders a single field ──
interface ProfileFormFieldProps<T extends FieldValues> {
  config: Profile.FieldConfig;
  register: (name: Path<T>) => {
    control: Control<T>;
    name: Path<T>;
  };
}

function ProfileFormField<T extends FieldValues>({
  config,
  register,
}: ProfileFormFieldProps<T>) {
  const fieldName = config.field as Path<T>;
  const style = config.colSpan
    ? { gridColumn: `span ${config.colSpan}` }
    : undefined;

  switch (config.type) {
    case 'textarea':
      return (
        <div style={style}>
          <TextArea
            label={config.label}
            placeholder={config.placeholder}
            disabled={config.disabled}
            {...register(fieldName)}
          />
        </div>
      );

    case 'text':
    default:
      return (
        <div style={style}>
          <TextBox
            label={config.label}
            placeholder={config.placeholder}
            disabled={config.disabled}
            {...register(fieldName)}
          />
        </div>
      );
  }
}

// ── Private: Renders a section within a tab ──
interface ProfileFormSectionProps<T extends FieldValues> {
  config: Profile.SectionConfig;
  register: (name: Path<T>) => {
    control: Control<T>;
    name: Path<T>;
  };
}

function ProfileFormSection<T extends FieldValues>({
  config,
  register,
}: ProfileFormSectionProps<T>) {
  const gridClass =
    config.columns === 2 ? 'my-profile-address-grid' : 'my-profile-form-grid';

  return (
    <section className="my-profile-form-section">
      <div className="my-profile-section-header">
        <div className="my-profile-section-icon">
          <i className={`pi pi-${config.icon}`} />
        </div>

        <div>
          <h3>{config.title}</h3>
          {config.description && <p>{config.description}</p>}
        </div>
      </div>

      <div className={gridClass}>
        {config.fields.map(field => (
          <ProfileFormField
            key={field.field}
            config={field}
            register={register}
          />
        ))}
      </div>
    </section>
  );
}

// ── Public: Renders a complete config-driven tab ──
export interface ProfileFormTabProps<T extends FieldValues> {
  config: Profile.TabConfig;
  register: (name: Path<T>) => {
    control: Control<T>;
    name: Path<T>;
  };
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  onReset?: () => void;
}

export default function ProfileFormTab<T extends FieldValues>({
  config,
  register,
  onSubmit,
  onReset,
}: ProfileFormTabProps<T>) {
  const content = (
    <>
      {config.sections.map((section, i) => (
        <ProfileFormSection key={i} config={section} register={register} />
      ))}

      {config.editable && (
        <div className="my-profile-actions">
          <Button
            type="button"
            label="Cancel"
            icon="times"
            variant="outlined"
            onClick={onReset}
          />

          <Button
            type="submit"
            label={config.submitLabel ?? 'Update'}
            icon="check"
            variant="primary"
          />
        </div>
      )}
    </>
  );

  // Editable tabs wrap in a <form>, read-only tabs don't
  if (config.editable && onSubmit) {
    return (
      <form className="my-profile-form-panel" onSubmit={onSubmit}>
        {content}
      </form>
    );
  }

  return <div className="my-profile-form-panel">{content}</div>;
}
