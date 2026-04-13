import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { TrendingUp, CheckCircle, Leaf, MapPin, Building2, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const data = [
  { name: 'Jan', issues: 120, fixed: 80 },
  { name: 'Feb', issues: 150, fixed: 110 },
  { name: 'Mar', issues: 200, fixed: 180 },
  { name: 'Apr', issues: 170, fixed: 210 },
  { name: 'May', issues: 220, fixed: 250 },
  { name: 'Jun', issues: 140, fixed: 300 },
];

const Landing = () => {
  const [complaints] = useState([
    { id: 'C-101', status: 'Fixed', coordinates: [18.521, 73.856] },
    { id: 'C-102', status: 'Fixed', coordinates: [18.508, 73.808] },
    { id: 'C-103', status: 'Helping', coordinates: [18.568, 73.915] }
  ]);
  const [facilities] = useState([
    { id: 'REQ-01', type: 'park', description: 'A brand new playground and green space for families in Kothrud.', location: 'Kothrud', status: 'Accepted', date: 'Oct 20, 2023' }
  ]);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="border-b border-stone-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-stone-900 p-2 rounded-lg">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">ApleShahar</span>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <Link 
                to="/login" 
                className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
              >
                Log in <ArrowRight className="w-4 h-4"/>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-600 hidden sm:block">Welcome back, {user.name}</span>
                <Link 
                  to={user.role === 'citizen' ? '/dashboard/report-issue' : '/dashboard/manage-complaints'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4"/> Dashboard
                </Link>
                <button 
                  onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}
                  className="p-2.5 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Community built. Community led.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-stone-900 leading-[1.1] mb-6">
              The modern way to manage our city.
            </h1>
            <p className="text-lg md:text-xl text-stone-500 mb-10 leading-relaxed font-normal">
              A cleaner, safer, and smarter neighborhood starts here. Easily report local issues, propose new facilities, and collaborate directly with city authorities.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to={user ? (user.role === 'citizen' ? '/dashboard/report-issue' : '/dashboard/manage-complaints') : '/signup'}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-sm flex justify-center items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#impact" className="w-full sm:w-auto px-8 py-3.5 text-stone-600 hover:text-stone-900 font-semibold transition-colors flex justify-center items-center">
                See our impact
              </a>
            </div>
          </div>
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/50">
             <img
              src="https://thumbs.dreamstime.com/b/people-enjoying-their-time-gantry-plaza-state-park-long-island-city-ny-beautiful-bright-day-people-enjoying-their-time-266576132.jpg"
              alt="Community park"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex flex-col justify-end p-8">
              <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl w-fit flex items-center gap-4 shadow-lg border border-white/20">
                <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-green-600"/></div>
                <div>
                  <p className="text-sm font-bold text-stone-900">1,240 Issues Resolved</p>
                  <p className="text-xs font-medium text-stone-500">In the last 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Analytics Section */}
      <section id="impact" className="bg-stone-50 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 mb-4">Real results, in real time.</h2>
            <p className="text-stone-500 text-lg">Watch how community collaboration brings down active issues and improves the city infrastructure week over week.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-50 p-2.5 rounded-xl"><TrendingUp className="text-blue-600 w-5 h-5"/></div>
                <h3 className="text-lg font-bold text-stone-900">Resolution Trends</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" name="Reported" dataKey="issues" stroke="#94a3b8" strokeWidth={2} fill="url(#colorIssues)" />
                    <Area type="monotone" name="Resolved" dataKey="fixed" stroke="#2563eb" strokeWidth={2} fill="url(#colorFixed)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-emerald-50 p-2.5 rounded-xl"><MapPin className="text-emerald-600 w-5 h-5"/></div>
                <h3 className="text-lg font-bold text-stone-900">Active Work Zones</h3>
              </div>
              <div className="flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-stone-200">
                <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png" />
                  {complaints.filter(c => c.coordinates).map((c) => (
                    <CircleMarker
                      key={c.id}
                      center={c.coordinates}
                      radius={6}
                      pathOptions={{ 
                        color: c.status === 'Fixed' ? '#16a34a' : '#ea580c', 
                        fillColor: c.status === 'Fixed' ? '#16a34a' : '#ea580c', 
                        fillOpacity: 1, 
                        weight: 2,
                        color: 'white'
                      }}
                    />
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-8 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">Recently Completed Facilities</h2>
            <p className="text-stone-500 text-lg">See the new additions to our public spaces driven by citizens.</p>
          </div>
          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            Propose a facility <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div key={f.id} className="group border border-stone-200 hover:border-blue-200 rounded-3xl p-6 transition-all hover:shadow-lg hover:shadow-blue-900/5 bg-white">
              <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 text-stone-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xl text-stone-900 mb-2 capitalize">{f.type} in {f.location}</h4>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed bg-stone-50 px-4 py-3 rounded-xl border border-stone-100">{f.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-stone-400">Completed {f.date}</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold flex items-center gap-1 rounded-full border border-green-200">
                  <CheckCircle className="w-3 h-3"/> {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50 text-stone-500 py-12 text-center text-sm">
        <p className="font-medium">© {new Date().getFullYear()} ApleShahar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
