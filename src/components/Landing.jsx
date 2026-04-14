import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { TrendingUp, CheckCircle, Leaf, MapPin, Building2, ArrowRight, LogOut, LayoutDashboard, AlertCircle, Zap, Users, Clock, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Trusted by 50K+ citizens
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Your voice shapes our city
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Report issues, propose facilities, and see real changes happen. Direct communication with city authorities means faster solutions for our community.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link 
                to={user ? (user.role === 'citizen' ? '/dashboard/report-issue' : '/dashboard/manage-complaints') : '/signup'}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
              >
                Start Contributing <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-3.5 text-slate-600 hover:text-slate-900 font-semibold transition-colors border border-slate-300 rounded-lg hover:border-slate-400 flex justify-center items-center">
                Learn More
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-slate-900">48K+</div>
                <div className="text-slate-600">Issues Resolved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">1.2K</div>
                <div className="text-slate-600">New Facilities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">95%</div>
                <div className="text-slate-600">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80"
              alt="Community park"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600"/></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Last week: 156 issues resolved</p>
                  <p className="text-xs text-slate-500">In 14 wards across the city</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-slate-200 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Three simple steps to make your community better</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-slate-500">Step 1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Report an Issue</h3>
              <p className="text-slate-600">Spot a pothole, broken streetlight, or garbage dump? Take a photo and report it instantly. Your location is automatically tracked.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-slate-500">Step 2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Track Progress</h3>
              <p className="text-slate-600">Get real-time updates as authorities assess and work on your report. See exactly what's being done to fix the problem.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-slate-500">Step 3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">See Results</h3>
              <p className="text-slate-600">Celebrate when issues are resolved and before/after photos are shared. Your contribution made the difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Real Impact. Real Numbers.</h2>
            <p className="text-lg text-slate-600 mb-8">Our community is driving tangible changes across the city. Here's the proof:</p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">48,000+ Issues Resolved</h4>
                  <p className="text-slate-600 text-sm">Across all sectors - roads, utilities, sanitation, and more</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">50,000+ Active Citizens</h4>
                  <p className="text-slate-600 text-sm">Contributing daily to make the city better</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Avg 72 Hour Response</h4>
                  <p className="text-slate-600 text-sm">Authority teams are committed to quick turnaround</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-50 p-2.5 rounded-lg"><TrendingUp className="text-indigo-600 w-5 h-5"/></div>
              <h3 className="text-lg font-bold text-slate-900">6-Month Trends</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c7d2e0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c7d2e0" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" name="Reported" dataKey="issues" stroke="#94a3b8" strokeWidth={2} fill="url(#colorIssues)" />
                  <Area type="monotone" name="Resolved" dataKey="fixed" stroke="#4f46e5" strokeWidth={2} fill="url(#colorFixed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Active Work Zones</h2>
            <p className="text-lg text-slate-600">See where improvements are happening right now</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200">
              <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png" />
                {complaints.filter(c => c.coordinates).map((c) => (
                  <CircleMarker
                    key={c.id}
                    center={c.coordinates}
                    radius={7}
                    pathOptions={{ 
                      color: c.status === 'Fixed' ? '#16a34a' : '#f97316', 
                      fillColor: c.status === 'Fixed' ? '#16a34a' : '#f97316', 
                      fillOpacity: 0.8, 
                      weight: 2,
                      color: 'white'
                    }}
                  />
                ))}
              </MapContainer>
            </div>
            <div className="mt-6 flex gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-slate-600">Resolved (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-slate-600">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Facilities */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Recently Added Facilities</h2>
            <p className="text-slate-600">New parks, playgrounds, and public spaces built from your ideas</p>
          </div>
          <Link to={user ? "/signup" : "/signup"} className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2 whitespace-nowrap">
            Suggest a facility <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div key={f.id} className="group border border-slate-200 hover:border-indigo-200 rounded-xl p-6 transition-all hover:shadow-lg bg-white">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2 capitalize">{f.type} in {f.location}</h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{f.description}</p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-500">Completed: {f.date}</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                  {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
