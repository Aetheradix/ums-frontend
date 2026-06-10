import { collegeRegistrationUrls } from './college-registration/urls';
import { availableFacilityUrls } from 'features/master/college/college-facility/urls';
import { establishmentYearUrls } from 'features/master/other/establishment-year/urls';

const baseUrl = '/affiliation-management-system';
export const affiliationManagementSystemUrls = {
  collegeRegistration: collegeRegistrationUrls(baseUrl),
  availableFacility: availableFacilityUrls(`${baseUrl}/affiliation-settings`),
  establishmentYear: establishmentYearUrls(`${baseUrl}/affiliation-settings`),
};
