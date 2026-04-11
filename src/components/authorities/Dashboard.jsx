import React, { useState } from 'react';
import { ShieldCheck, List, Megaphone, LogOut, Search, CheckSquare, XSquare, FileText, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComplaintsList = () => {
  // Static state for UI demonstration
  const [complaints, setComplaints] = useState([
    { id: 'C-101', title: 'Pothole on Main St', description: 'Large pothole causing traffic slowdowns and potential vehicle damage.', status: 'Resolved', contractor: 'BuildRight Corp', date: '2023-10-12', location: 'Main St & 4th Ave', verified: true, ward: 'W-01' },
    { id: 'C-102', title: 'Broken Streetlight', description: 'Streetlight has been flickering and is now completely off.', status: 'Resolved', contractor: null, date: '2023-10-15', location: 'Oakwood Dr', verified: true, ward: 'W-02' },
    { id: 'C-103', title: 'Flooded Pedestrian Walkway', description: 'Drainage seems blocked, causing severe flooding after rain.', status: 'In Progress', contractor: 'City Works Dept', date: '2023-10-18', location: 'River Road', verified: false, ward: 'W-03' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [contractorName, setContractorName] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const filteredComplaints = complaints.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    
    const payload = { status: newStatus || selectedComplaint.status, contractor: contractorName || selectedComplaint.contractor };
    setComplaints(complaints.map(c => c.id === selectedComplaint.id ? { ...c, ...payload } : c));
    setSelectedComplaint(null);
    setContractorName('');
    setNewStatus('');
    alert('Complaint successfully updated!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Complaints</h2>
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Search by ID or Title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
              <th className="p-4 font-semibold">ID & Issue</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Contractor</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-bold text-slate-800">{c.title}</p>
                  <p className="text-sm text-slate-500">{c.id} • {c.location}</p>
                </td>
                <td className="p-4 text-sm text-slate-600">{c.date}</td>
                <td className="p-4 text-sm text-slate-600">
                  {c.contractor ? c.contractor : <span className="text-slate-400 italic">Unassigned</span>}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                    ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                      c.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => {
                      setSelectedComplaint(c);
                      setContractorName(c.contractor || '');
                      setNewStatus(c.status);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredComplaints.length === 0 && (
          <div className="p-8 text-center text-slate-500">No complaints found.</div>
        )}
      </div>

      {/* Management Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Update Complaint {selectedComplaint.id}</h3>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleUpdate} className="p-6">
              <div className="mb-4">
                <p className="font-bold text-slate-800 mb-1">{selectedComplaint.title}</p>
                <p className="text-sm text-slate-500 mb-4">{selectedComplaint.description}</p>
                {selectedComplaint.photo && (
                  <img src={selectedComplaint.photo} alt="Issue evidence" className="mt-2 rounded-xl max-h-48 object-cover w-full shadow-sm border border-slate-200" />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Assign Contractor</label>
                <input 
                  type="text" 
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  placeholder="e.g. Acme Construction" 
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Update Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setSelectedComplaint(null)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const RegisterFacility = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('New public facility registered successfully! It will now appear on the landing page.');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Register a New Facility</h2>
      <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl mb-6 text-indigo-800 text-sm">
        <strong>Note:</strong> Facilities registered here will be broadcasted to the public Landing Page under "Newly Added Facilities".
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Facility Name</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g. New Downtown Public Library" required />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g. 123 Main St, Central District" required />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Details & Assets</label>
          <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Describe the specifics of the new infrastructure..."></textarea>
        </div>

        <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition flex items-center justify-center gap-2">
          <Megaphone className="w-5 h-5" /> Announce Facility
        </button>
      </form>
    </div>
  );
};

const FacilityRequestsList = () => {
  // Static state for UI demonstration
  const [requests, setRequests] = useState([
    { id: 'REQ-01', type: 'park', description: 'New Public Park needed in Kothrud due to lack of green spaces.', location: 'Kothrud', status: 'Accepted', date: '2023-10-20' },
    { id: 'REQ-02', type: 'streetlight', description: 'Streetlights needed on Baner Pashan Link Road.', location: 'Baner', status: 'Pending', date: '2023-10-21' }
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reason, setReason] = useState('');
  const [actionType, setActionType] = useState('');

  const handleAction = (e) => {
    e.preventDefault();
    if (!selectedRequest || !actionType) return;
    
    const status = actionType === 'Accept' ? 'Accepted' : 'Rejected';
    setRequests(requests.map(r => r.id === selectedRequest.id ? { ...r, status, reason } : r));
    setSelectedRequest(null);
    setReason('');
    setActionType('');
    alert(`Facility requested ${status} successfully!`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Facility Requests Review</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
              <th className="p-4 font-semibold">Request ID & Type</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-bold text-slate-800 capitalize">{r.type}</p>
                  <p className="text-sm text-slate-500">{r.id} • {r.date}</p>
                </td>
                <td className="p-4 text-sm text-slate-600">{r.location}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                    ${r.status === 'Accepted' ? 'bg-green-100 text-green-700' : 
                      r.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => {
                      setSelectedRequest(r);
                      setReason(r.reason || '');
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="p-8 text-center text-slate-500">No facility requests found.</div>
        )}
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Review Request {selectedRequest.id}</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleAction} className="p-6">
              <div className="mb-4">
                <p className="font-bold text-slate-800 mb-1 capitalize">{selectedRequest.type} at {selectedRequest.location}</p>
                <p className="text-sm text-slate-500 mb-4">{selectedRequest.description}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Decision</label>
                <textarea 
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  placeholder="Provide a reason..." 
                  required
                ></textarea>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-4">
                <button 
                  type="submit" 
                  onClick={() => setActionType('Reject')}
                  className="px-5 py-2 font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition border border-red-200 flex items-center gap-2"
                >
                  <XSquare className="w-4 h-4" /> Reject
                </button>
                <button 
                  type="submit" 
                  onClick={() => setActionType('Accept')}
                  className="px-5 py-2 font-medium bg-green-600 text-white hover:bg-green-700 rounded-lg transition flex items-center gap-2"
                >
                  <CheckSquare className="w-4 h-4" /> Accept
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('complaints');

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar - Dark theme for Authority */}
      <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <ShieldCheck className="text-indigo-500 w-8 h-8" />
          <h1 className="text-xl font-bold text-white">Gov Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">
            <Home className="w-5 h-5" /> Home
          </Link>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'complaints' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <List className="w-5 h-5" /> Manage Complaints
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> Facility Requests
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Megaphone className="w-5 h-5" /> Register Facility
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-red-900/30 text-red-400 hover:text-red-300 transition">
            <LogOut className="w-5 h-5" /> Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-slate-900 text-white p-4 rounded-xl shadow-sm border border-slate-700">
          <span className="font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400"/> Gov Portal</span>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="border-none bg-slate-800 text-white font-medium py-2 px-3 rounded-lg outline-none"
          >
            <option value="complaints">Manage Complaints</option>
            <option value="requests">Facility Requests</option>
            <option value="register">Register Facility</option>
          </select>
        </div>

        {activeTab === 'complaints' && <ComplaintsList />}
        {activeTab === 'requests' && <FacilityRequestsList />}
        {activeTab === 'register' && <RegisterFacility />}
      </main>
    </div>
  );
};

export default Dashboard;
