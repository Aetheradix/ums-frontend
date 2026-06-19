import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormPage } from 'shared/new-components';
import EcosystemCoursesStep from '../components/EcosystemCoursesStep';
import {
  STEP_FIELDS,
  useCollegeProfileWizardForm,
} from '../components/form.hook';
import InfrastructureStep from '../components/InfrastructureStep';
import InstitutionalNocStep from '../components/InstitutionalNocStep';
import { useSaveCollegeProfileMutation } from '../queries';
import './Create.css';

const STEPS = [
  {
    label: 'Institutional & NOC',
    description: 'Affiliation and NOC details',
    icon: 'building',
  },
  {
    label: 'Infrastructure',
    description: 'Physical land and buildings',
    icon: 'map',
  },
  {
    label: 'Ecosystem & Courses',
    description: 'Academic programmes & resources',
    icon: 'book',
  },
];

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = useCallback(async () => {
    const fields = STEP_FIELDS[activeStep];
    const isValid = await trigger(fields);

    if (isValid) {
      setActiveStep(prev => prev + 1);
    } else {
      const liveErrors = control._formState.errors;
      const getFormattedErrors = (obj: any, path: string = ''): string[] => {
        const messages: string[] = [];
        const recurse = (item: any, currentPath: string) => {
          if (!item) return;
          if (typeof item === 'object') {
            if (item.message) {
              const cleanPath = currentPath
                .replace(/^nocDetails\.\d+\./, 'NOC ')
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .replace(/^./, str => str.toUpperCase());
              messages.push(`${cleanPath}: ${item.message}`);
            } else {
              for (const key in item) {
                const separator = currentPath ? '.' : '';
                recurse(item[key], `${currentPath}${separator}${key}`);
              }
            }
          }
        };
        recurse(obj, path);
        return messages;
      };

      const stepErrors: string[] = [];
      for (const f of fields) {
        const error = liveErrors[f];
        if (error) {
          const msgs = getFormattedErrors(error, f);
          stepErrors.push(...msgs);
        }
      }

      if (stepErrors.length > 0) {
        ToastService.error(stepErrors[0]);
      } else {
        ToastService.error('Please fill all required fields correctly.');
      }
    }
  }, [activeStep, trigger, control]);

  const handleBack = useCallback(() => {
    setActiveStep(prev => Math.max(0, prev - 1));
  }, []);

  const handleStepClick = useCallback(
    (index: number) => {
      if (index < activeStep) {
        setActiveStep(index);
      }
    },
    [activeStep]
  );

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return <InstitutionalNocStep register={register} control={control} />;

      case 1:
        return <InfrastructureStep register={register} control={control} />;

      case 2:
        return <EcosystemCoursesStep register={register} control={control} />;

      default:
        return null;
    }
  };

  const isLastStep = activeStep === STEPS.length - 1;

  return (
    <FormPage
      title="College Profile Form"
      description="Configure and save college profile details, infrastructure, and courses."
    >
      <div className="affiliation-create-layout">
        <aside className="affiliation-step-panel">
          <div className="affiliation-step-panel-header">
            <span className="affiliation-step-panel-icon">
              <i className="pi pi-id-card" />
            </span>

            <div>
              <h3>Profile Completion</h3>
              <p>Follow the steps to configure the college profile.</p>
            </div>
          </div>

          <div className="affiliation-step-list">
            {STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const canClick = index < activeStep;

              return (
                <button
                  key={step.label}
                  type="button"
                  className={`affiliation-step-item ${
                    isActive ? 'active' : ''
                  } ${isCompleted ? 'completed' : ''}`}
                  onClick={() => canClick && handleStepClick(index)}
                  disabled={!canClick && !isActive}
                >
                  <span className="affiliation-step-number">
                    {isCompleted ? <i className="pi pi-check" /> : index + 1}
                  </span>

                  <span className="affiliation-step-content">
                    <strong>{step.label}</strong>
                    <small>{step.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="affiliation-form-panel">
          <form onSubmit={onFormSubmit}>
            <div className="affiliation-form-content">{renderActiveStep()}</div>

            <div className="affiliation-form-actions mt-5">
              {activeStep > 0 && (
                <Button
                  key="back-button"
                  label="Back"
                  type="button"
                  onClick={handleBack}
                  icon="arrow-left"
                  variant="outlined"
                />
              )}

              {!isLastStep ? (
                <Button
                  key="next-button"
                  label="Next"
                  type="button"
                  onClick={handleNext}
                  icon="arrow-right"
                />
              ) : (
                <Button
                  key="submit-button"
                  label={isPending ? 'Saving...' : 'Submit Profile'}
                  type="submit"
                  icon="check"
                  isLoading={isPending}
                />
              )}
            </div>
          </form>
        </section>
      </div>
    </FormPage>
  );
}
