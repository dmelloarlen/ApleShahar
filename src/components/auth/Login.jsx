import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Building2, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email) return 'Please provide your email address.';
    if (!formData.password) return 'Please provide your password.';
    return null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      return setError(validationError);
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    console.log('Login Data:', userData);
    
    // Auto-detect role based on email
    const detectedRole = formData.email.includes('guide') || formData.email.includes('admin') ? 'authority' : 'citizen';
    localStorage.setItem('user', JSON.stringify({ name: formData.email.split('@')[0], role: detectedRole, email: formData.email }));

    const path = detectedRole === 'citizen' ? 'report-issue' : 'manage-complaints';
    navigate(`/dashboard/${path}`, { state: { role: detectedRole } });
  };

  const autofill = () => {
    setFormData({
      email: 'neighbor@apleshahar.in',
      password: 'password',
    });
  };

  return (
    <div className="min-h-scree bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-2 text-center text-4xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
        <p className="mt-3 text-center text-sm text-slate-600 leading-relaxed">
          Sign in to access your account and manage services
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-white/50 rounded-2xl">
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Error Alert */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 rounded-lg flex gap-3 animate-in fade-in slide-in-from-top">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Email address</label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 text-slate-900 bg-white rounded-lg border border-slate-300 shadow-sm ring-0 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 sm:text-sm"
                  placeholder="hello@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 text-slate-900 bg-white rounded-lg border border-slate-300 shadow-sm ring-0 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Demo credentials link */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={autofill}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Use demo credentials
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 cursor-pointer active:scale-95"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer text */}
          <p className="text-xs text-center text-slate-500 mt-6">
            Secure login with encrypted connection
          </p>
          
        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
            Create one
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
