import { useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextBox, Switch, DropDownList } from 'shared/components/forms';
import { useDepartmentsQuery } from '../../departments/queries';

type Props = {
  fetchData?: Cms.FacultyForm;
  isSaving?: boolean;
  isEditMode?: boolean;
  onSubmit: (data: Cms.FacultyForm) => void;
};

const DEFAULT_DATA: Cms.FacultyForm = {
  fullName: '',
  initials: '',
  departmentId: 0,
  designation: 'Professor',
  qualification: '',
  experienceYears: 0,
  researchPapers: 0,
  email: '',
  profileImageUrl: '',
  avatarColorHex: '#0F4C81',
  isActive: true,
  displayOrder: 0,
};

export default function FacultyForm({
  fetchData = DEFAULT_DATA,
  isSaving,
  onSubmit,
}: Props) {
  const { data: departments } = useDepartmentsQuery();

  const { register, handleSubmit, control } = useForm<Cms.FacultyForm>({
    defaultValues: fetchData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="grid grid-cols-2 gap-4">
        <TextBox
          label="Full Name"
          required
          {...register('fullName', { required: 'Full Name is required' })}
        />
        <TextBox label="Initials" {...register('initials')} />
        <DropDownList
          textField="label"
          valueField="value"
          label="Department"
          data={departments?.map(d => ({ label: d.name, value: d.id })) ?? []}
          required
          control={control}
          name="departmentId"
        />
        <DropDownList
          textField="label"
          valueField="value"
          label="Designation"
          data={[
            { label: 'Professor', value: 'Professor' },
            { label: 'Associate Professor', value: 'Associate Professor' },
            { label: 'Assistant Professor', value: 'Assistant Professor' },
            { label: 'Lecturer', value: 'Lecturer' },
          ]}
          required
          control={control}
          name="designation"
        />
        <TextBox
          label="Qualification (e.g., Ph.D., M.Tech)"
          {...register('qualification')}
        />
        <TextBox label="Email Address" type="email" {...register('email')} />
        <TextBox
          label="Experience (Years)"
          {...register('experienceYears', { valueAsNumber: true })}
        />
        <TextBox
          label="Research Papers"
          {...register('researchPapers', { valueAsNumber: true })}
        />
        <TextBox label="Profile Image URL" {...register('profileImageUrl')} />
        <TextBox
          label="Avatar Background Color Hex"
          type="color"
          {...register('avatarColorHex')}
        />
        <TextBox
          label="Display Order"
          {...register('displayOrder', { valueAsNumber: true })}
        />
        <Switch control={control} name="isActive" label="Is Active" />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSaving}
          label="Save Faculty Member"
        />
      </div>
    </form>
  );
}
