import { collegeRegistrationUrls } from './college-registration/urls';
import { collegeRegistrationApprovalUrls } from './college-registration-approval/urls';

const baseUrl = '/affiliation-management-system';
export const affiliationManagementSystemUrls = {
  collegeRegistration: collegeRegistrationUrls(baseUrl),
  collegeRegistrationApproval: collegeRegistrationApprovalUrls(baseUrl),
};
