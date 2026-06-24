import { Route, Routes } from 'react-router-dom';
import Settings from './Settings';
import MyProfile from './my-profile/MyProfile';

export default function SettingsFeature() {
  return (
    <Routes>
      <Route index element={<Settings />} />
      <Route path="my-profile" element={<MyProfile />} />
    </Routes>
  );
}
