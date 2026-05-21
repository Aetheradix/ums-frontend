import { Route, Routes } from 'react-router-dom';
import List from './pages/List';

function GrievanceCategory() {
  return (
    <>
      <Routes>
        <>
          <Route path="/*" element={<List />}></Route>
        </>
      </Routes>
    </>
  );
}

export default GrievanceCategory;
