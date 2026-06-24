import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormWizard } from 'shared/components/forms';
import type { WizardStep } from 'shared/components/forms/FormWizard';
import { FormPage } from 'shared/new-components';
import EcosystemCoursesStep from '../components/EcosystemCoursesStep';
import { useCollegeProfileWizardForm } from '../components/form.hook';
import InfrastructureStep from '../components/InfrastructureStep';
import InstitutionalNocStep from '../components/InstitutionalNocStep';
import { useSaveCollegeProfileMutation } from '../queries';
import './Create.css';

export default function Create() {
  const navigate = useNavigate();

  const { mutateAsync: saveProfileMutateAsync, isPending } =
    useSaveCollegeProfileMutation();

  const { register, control, handleSubmit, reset, trigger } =
    useCollegeProfileWizardForm();

  const onFormSubmit = handleSubmit(
    async data => {
      try {
        const finalData = {
          ...data,
          documents: [],
        };

        const result = await saveProfileMutateAsync(finalData);

        if (result) {
          ToastService.success('College Profile saved successfully.');
          reset();
          navigate(-1);
        }
      } catch (err) {
        ToastService.error('Failed to save College Profile');
        console.error(err);
      }
    },
    errors => {
      console.log('Validation Errors on Save:', errors);
      ToastService.error('Please fix the validation errors in the form.');
    }
  );

  const wizardSteps: WizardStep[] = [
    {
      label: 'Institutional & NOC',
      icon: 'building',
      content: <InstitutionalNocStep register={register} control={control} />,
    },
    {
      label: 'Infrastructure',
      icon: 'map',
      content: <InfrastructureStep register={register} control={control} />,
    },
    {
      label: 'Ecosystem & Courses',
      icon: 'book',
      content: <EcosystemCoursesStep register={register} control={control} />,
    },
  ];

  return (
    <FormPage
      title="College Profile Form"
      description="Configure and save college profile details, infrastructure, and courses."
    >
      <FormWizard
        steps={wizardSteps}
        onComplete={onFormSubmit}
        isSaving={isPending}
        triggerValidation={trigger as (fields: string[]) => Promise<boolean>}
        onReset={reset}
      />
    </FormPage>
  );
}
