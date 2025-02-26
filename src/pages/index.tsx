import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (username === '12345' && password === '12345') {
      console.log('Login successful - Redirecting to Student Dashboard');
      localStorage.setItem('authUser', username);
      router.push('/Student_dashboard');
    } else if (username === 'prof' && password === 'prof') {
      console.log('Login successful - Redirecting to Professor Dashboard');
      localStorage.setItem('authUser', username);
      router.push('/Prof_dashboard');
    } else {
      console.error('Invalid login attempt');
      setError('Invalid username or password');
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Side - Image/Info */}
      <div className="w-1/2 flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#4DC0B5' }}>
        <h1 className="text-4xl font-bold">LEARNING</h1>
        <p className="mt-4 text-lg">Thousands of instant online classes/tutorials included</p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-800 text-white">
        <div className="bg-gray-900 p-8 rounded-lg w-96">
          {/* Tabs */}
          <div className="flex justify-between mb-6">
            <button 
              className={`text-lg font-semibold ${!isSignup ? 'border-b-2 border-white' : 'text-gray-500'}`} 
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
            <button 
              className={`text-lg font-semibold ${isSignup ? 'border-b-2 border-white' : 'text-gray-500'}`} 
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          {!isSignup ? (
            <form onSubmit={handleLogin}>
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <div className="mb-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email or Username"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-teal-400 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-teal-400 outline-none"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" className="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-500 transition">
                Login
              </button>
              <p className="text-sm mt-4 text-teal-300 text-center cursor-pointer">Forgot your password?</p>
            </form>
          ) : (
            <p className="text-center text-gray-400">Sign-up feature coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
