import { useLocation, useNavigate, useParams } from 'react-router';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import { careerAdvancementUrls } from '../../urls';
import InitiateAparForm from '../components/InitiateAparForm';
import { useInitiateAparMutation } from '../queries';

type InitiateAparForm = CareerAdvancement.AparApplication.InitiateAparForm;

interface LocationState {
  employeeName?: string;
  designation?: string;
}

export default function Initiate() {
  const { id: _id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = (location.state ?? {}) as LocationState;

  const { mutateAsync, isPending } = useInitiateAparMutation();

  const allApplicationsUrl = careerAdvancementUrls.aparApplication.all;

  // Pre-fill form with employee data passed via navigation state
  const defaultValues: Partial<InitiateAparForm> = {
    employeeName: locationState.employeeName ?? '',
    designation: locationState.designation ?? '',
    dateOfBirth: null,
    categoryId: null,
    groupId: null,
    belongToScSt: null,
    employmentTypeId: null,
    sectionsServed: '',
    lengthOfServiceUnderReviewingOfficer: '',
    dateOfContinuousAppointment: null,
    employeeValidityDate: null,
    reportingOfficerValidityDate: null,
    reviewingOfficerValidityDate: null,
  };

  async function handleSubmit(data: InitiateAparForm) {
    try {
      const result = await mutateAsync({
        ...data,
        dateOfBirth: data.dateOfBirth?.toISOString() ?? '',
        dateOfContinuousAppointment:
          data.dateOfContinuousAppointment?.toISOString() ?? '',
        employeeValidityDate: data.employeeValidityDate?.toISOString() ?? '',
        reportingOfficerValidityDate:
          data.reportingOfficerValidityDate?.toISOString() ?? '',
        reviewingOfficerValidityDate:
          data.reviewingOfficerValidityDate?.toISOString() ?? '',
        belongToScSt: data.belongToScSt ?? null,
      });
      if (result) {
        ToastService.success('APAR application initiated successfully.');
        navigate(allApplicationsUrl);
      }
    } catch {
      ToastService.error('Failed to initiate APAR application.');
    }
  }

  function handleCancel() {
    navigate(allApplicationsUrl);
  }

  return (
    <FormPage
      title="Initiate APAR Application"
      description={
        locationState.employeeName
          ? `Admin initialization for: ${locationState.employeeName}`
          : 'Admin initialization for: Employee'
      }
      breadcrumbs={[
        {
          label: 'Career Advancement',
          to: '/home/sub-menu/career-advancement',
        },
        {
          label: 'APAR Application',
          to: allApplicationsUrl,
        },
        {
          label: 'All Applications',
          to: allApplicationsUrl,
        },
        {
          label: 'Process Application',
        },
      ]}
    >
      <InitiateAparForm
        onSubmit={handleSubmit}
        fetchData={defaultValues as InitiateAparForm}
        onSaveDraft={() => ToastService.success('Draft saved successfully.')}
        onCancel={handleCancel}
        isSaving={isPending}
      />
    </FormPage>
  );
}
