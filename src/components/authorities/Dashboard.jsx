import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, List, LogOut, Home, PlusCircle, FileText } from 'lucide-react';

import ViewComplains from '../ViewComplains';
import ViewFacilityRequests from './ViewFacilityRequests';

import ReportComplainDetails from '../ReportComplainDetails';

const Dashboard = () => {
  const location = useLocation();
  const role = location.state?.role || 'citizen';
  
  // Default tabs based on role
  const [activeTab, setActiveTab] = useState(role === 'citizen' ? 'report-issue' : 'manage-complaints');

  const handleLogout = () => {
    // Just static UI. Route to home.
  };

  // -------------------------
  // AUTHORITY SIDEBAR
  // -------------------------
  const renderAuthoritySidebar = () => (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col hidden md:flex min-h-screen">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
        <ShieldCheck className="text-indigo-500 w-8 h-8" />
        <h1 className="text-xl font-bold text-white">Gov Portal</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">
          <Home className="w-5 h-5" /> Home
        </Link>
        <button 
          onClick={() => setActiveTab('manage-complaints')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'manage-complaints' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <List className="w-5 h-5" /> Manage Complaints
        </button>
        <button 
          onClick={() => setActiveTab('facility-requests')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'facility-requests' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white'}`}
        >
          <FileText className="w-5 h-5" /> Facility Requests
        </button>
      </nav>
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <Link to="/" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-red-900/30 text-red-500 hover:text-red-400 transition">
          <LogOut className="w-5 h-5" /> Log Out
        </Link>
      </div>
    </aside>
  );

  // -------------------------
  // CITIZEN SIDEBAR
  // -------------------------
  const renderCitizenSidebar = () => (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex min-h-screen">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white"><Home className="w-4 h-4"/></div>
          Citizen Portal
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 bg-white">
        <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition">
          <Home className="w-5 h-5 text-slate-400" /> Home
        </Link>
        <button 
          onClick={() => setActiveTab('report-issue')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'report-issue' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <PlusCircle className={`w-5 h-5 ${activeTab === 'report-issue' ? 'text-blue-600' : 'text-slate-400'}`} /> Report Issue
        </button>
      </nav>
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <Link to="/" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition">
          <LogOut className="w-5 h-5" /> Log Out
        </Link>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen flex ${role === 'authority' ? 'bg-slate-100' : 'bg-slate-50'}`}>
      
      {role === 'authority' ? renderAuthoritySidebar() : renderCitizenSidebar()}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto w-full">
        
        {/* Mobile Header Authority */}
        {role === 'authority' && (
          <div className="md:hidden flex justify-between items-center mb-6 bg-slate-900 text-white p-4 rounded-xl shadow-sm border border-slate-700">
            <span className="font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400"/> Gov Portal</span>
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="border-none bg-slate-800 text-white font-medium py-2 px-3 rounded-lg outline-none max-w-[150px]"
            >
              <option value="manage-complaints">Manage Complaints</option>
              <option value="facility-requests">Facility Requests</option>
            </select>
          </div>
        )}

        {/* Mobile Header Citizen */}
        {role === 'citizen' && (
          <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <span className="font-bold text-lg">Citizen Portal</span>
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="border-none bg-slate-50 font-medium py-2 px-3 rounded-lg outline-none text-slate-700"
            >
              <option value="report-issue">Report Issue</option>
            </select>
          </div>
        )}

        {/* RENDER CONTENT BASED ON TAB */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'manage-complaints' && <ViewComplains />}
          {activeTab === 'facility-requests' && <ViewFacilityRequests />}

          {activeTab === 'report-issue' && <ReportComplainDetails />}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
