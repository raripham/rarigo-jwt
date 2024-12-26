import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  userC: User | {email: "", role: ""};
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userC, setUserC] = useState<User | {email: "", role: ""}>({email: "", role: ""});

  const login = (newUser: User) => setUserC(newUser);
  const logout = () => setUserC({email: "", role: ""});

  return (
    <AuthContext.Provider value={{ userC, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
