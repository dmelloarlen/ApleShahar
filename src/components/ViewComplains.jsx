import React, { useState } from 'react';
import { Search, HeartHandshake } from 'lucide-react';

const ViewComplains = () => {
  const [complaints, setComplaints] = useState([
    { id: 'C-101', title: 'Pothole on Main St', description: 'Large pothole causing traffic slowdowns and potential vehicle damage.', status: 'Fixed', contractor: 'City Works Team', date: '2023-10-12', location: 'Main St & 4th Ave', verified: true, ward: 'W-01' },
    { id: 'C-102', title: 'Broken Streetlight', description: 'Streetlight has been flickering and is now completely off.', status: 'Fixed', contractor: null, date: '2023-10-15', location: 'Oakwood Dr', verified: true, ward: 'W-02' },
    { id: 'C-103', title: 'Flooded Pedestrian Walkway', description: 'Drainage seems blocked, causing severe flooding after rain.', status: 'Helping', contractor: 'Neighborhood Squad', date: '2023-10-18', location: 'River Road', verified: false, ward: 'W-03' }
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
    alert('Thank you for helping out! Status updated.');
  };

  return (
    <div className="animate-fade-in-right">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600"><HeartHandshake className="w-6 h-6" /></div>
          <div>
            <h2 className="text-3xl font-black text-stone-800 tracking-tight">Help Neighbors</h2>
            <p className="text-stone-500 font-medium text-sm mt-1">Review neighborhood issues and organize help.</p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by ID or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3 bg-white border-2 border-stone-100 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-300 focus:outline-none transition-all placeholder:text-stone-300 font-medium text-stone-700 shadow-sm"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#faf9f6] border-b-2 border-stone-100 text-sm font-bold text-stone-400">
                <th className="p-5">Issue Details</th>
                <th className="p-5">Reported On</th>
                <th className="p-5">Who's Helping?</th>
                <th className="p-5">Current Status</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-extrabold text-stone-800 text-base">{c.title}</p>
                    <p className="text-sm font-medium text-stone-400 mt-1"><span className="text-stone-300">{c.id}</span> • {c.location}</p>
                  </td>
                  <td className="p-5 text-sm font-semibold text-stone-500">{c.date}</td>
                  <td className="p-5 text-sm font-semibold text-stone-500">
                    {c.contractor ? c.contractor : <span className="text-stone-300 italic">No one yet</span>}
                  </td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full border 
                      ${c.status === 'Fixed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        c.status === 'Helping' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setContractorName(c.contractor || '');
                        setNewStatus(c.status);
                      }}
                      className="bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-600 font-bold text-sm px-4 py-2 rounded-xl transition-all"
                    >
                      Assist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComplaints.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-stone-300" />
              </div>
              <p className="text-stone-500 font-bold">No issues found.</p>
              <p className="text-stone-400 text-sm mt-1">Try searching for something else.</p>
            </div>
          )}
        </div>
      </div>

      {/* Soft Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-fade-in-right">
            <div className="p-8 pb-4 flex justify-between items-center relative z-10">
              <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg text-xs font-bold mb-2 inline-block">Update Required</div>
              <button onClick={() => setSelectedComplaint(null)} className="w-8 h-8 flex items-center justify-center bg-stone-100 rounded-full text-stone-400 hover:bg-stone-200 hover:text-stone-600 transition-colors shrink-0 -mt-8 -mr-2">&times;</button>
            </div>
            <form onSubmit={handleUpdate} className="p-8 pt-0">
              <h3 className="text-2xl font-black text-stone-800 mb-2">{selectedComplaint.title}</h3>
              <p className="text-sm font-medium text-stone-500 mb-6 leading-relaxed bg-stone-50 p-4 rounded-2xl">{selectedComplaint.description}</p>

              {selectedComplaint.photo && (
                <img src={selectedComplaint.photo} alt="Issue evidence" className="mb-6 rounded-2xl max-h-48 object-cover w-full shadow-sm border border-stone-100" />
              )}

              <div className="mb-5">
                <label className="block text-sm font-bold text-stone-600 mb-2 pl-2">Who's going to fix this?</label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-stone-100 bg-stone-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-300 focus:outline-none transition-all placeholder:text-stone-300 font-medium"
                  placeholder="e.g. Local Handy Team"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-stone-600 mb-2 pl-2">Current Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-stone-100 bg-stone-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-100 focus:border-amber-300 focus:outline-none transition-all font-medium text-stone-700 cursor-pointer"
                >
                  <option value="Just Reported">Just Reported</option>
                  <option value="Helping">Helping out</option>
                  <option value="Fixed">All Fixed!</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
                <button type="button" onClick={() => setSelectedComplaint(null)} className="w-full sm:w-auto px-6 py-3 font-bold text-stone-500 hover:bg-stone-100 rounded-2xl transition-all">
                  Not now
                </button>
                <button type="submit" className="w-full sm:w-auto px-8 py-3 font-black bg-amber-500 text-stone-900 hover:bg-amber-600 rounded-2xl transition-all shadow-lg shadow-amber-200 hover:-translate-y-1">
                  Save Good Work
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
