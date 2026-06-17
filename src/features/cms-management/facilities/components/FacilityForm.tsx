import { useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextBox, Switch, TextArea } from 'shared/components/forms';

type Props = {
  fetchData?: Cms.FacilityForm;
  isSaving?: boolean;
  onSubmit: (data: Cms.FacilityForm) => void;
};

const DEFAULT_DATA: Cms.FacilityForm = {
  name: '',
  icon: 'business',
  description: '',
  isActive: true,
  displayOrder: 0,
};

export default function FacilityForm({
  fetchData = DEFAULT_DATA,
  isSaving,
  onSubmit,
}: Props) {
  const { register, handleSubmit, control } = useForm<Cms.FacilityForm>({
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
        <TextBox label="Icon (Material Icon)" {...register('icon')} />
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
          label="Save Facility"
        />
      </div>
    </form>
  );
}
