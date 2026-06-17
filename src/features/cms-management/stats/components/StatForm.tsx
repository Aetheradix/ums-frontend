import { useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextBox } from 'shared/components/forms';

type Props = {
  fetchData: Cms.UniversityStatForm;
  isSaving?: boolean;
  onSubmit: (data: Cms.UniversityStatForm) => void;
};

export default function StatForm({ fetchData, isSaving, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<Cms.UniversityStatForm>({
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
          label="Label"
          required
          {...register('label', { required: 'Label is required' })}
        />
        <TextBox
          label="Value"
          required
          {...register('value', { required: 'Value is required' })}
        />
        <TextBox label="Icon (Material Icon)" {...register('icon')} />
        <TextBox
          label="Display Order"
          {...register('displayOrder', { valueAsNumber: true })}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSaving}
          label="Save Statistic"
        />
      </div>
    </form>
  );
}
