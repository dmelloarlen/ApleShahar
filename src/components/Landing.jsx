import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, User, ShieldAlert, CheckCircle, TrendingUp, Building2, Menu, X, LayoutDashboard } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const data = [
  { name: 'Jan', complaints: 400, resolved: 240 },
  { name: 'Feb', complaints: 300, resolved: 139 },
  { name: 'Mar', complaints: 200, resolved: 980 },
  { name: 'Apr', complaints: 278, resolved: 390 },
  { name: 'May', complaints: 189, resolved: 480 },
  { name: 'Jun', complaints: 239, resolved: 380 },
];

const Landing= () => {
  // Static state for UI demonstration
  const [complaints] = useState([
    { id: 'C-101', status: 'Resolved', coordinates: [18.521, 73.856] },
    { id: 'C-102', status: 'Resolved', coordinates: [18.508, 73.808] },
    { id: 'C-103', status: 'In Progress', coordinates: [18.568, 73.915] }
  ]);
  const [facilities] = useState([
    { id: 'REQ-01', type: 'park', description: 'New Public Park needed in Kothrud due to lack of green spaces.', location: 'Kothrud', status: 'Accepted', date: '2023-10-20' }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = null; // Statically null for purely UI demo

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 sm:px-12 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <Building2 className="text-indigo-600 w-8 h-8" />
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">ApleShahar</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Slide-out Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-fade-in-right">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Account Access</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
              {!user ? (
                <>
                  <p className="text-slate-500 mb-4">Please select your portal to log in.</p>
                  <Link to="/login" state={{ tab: 'citizen' }} className="group block bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
                    <User className="w-10 h-10 mb-4 text-blue-100" />
                    <h3 className="text-xl font-bold mb-2">Citizen Portal</h3>
                    <p className="text-blue-100 text-sm">Report issues, track status, and request facilities.</p>
                  </Link>

                  <Link to="/login" state={{ tab: 'authority' }} className="group block bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition mt-4">
                    <ShieldAlert className="w-10 h-10 mb-4 text-slate-300" />
                    <h3 className="text-xl font-bold mb-2">Gov Authority</h3>
                    <p className="text-slate-300 text-sm">Review complaints, manage contractors, and approve requests.</p>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center mt-10">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                    <User className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Welcome back, {user.name}</h3>
                  <p className="text-slate-500 capitalize mb-8">{user.role} Account</p>
                  
                  <Link 
                    to={user.role === 'citizen' ? '/user' : '/authority'} 
                    className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex justify-center items-center gap-2 mb-4"
                  >
                    <LayoutDashboard className="w-5 h-5" /> Go to Dashboard
                  </Link>
                  <button 
                    onClick={() => {}}
                    className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-center hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center justify-center border-b border-slate-800">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12 relative z-10 w-full py-20">
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-sm font-semibold mb-6 shadow-inner">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Live Smart City Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              ApleShahar <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Infrastructure.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
              Empowering citizens to report, track, and verify public infrastructure issues while helping authorities respond at lightning speed.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <button onClick={() => setIsSidebarOpen(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-blue-400/50">
                Access Portal
              </button>
              <a href="#stats" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-300 border border-slate-700 hover:bg-slate-800 transition-all hover:text-white text-center flex items-center justify-center">
                Explore Analytics
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000 mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-[2.5rem] blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative rounded-[2.5rem] p-2 bg-gradient-to-br from-slate-800/80 to-slate-900 overflow-hidden shadow-2xl border border-slate-700/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80" alt="Beautiful Smart City View" className="rounded-3xl object-cover h-[450px] w-full shadow-inner" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Visualizations */}
      <div id="stats" className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Infrastructure Health at a Glance</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-500" />
              Complaints vs Resolved
            </h3>
            <div className="w-full" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="complaints" stroke="#ef4444" fillOpacity={1} fill="url(#colorComplaints)" />
                  <Area type="monotone" dataKey="resolved" stroke="#22c55e" fillOpacity={1} fill="url(#colorResolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden flex flex-col items-center h-full min-h-[350px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 self-start absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg">
              <MapPin className="text-red-500" />
              Live Issue Density Heatmap
            </h3>
            
            <div className="w-full h-full mt-12 rounded-xl overflow-hidden relative z-0 min-h-[250px]">
              <MapContainer center={[18.5204, 73.8567]} zoom={11} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {complaints.filter(c => c.coordinates).map((c) => (
                  <CircleMarker 
                    key={c.id} 
                    center={c.coordinates} 
                    radius={20} 
                    pathOptions={{ color: c.status === 'Resolved' ? '#22c55e' : '#ef4444', fillColor: c.status === 'Resolved' ? '#22c55e' : '#ef4444', fillOpacity: 0.5, stroke: false }} 
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Facilities */}
      <div className="bg-indigo-50/50 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Building2 className="text-indigo-600" />
                Newly Added Facilities
              </h2>
              <p className="text-slate-500 mt-2">Latest infrastructure improvements in your area.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.length > 0 ? facilities.map((facility) => (
              <div key={facility.id} className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-600" />
                </div>
                <h4 className="font-bold text-lg capitalize">{facility.type} Request Approved</h4>
                <p className="text-slate-500 text-sm mt-1">{facility.location} - {facility.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  Announced {facility.date}
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
                No recently approved facilities yet. Stay tuned!
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Landing;
