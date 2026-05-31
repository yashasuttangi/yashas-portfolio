import { Routes, Route } from 'react-router-dom';
import AiFullStack from './pages/AiFullstack';
import Ml from './pages/Ml';
import Webdev from './pages/Webdev';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AiFullStack />} />
      <Route path="/ml" element={<Ml />} />
      <Route path="/web" element={<Webdev />} />
    </Routes>
  );
}