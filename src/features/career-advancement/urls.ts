const baseUrl = '/career-advancement';

export const employeeSelfAssessmentUrls = (base: string) => {
  const prefix = `${base}/employee-self-assessment`;
  return {
    root: prefix,
    create: `${prefix}/create`,
  };
};

export const careerAdvancementUrls = {
  root: baseUrl,
  employeeSelfAssessment: employeeSelfAssessmentUrls(baseUrl),
};
