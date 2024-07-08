import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEditUser from './components/AddEditUser';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/list" element={<HomePage />} />
      <Route path="/add" element={<AddEditUser />} />
      <Route path="/edit/:id" element={<AddEditUser />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
