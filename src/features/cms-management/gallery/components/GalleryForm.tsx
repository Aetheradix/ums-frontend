import { useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { TextBox } from 'shared/components/forms';

type Props = {
  isSaving?: boolean;
  onSubmit: (data: Cms.GalleryForm) => void;
};

const DEFAULT_DATA: Cms.GalleryForm = {
  label: '',
  emoji: '📸',
  backgroundColor: '#0F4C81',
  imageUrl: '',
  displayOrder: 0,
};

export default function GalleryForm({ isSaving, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<Cms.GalleryForm>({
    defaultValues: DEFAULT_DATA,
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
        <TextBox label="Emoji" {...register('emoji')} />
        <TextBox
          label="Background Color Hex"
          type="color"
          {...register('backgroundColor')}
        />
        <TextBox
          label="Display Order"
          {...register('displayOrder', { valueAsNumber: true })}
        />
        <div className="col-span-2">
          <TextBox label="Image URL" {...register('imageUrl')} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSaving}
          label="Save Gallery Item"
        />
      </div>
    </form>
  );
}
