import { Button, Label, TextInput, Checkbox } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

interface User {
    email: string;
    role: string;
}

const LoginLayout: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both email and password are required');
      return;
    }
    setError('');
    try {
      const response = await fetch("http://localhost:8000/api/login", { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password,
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        const userData: User = {
          email: data.email,
          role: data.role
        }
        setUser(userData)
        setSuccessMessage('Login successful!');
        setPassword('');

        localStorage.setItem('userInfo', JSON.stringify({email: email, role: user?.role}));
        if (user?.role === 'Admin') {
            navigate('/admin')
        } else {
            navigate('/ui')
        }

        // navigate('/admin')
        // setTimeout(() => {
        //   navigate('/admin')
        // }, 1000)
      }
    } catch (error: any) {
      setError('Invalid email or password');
    }
    
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign in to your account
        </h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span className="font-medium">Error!</span> {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <span className="font-medium">Success!</span> {successMessage}
          </div>
        )}
        <form onSubmit={handleLoginSubmit} className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@flowbite.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Sign in</Button>
        </form>
        {/* <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Not registered?{' '}
          <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-500">
            Create an account
          </a>
        </p> */}
      </div>
    </section>
  );
};

export default LoginLayout;
