import { Route, Routes } from 'react-router-dom';
import Caste from './caste';
import Post from './post';
import Qualification from './qualification';
import Religion from './religion';

export default function HR() {
  return (
    <Routes>
      <Route path="caste/*" element={<Caste />} />
      <Route path="post/*" element={<Post />} />
      <Route path="qualification/*" element={<Qualification />} />
      <Route path="religion/*" element={<Religion />} />
    </Routes>
  );
}
