import { useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextBox, Switch, TextArea } from 'shared/components/forms';

type Props = {
  fetchData?: Cms.DepartmentForm;
  isSaving?: boolean;
  isEditMode?: boolean;
  onSubmit: (data: Cms.DepartmentForm) => void;
};

const DEFAULT_DATA: Cms.DepartmentForm = {
  name: '',
  shortName: '',
  icon: 'domain',
  colorHex: '#0F4C81',
  totalCourses: 0,
  totalFaculty: 0,
  totalStudents: 0,
  description: '',
  isActive: true,
  displayOrder: 0,
};

export default function DepartmentForm({
  fetchData = DEFAULT_DATA,
  isSaving,
  onSubmit,
}: Props) {
  const { register, handleSubmit, control } = useForm<Cms.DepartmentForm>({
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
          label="Name"
          required
          {...register('name', { required: 'Name is required' })}
        />
        <TextBox
          label="Short Name"
          required
          {...register('shortName', { required: 'Short Name is required' })}
        />
        <TextBox label="Icon (Material Icon name)" {...register('icon')} />
        <TextBox label="Color Hex" type="color" {...register('colorHex')} />
        <TextBox
          label="Total Courses"
          {...register('totalCourses', { valueAsNumber: true })}
        />
        <TextBox
          label="Total Faculty"
          {...register('totalFaculty', { valueAsNumber: true })}
        />
        <TextBox
          label="Total Students"
          {...register('totalStudents', { valueAsNumber: true })}
        />
        <TextBox
          label="Display Order"
          {...register('displayOrder', { valueAsNumber: true })}
        />
        <div className="col-span-2">
          <TextArea label="Description" {...register('description')} />
        </div>
        <Switch control={control} name="isActive" label="Is Active" />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSaving}
          label="Save Department"
        />
      </div>
    </form>
  );
}
