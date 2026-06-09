import AvailableFacility from 'features/master/college/college-facility';
import EstablishmentYear from 'features/master/other/establishment-year';
import { Route, Routes } from 'react-router';
import CollegeRegistration from './college-registration';
import ProgrammeFee from './settings/programme-fee';

export default function AffiliationManagementSystem() {
  return (
    <Routes>
      <Route path="college-registration/*" element={<CollegeRegistration />} />
      <Route path="affiliation-settings/*">
        <Route path="available-facility/*" element={<AvailableFacility />} />
        <Route path="establishment-year/*" element={<EstablishmentYear />} />
        <Route path="programme-fee/*" element={<ProgrammeFee />} />
      </Route>
    </Routes>
  );
}
