import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewComplains = () => {
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
          <h2 className="text-3xl font-bold">Manage Complaints</h2>
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

        {/* Read Complaint Details Modal embedded here */}
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

export default ViewComplains;
