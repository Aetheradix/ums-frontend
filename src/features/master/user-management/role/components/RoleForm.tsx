import { Controller } from 'react-hook-form';
import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useRoleForm } from './form.hook';
import './RoleForm.css';

interface RoleFormProps {
  onSubmit: (data: UserManagement.UserRoleForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<UserManagement.UserRoleForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
  columns?: 1 | 2;
}

export default function RoleForm(props: RoleFormProps) {
  const { register, control, handleSubmit, reset } = useRoleForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={props.columns ?? 2}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextBox
              label="Role Name"
              placeholder="Enter Role Name"
              value={field.value}
              maxLength={50}
              onChange={val => {
                const filtered = val.replace(/[^a-zA-Z0-9 ]/g, '');
                field.onChange(filtered);
              }}
              errorMessage={fieldState.error?.message}
              required
            />
          )}
        />

        <TextBox
          label="Description"
          placeholder="Enter Description"
          {...register('description')}
          required
        />

        <div className="role-status-field">
          <label className="role-status-field-label">Status</label>

          <label className="role-status-toggle">
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="role-status-toggle-input"
                  checked={field.value ?? true}
                  onChange={e => field.onChange(e.target.checked)}
                />
              )}
            />

            <span className="role-status-toggle-track">
              <span className="role-status-toggle-thumb" />
            </span>

            <span className="role-status-toggle-text">Active</span>
          </label>
        </div>
      </FormGrid>

      <FormActions
        isEditMode={props.isEditMode}
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
      />
    </form>
  );
}
