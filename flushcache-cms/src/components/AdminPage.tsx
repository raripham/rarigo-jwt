import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Log the user out and redirect to the login page
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to the Admin Page</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This is a protected page that only authenticated users should be able to access.
      </p>
      <button 
        onClick={handleLogout} 
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
