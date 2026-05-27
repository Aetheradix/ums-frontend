import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import PerformanceAcademicApplication from '../components/PerformanceAcademicApplication';
import { useCreateAcademicDetail, useUpdateAcademicDetail } from '../queries';

// TODO: Get from context/route state later
const CURRENT_EMPLOYEE_ID = 1;
const CURRENT_ASSESSMENT_SESSION_ID = 1; // dummy fallback
const CURRENT_APPLICATION_ID = 1;

export default function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    applicationId?: number;
    assessmentSessionId?: number;
  } | null;

  const applicationId = state?.applicationId || CURRENT_APPLICATION_ID;
  const assessmentSessionId =
    state?.assessmentSessionId || CURRENT_ASSESSMENT_SESSION_ID;

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAcademicDetail();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAcademicDetail();

  const isSaving = isCreating || isUpdating;

  const handlePrevious = useCallback(() => {
    // Navigate back to Basic Details (performance-application)
    navigate('/career-advancement/performance-appraisal-system/application');
  }, [navigate]);

  const handleCancel = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  async function handleSubmit(
    data: CareerAdvancement.PerformanceAcademicForm,
    status: 'Draft' | 'Submitted'
  ) {
    // Form fields mapping
    const payloadBase = {
      applicationId,
      qualificationId: data.qualificationId!,
      universityInstitution: data.universityInstitution,
      yearOfPassing: parseInt(data.yearOfPassing, 10),
      netsetQualified:
        data.netsetQualified === 'Yes'
          ? true
          : data.netsetQualified === 'No'
            ? false
            : null,
      status: status,
      isActive: true,
      employeeId: CURRENT_EMPLOYEE_ID,
      assessmentSessionId,
      documentType: 'Degree Certificate',
      document: data.document,
    };

    if (data.academicId) {
      const payload: CareerAdvancement.UpdateAcademicDetailPayload = {
        ...payloadBase,
        academicId: data.academicId,
      };
      await updateMutation(payload);
      ToastService.success('Academic detail updated successfully.');
    } else {
      const payload: CareerAdvancement.CreateAcademicDetailPayload =
        payloadBase;
      await createMutation(payload);
      ToastService.success('Academic detail saved successfully.');
    }

    if (status === 'Submitted') {
      navigate('/career-advancement/performance-appraisal-system/teaching'); // dummy next route
    } else {
      navigate('/home');
    }
  }

  return (
    <FormPage
      title="Create PBAS / CAS Application"
      description="Career Advancement Scheme performance based appraisal system"
    >
      <PerformanceAcademicApplication
        onSubmit={handleSubmit}
        onPrevious={handlePrevious}
        onCancel={handleCancel}
        isSaving={isSaving}
      />
    </FormPage>
  );
}
