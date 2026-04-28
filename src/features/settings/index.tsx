import { Route, Routes } from "react-router-dom";
import Settings from "./pages/Settings";

export default function SettingsFeature() {
  return (
    <Routes>
      <Route index element={<Settings />} />
    </Routes>
  );
}
