import type { Control, FieldValues, Path } from 'react-hook-form';
import { FileUpload } from 'shared/components/forms';

interface ProfileSidebarCardProps<T extends FieldValues> {
  config: Profile.SidebarConfig;
  formValues: Record<string, unknown>;
  username: string;
  register: (name: Path<T>) => {
    control: Control<T>;
    name: Path<T>;
  };
}

export default function ProfileSidebarCard<T extends FieldValues>({
  config,
  formValues,
  username,
  register,
}: ProfileSidebarCardProps<T>) {
  const displayName = (formValues['fullName'] as string) || username;

  return (
    <aside className="my-profile-sidebar-card">
      <div className="my-profile-cover" />

      <div className="my-profile-avatar-wrap">
        <FileUpload
          accept=".jpg,.jpeg,.png"
          mode="avatar"
          maxSizeKB={250}
          uploadNote="JPG/PNG, max 250 KB"
          {...register('profileImage' as Path<T>)}
        />
      </div>

      <div className="my-profile-user-head">
        <h3>{displayName}</h3>
      </div>

      <div className="my-profile-divider" />

      <div className="my-profile-info-section">
        {config.rows.map(row => {
          const value = String(formValues[row.field] ?? '-');

          return (
            <div key={row.field} className="my-profile-info-row">
              <span className="my-profile-info-label">{row.label}</span>
              <span className="my-profile-info-colon">:</span>
              <strong className="my-profile-info-value">{value}</strong>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
