import { ApiService } from 'services';

const CAREER_ADVANCEMENT_URL = `career`;

function formatDate(date: Date | null): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function createEmployeeSelfAssessment(
  form: CareerAdvancement.EmployeeSelfAssessmentForm
) {
  debugger;
  const formData = new FormData();

  formData.append('EmployeeId', form.employeeId.toString());
  formData.append('TasksProjects', form.tasksProjects);
  formData.append('WorkOutputScore', (form.workOutputScore ?? 0).toString());

  if (form.workOutputRemarks) {
    formData.append('WorkOutputRemarks', form.workOutputRemarks);
  }

  formData.append('AssessmentYear', formatDate(form.assessmentYear));
  formData.append(
    'AssessmentPeriodFrom',
    formatDate(form.assessmentPeriodFrom)
  );
  formData.append('AssessmentPeriodTo', formatDate(form.assessmentPeriodTo));
  formData.append('ReviewingHeadId', (form.reviewingHeadId ?? 0).toString());

  formData.append('LeadershipQuality', form.leadershipQuality);
  formData.append('CommunicationSkills', form.communicationSkills);
  formData.append('Integrity', form.integrity);
  formData.append('Adaptability', form.adaptability);
  formData.append('TeamWork', form.teamWork);

  formData.append('DomainKnowledge', form.domainKnowledge);
  formData.append('ProblemSolvingAbility', form.problemSolvingAbility);
  formData.append('DecisionMaking', form.decisionMaking);
  formData.append('AnalyticalSkills', form.analyticalSkills);

  if (form.functionalRemarks) {
    formData.append('FunctionalRemarks', form.functionalRemarks);
  }

  if (form.additionalRemarks) {
    formData.append('AdditionalRemarks', form.additionalRemarks);
  }

  formData.append('Status', form.status);
  formData.append('IsActive', form.isActive.toString());

  if (form.supportingDocument instanceof File) {
    formData.append('SupportingDocument', form.supportingDocument);
  }

  const { error, data } =
    await ApiService.postFormData<CareerAdvancement.EmployeeSelfAssessmentForm>(
      CAREER_ADVANCEMENT_URL,
      formData
    );

  return !error ? data : undefined;
}
