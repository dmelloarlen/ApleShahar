import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, PlusCircle, HeartHandshake, Leaf, ArrowRight, LogOut, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Update user state whenever the route changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const pathParts = location.pathname.split('/');
  const activeTab = pathParts[pathParts.length - 1];
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const navItemClass = (tabId) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-transparent whitespace-nowrap shrink-0 ${
      activeTab === tabId ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:border-stone-200'
    }`;

  const renderDashboardLinks = () => {
    if (!user) return null;
    if (user.role === 'citizen') {
      return (
        <>
          <Link to="/dashboard/report-issue" className={navItemClass('report-issue')}>
            <PlusCircle className="w-4 h-4" /> Report Issue
          </Link>
          <Link to="/dashboard/manage-complaints" className={navItemClass('manage-complaints')}>
            <HeartHandshake className="w-4 h-4" /> My Complaints
          </Link>
          <Link to="/dashboard/facility-requests" className={navItemClass('facility-requests')}>
            <Leaf className="w-4 h-4" /> Facility Requests
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/dashboard/manage-complaints" className={navItemClass('manage-complaints')}>
            <HeartHandshake className="w-4 h-4" /> Help Neighbors
          </Link>
          <Link to="/dashboard/facility-requests" className={navItemClass('facility-requests')}>
            <Leaf className="w-4 h-4" /> Grow the City
          </Link>
        </>
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
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
            {user && (
              <div className="hidden md:flex items-center gap-2 border-l border-stone-200 pl-8">
                {renderDashboardLinks()}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!user ? (
              isAuthPage ? (
                <Link to="/" className="text-stone-500 hover:text-stone-900 text-sm font-semibold flex items-center gap-2 transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:block">Back to home</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  Log in <ArrowRight className="w-4 h-4"/>
                </Link>
              )
            ) : (
              <>
                <div className="hidden md:flex flex-col text-right mr-2">
                  <span className="text-xs font-bold text-stone-900">{user.name}</span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {user.role === 'authority' ? 'Authority Portal' : 'Citizen Portal'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded-lg transition-all flex items-center gap-2"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-semibold hidden sm:block">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown for logged in users */}
      {user && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 flex gap-2 overflow-x-auto shadow-sm">
          {renderDashboardLinks()}
        </div>
      )}
    </>
  );
};

export default Navbar;
