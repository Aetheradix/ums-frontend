export const PERFORMANCE_APPRAISAL_API_URLS = {
  BASE: 'career',
};

export const performanceAppraisalUrls = (base: string) => {
  const prefix = `${base}/performance-appraisal`;
  return {
    root: prefix,
    create: `${prefix}/create`,
  };
};
