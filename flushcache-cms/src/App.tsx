import React from 'react';
import LoginForm from './components/Login';
import AdminPage from './components/AdminPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const handleLogin = async (email: string) => {
    console.log('Email:', email);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm onSubmit={handleLogin}/>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <LoginForm onSubmit={handleLogin} />
    // </div>
  );
};

export default App;
