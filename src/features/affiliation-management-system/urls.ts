import { collegeRegistrationUrls } from './college-registration/urls';

const baseUrl = '/affiliation-management-system';
export const affiliationManagementSystemUrls = {
  collegeRegistration: collegeRegistrationUrls(baseUrl),
};
