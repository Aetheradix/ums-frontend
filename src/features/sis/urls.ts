import { studentAdditionalInformationUrls } from './student-additional-information/urls';

const baseUrl = '/sis';

export const studentApplicationFormUrls = (base: string) => {
  const prefix = `${base}/student-application-form`;
  return {
    root: prefix,
  };
};

export const sisUrls = {
  root: baseUrl,
  studentAdditionalInformation: studentAdditionalInformationUrls(baseUrl),
  studentApplicationForm: studentApplicationFormUrls(baseUrl),
};
