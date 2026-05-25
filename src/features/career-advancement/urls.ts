const baseUrl = '/career-advancement';
import { sessionsManagementUrls } from './sessions-management/urls';

export const employeeSelfAssessmentUrls = (base: string) => {
  const prefix = `${base}/employee-self-assessment`;
  return {
    root: prefix,
    create: `${prefix}/create`,
  };
};
export const careerAdvancementUrls = {
  root: baseUrl,
  sessionsManagement: sessionsManagementUrls(baseUrl),
};
