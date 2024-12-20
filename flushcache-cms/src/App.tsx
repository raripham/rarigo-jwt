import React, { useState } from 'react';
import LoginForm from './components/Login';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = async (email: string) => {
    console.log('Email:', email);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm onSubmit={handleLogin}/>} />
        <Route path="/admindemo" 
          element={
            isAuthenticated 
              ? <AdminPage /> 
              : <Navigate to="/login" replace />
          } />
        <Route path="/admin" element={<UserPage/>} />
      </Routes>
    </Router>
    // <div className="App">
    //   <LoginForm onSubmit={handleLogin} />
    // </div>
  );
};

export default App;
