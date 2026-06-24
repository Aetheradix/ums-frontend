export const collegeProfileUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/college-profile`;
  return {
    root: prefix,
    create: `${prefix}/create`,
  };
};
