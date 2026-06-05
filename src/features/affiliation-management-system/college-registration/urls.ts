export const collegeRegistrationUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/college-registration`;
  return {
    root: prefix,
    create: `${prefix}/create`,
  };
};
