import { availableFacilityUrls } from 'features/master/college/college-facility/urls';
import { establishmentYearUrls } from 'features/master/other/establishment-year/urls';
import { nocTypeUrls } from 'features/master/college/noc-type/urls';
import { collegeRegistrationApprovalUrls } from './college-registration-approval/urls';
import { collegeRegistrationUrls } from './college-registration/urls';

const baseUrl = '/affiliation-management-system';
export const affiliationManagementSystemUrls = {
  collegeRegistration: collegeRegistrationUrls(baseUrl),
  collegeRegistrationApproval: collegeRegistrationApprovalUrls(baseUrl),
  availableFacility: availableFacilityUrls(`${baseUrl}/affiliation-settings`),
  establishmentYear: establishmentYearUrls(`${baseUrl}/affiliation-settings`),
  nocType: nocTypeUrls(`${baseUrl}/affiliation-settings`),
};
