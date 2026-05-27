import { employeeSelfAssessmentUrls } from './employee-self-assessment/urls';
import { sessionsManagementUrls } from './sessions-management/urls';

const baseUrl = '/career-advancement';

export const careerAdvancementUrls = {
  root: baseUrl,
  sessionsManagement: sessionsManagementUrls(baseUrl),
  employeeSelfAssessment: employeeSelfAssessmentUrls(baseUrl),
};
