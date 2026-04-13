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
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
