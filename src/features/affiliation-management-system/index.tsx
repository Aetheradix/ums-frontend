import AvailableFacility from 'features/master/college/college-facility';
import NocType from 'features/master/college/noc-type';
import EstablishmentYear from 'features/master/other/establishment-year';
import { Route, Routes } from 'react-router';
import CollegeProfile from './college-profile';
import CollegeRegistration from './college-registration';
import CollegeRegistrationApproval from './college-registration-approval';
import ProgrammeFee from './settings/programme-fee';

import DraftRegistrationRequest from './draft-registration-request';

export default function AffiliationManagementSystem() {
  return (
    <Routes>
      <Route
        path="registration-approval/*"
        element={<CollegeRegistrationApproval />}
      />
      <Route path="college-registration/*" element={<CollegeRegistration />} />
      <Route
        path="draft-registration-request/*"
        element={<DraftRegistrationRequest />}
      />
      <Route path="college-profile/*" element={<CollegeProfile />} />
      <Route path="affiliation-settings/*">
        <Route path="available-facility/*" element={<AvailableFacility />} />
        <Route path="establishment-year/*" element={<EstablishmentYear />} />
        <Route path="programme-fee/*" element={<ProgrammeFee />} />
        <Route path="noc-type/*" element={<NocType />} />
      </Route>
    </Routes>
  );
}
