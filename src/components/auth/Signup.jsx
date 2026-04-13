import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Building2, User, ShieldAlert, ArrowRight, Home } from 'lucide-react';

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
      return setError('Please tell us your name.');
    }
    if (!email || !password) {
      return setError('Please provide an email and password to secure your account.');
    }

    localStorage.setItem('user', JSON.stringify({ name, role: activeTab, email }));

    const path = activeTab === 'citizen' ? 'report-issue' : 'manage-complaints';
    navigate(`/dashboard/${path}`, { state: { role: activeTab } });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-stone-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-stone-900 p-2 rounded-lg">
              <Building2 className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-stone-900">ApleShahar</span>
          </Link>
          <Link to="/" className="text-stone-500 hover:text-stone-900 text-sm font-semibold flex items-center gap-2 transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden sm:block">Back to home</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-stone-900">Create an account</h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Already have an account?{' '}
            <Link to="/login" state={{ tab: activeTab }} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-stone-200">

            {/* Role Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-lg mb-8">
              <button
                onClick={() => { setActiveTab('citizen'); setError(''); }}
                className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'citizen'
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                    : 'text-stone-500 hover:text-stone-700'
                  }`}
              >
                <User className="w-4 h-4" /> Citizen
              </button>
              <button
                onClick={() => { setActiveTab('authority'); setError(''); }}
                className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'authority'
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                    : 'text-stone-500 hover:text-stone-700'
                  }`}
              >
                <ShieldAlert className="w-4 h-4" /> Authority
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSignup}>
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold leading-6 text-stone-900">Full name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 px-4 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="e.g. Alex Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold leading-6 text-stone-900">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 px-4 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="hello@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold leading-6 text-stone-900">Password</label>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 px-4 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center gap-2 rounded-lg bg-stone-900 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 transition-all"
                >
                  Create account <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
