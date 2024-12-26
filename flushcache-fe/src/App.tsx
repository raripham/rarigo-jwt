// import { DarkThemeToggle } from "flowbite-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CdnLayout from './view/user/layouts/CdnLayout';
import CFLayout from './view/user/layouts/CFLayout';

import CFLayoutAdmin from './view/admin/layouts/CFLayout';
import CdnLayoutAdmin from './view/admin/layouts/CdnLayout';
import UserLayout from './view/admin/layouts/UserLayout';
import RoleLayout from './view/admin/layouts/RoleLayout';

import LoginLayout from './view/auth/LoginLayout';
import { AuthProvider } from './view/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <LoginLayout />
        } />

        <Route path="/admin" element={<Navigate to="/admin/cfs" replace />} />
        <Route path="/admin/cfs" element={
          <CFLayoutAdmin />
        } />
        <Route path="/admin/cdns" element={
          <CdnLayoutAdmin />
        } />
        <Route path="/admin/users" element={
          <UserLayout />
        } />
        <Route path="/admin/roles" element={
          <RoleLayout />
        } />

        <Route path="/ui" element={<Navigate to="/ui/cfs" replace />} />
        <Route path="/ui/cfs" element={
          <CFLayout />
        } />
        <Route path="/ui/cdns" element={
          <CdnLayout />
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
