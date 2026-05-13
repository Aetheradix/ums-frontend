import { studentAdditionalInformationUrls } from './student-additional-information/urls';

const baseUrl = '/sis';

export const sisUrls = {
  root: baseUrl,
  studentAdditionalInformation: studentAdditionalInformationUrls(baseUrl),
};
