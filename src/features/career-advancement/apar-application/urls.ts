export const APAR_APPLICATION_BASE_URL = 'career/apar-applications';

export const aparApplicationUrls = (base: string) => {
  const prefix = `${base}/apar-application`;
  return {
    root: prefix,
    all: `${prefix}/all`,
  };
};
