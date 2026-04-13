import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate, Outlet } from 'react-router-dom';
import { ShieldCheck, LogOut, Home, PlusCircle, Leaf, HeartHandshake, Building2 } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Role can come from state or be default 
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const role = location.state?.role || (user ? user.role : 'citizen');
  // Figure out the active tab from URL path
  const pathParts = location.pathname.split('/');
  const activeTab = pathParts[pathParts.length - 1];

  // If we just hit /dashboard without a child route, redirect based on role
  useEffect(() => {
    if (activeTab === 'dashboard') {
      if (role === 'citizen') {
        navigate('/dashboard/report-issue', { replace: true, state: { role } });
      } else {
        navigate('/dashboard/manage-complaints', { replace: true, state: { role } });
      }
    }
  }, [activeTab, navigate, role]);

  const handleLogout = () => {
    localStorage.removeItem('user');
  };
  
  const handleTabChange = (tabId) => {
    navigate(`/dashboard/${tabId}`, { state: { role } });
  };

  const navItemClass = (tabId) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-transparent ${
      activeTab === tabId ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:border-stone-200'
    }`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-stone-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-stone-900 p-2 rounded-lg">
                <Building2 className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-900 hidden sm:block">ApleShahar</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2 border-l border-stone-200 pl-8">
              {role === 'citizen' ? (
                <>
                  <button onClick={() => handleTabChange('report-issue')} className={navItemClass('report-issue')}>
                    <PlusCircle className="w-4 h-4" /> Report Issue
                  </button>
                  <button onClick={() => handleTabChange('manage-complaints')} className={navItemClass('manage-complaints')}>
                    <HeartHandshake className="w-4 h-4" /> My Complaints
                  </button>
                  <button onClick={() => handleTabChange('facility-requests')} className={navItemClass('facility-requests')}>
                    <Leaf className="w-4 h-4" /> Facility Requests
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleTabChange('manage-complaints')} className={navItemClass('manage-complaints')}>
                    <HeartHandshake className="w-4 h-4" /> Help Neighbors
                  </button>
                  <button onClick={() => handleTabChange('facility-requests')} className={navItemClass('facility-requests')}>
                    <Leaf className="w-4 h-4" /> Grow the City
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right mr-2">
              <span className="text-xs font-bold text-stone-900">{user ? user.name : 'User'}</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                {role === 'authority' ? 'Authority Portal' : 'Citizen Portal'}
              </span>
            </div>
            <Link 
              to="/" 
              onClick={handleLogout} 
              className="px-4 py-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded-lg transition-all flex items-center gap-2"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold hidden sm:block">Logout</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 flex gap-2 overflow-x-auto shadow-sm">
        {role === 'citizen' ? (
          <>
            <button onClick={() => handleTabChange('report-issue')} className={'whitespace-nowrap shrink-0 ' + navItemClass('report-issue')}>
              <PlusCircle className="w-4 h-4" /> Report Issue
            </button>
            <button onClick={() => handleTabChange('manage-complaints')} className={'whitespace-nowrap shrink-0 ' + navItemClass('manage-complaints')}>
              <HeartHandshake className="w-4 h-4" /> My Complaints
            </button>
            <button onClick={() => handleTabChange('facility-requests')} className={'whitespace-nowrap shrink-0 ' + navItemClass('facility-requests')}>
              <Leaf className="w-4 h-4" /> Facility Requests
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleTabChange('manage-complaints')} className={'whitespace-nowrap shrink-0 ' + navItemClass('manage-complaints')}>
              <HeartHandshake className="w-4 h-4" /> Help Neighbors
            </button>
            <button onClick={() => handleTabChange('facility-requests')} className={'whitespace-nowrap shrink-0 ' + navItemClass('facility-requests')}>
              <Leaf className="w-4 h-4" /> Grow the City
            </button>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
