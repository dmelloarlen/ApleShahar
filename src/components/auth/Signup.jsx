import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, User } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name) {
      return setError('Name is required for Sign Up.');
    }
    if (!email || !password) {
      return setError('Please provide your email and password.');
    }

    // No backend database logic. Static UI route transition.
    navigate('/dashboard', { state: { role: activeTab } });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-slate-100 overflow-hidden relative z-10 animate-fade-in-right">
        <div className="text-center py-10 px-6 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20"></div>
          <h1 className="text-4xl font-extrabold mb-2 relative z-10 tracking-tight">ApleShahar</h1>
          <p className="text-slate-300 relative z-10 font-medium">Create your account</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('citizen'); setError(''); }}
            className={`flex-1 py-4 font-bold flex justify-center items-center gap-2 transition ${activeTab === 'citizen' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <User className="w-5 h-5" /> Citizen
          </button>
          <button
            onClick={() => { setActiveTab('authority'); setError(''); }}
            className={`flex-1 py-4 font-bold flex justify-center items-center gap-2 transition ${activeTab === 'authority' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ShieldAlert className="w-5 h-5" /> Authority
          </button>
        </div>

        <div className="p-8">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}
          
          <form onSubmit={handleSignup}>
            <div className="mb-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="Enter your full name" 
                required
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="Enter your email" 
                required 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="Enter your password" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className={`w-full font-bold py-3 rounded-xl text-white transition shadow-lg ${activeTab === 'citizen' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-900/20'}`}
            >
              Create Account
            </button>

            <div className="mt-6 text-center text-sm text-slate-600 font-medium">
              Already have an account?
              <Link to="/login" state={{ tab: activeTab }} className="ml-2 text-blue-600 hover:text-blue-800 transition">
                Sign In instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
