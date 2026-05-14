import { ActionButtons } from 'features/components';
import SelectLanguagePreference from 'features/components/SelectLanguagePreference';
import SelectRelationshipTypes from 'features/components/SelectRelationshipTypes';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Checkbox, FileUpload, TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { getPhotoUrl } from 'shared/utils/photoUrl';
import { useStudentAdditionalInformationForm } from './form.hook';

interface Props {
  onSubmit: (data: SIS.StudentAdditionalInformationForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<SIS.StudentAdditionalInformationForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function StudentAdditionalInformationForm(props: Props) {
  const { register, control, handleSubmit, reset, setValue } =
    useStudentAdditionalInformationForm(props.onSubmit, props.fetchData);

  const profilePhoto = useWatch({ control, name: 'profilePhoto' });
  const profilePhotoUrl = useWatch({ control, name: 'profilePhotoUrl' });
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    if (profilePhoto instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(profilePhoto);
    } else if (profilePhotoUrl) {
      setPreview(getPhotoUrl(profilePhotoUrl));
    } else {
      setPreview(undefined);
    }
  }, [profilePhoto, profilePhotoUrl]);

  useEffect(() => {
    if (props.fetchData && typeof props.fetchData !== 'function') {
      reset(props.fetchData);
    }
  }, [props.fetchData, reset]);

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox label="Student Id" {...register('studentId')} required />
        <TextBox
          label="Academic Id"
          {...register('studentAcademicId')}
          required
        />

        <TextBox
          label="Emergency Contact Name"
          placeholder="Enter Name"
          {...register('emergencyContactName')}
          required
        />

        <TextBox
          label="Emergency Contact Number"
          placeholder="Enter Contact Number"
          {...register('emergencyContact')}
          required
        />
        <SelectRelationshipTypes
          label="Emergency Relation"
          {...register('emergencyRelation')}
          required
        />

        <SelectLanguagePreference
          label="Language Preference"
          {...register('languagePreferance')}
        />

        <FileUpload
          label="Profile Photo"
          preview={preview}
          maxSizeKB={100}
          accept=".jpg,.jpeg,.png"
          onChange={file => {
            setValue('profilePhoto', file);
          }}
          uploadNote="*Only .jpg,.png files allowed, max 100KB"
          required={!props.isEditMode}
        />

        <div className="flex gap-4 col-span-1 md:col-span-2 mt-2">
          <Checkbox
            label="Email Notification"
            {...register('emailNotification')}
          />
          <Checkbox label="SMS Notification" {...register('smsNotification')} />
          <Checkbox
            label="Push Notification"
            {...register('pushNotification')}
          />
        </div>
      </InputPanel>

      <div className="mt-4">
        <ActionButtons
          update={props.isEditMode}
          isLoading={props.isSaving}
          onSave={handleSubmit}
          onReset={reset}
        />
      </div>
    </form>
  );
}
