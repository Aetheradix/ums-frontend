import { ActionButtons } from 'features/components';
import SelectLanguagePreference from 'features/components/SelectLanguagePreference';
import SelectRelationshipTypes from 'features/components/SelectRelationshipTypes';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { FileUpload, Switch, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import { getPhotoUrl } from 'shared/utils/photoUrl';
import { useStudentAdditionalInformationForm } from './form.hook';

interface Props {
  onSubmit: (data: SIS.StudentAdditionalInformationForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<SIS.StudentAdditionalInformationForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function StudentAdditionalInformationForm(props: Props) {
  const { control, handleSubmit, reset } = useStudentAdditionalInformationForm(
    props.onSubmit,
    props.fetchData
  );

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
      <FormCard>
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9">
            <FormGrid>
              <TextBox
                label="Student Id"
                name="studentId"
                control={control}
                required
              />
              <TextBox
                label="Academic Id"
                name="studentAcademicId"
                control={control}
                required
              />
              <TextBox
                label="Emergency Contact Name"
                placeholder="Enter Name"
                name="emergencyContactName"
                control={control}
                required
              />
              <TextBox
                label="Emergency Contact Number"
                placeholder="Number"
                name="emergencyContact"
                control={control}
                required
              />
              <SelectRelationshipTypes
                label="Relation"
                name="emergencyRelation"
                control={control}
                required
              />
              <SelectLanguagePreference
                label="Language"
                name="languagePreferance"
                control={control}
                required={false}
              />

              <div className="col-span-full mt-4">
                <div className="flex flex-row flex-wrap items-center gap-12 bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">
                      Email Notification
                    </label>
                    <Switch name="emailNotification" control={control} />
                  </div>
                  <div className="flex items-center gap-3 border-l pl-10">
                    <label className="text-sm font-medium text-gray-700">
                      SMS Notification
                    </label>
                    <Switch name="smsNotification" control={control} />
                  </div>
                  <div className="flex items-center gap-3 border-l pl-10">
                    <label className="text-sm font-medium text-gray-700">
                      Push Notification
                    </label>
                    <Switch name="pushNotification" control={control} />
                  </div>
                </div>
              </div>
            </FormGrid>
          </div>

          <div className="col-span-12 lg:col-span-3 flex flex-col items-center justify-center border-l-0 lg:border-l pl-0 lg:pl-8 py-4">
            <FileUpload
              name="profilePhoto"
              control={control}
              preview={preview}
              maxSizeKB={100}
              accept=".jpg,.jpeg,.png"
              uploadNote="*Only .jpg, .png (Max 100KB)"
              required={!props.isEditMode}
            />
          </div>
        </div>
      </FormCard>

      <div className="mt-8">
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
