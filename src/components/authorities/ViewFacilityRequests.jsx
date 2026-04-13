import React, { useState } from 'react';
import FacilityRequestDetails from '../FacilityRequestDetails';
import { Leaf } from 'lucide-react';

const ViewFacilityRequests = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ-01', type: 'park', description: 'New Public Park needed in Kothrud due to lack of green spaces.', location: 'Kothrud', status: 'Accepted', date: '2023-10-20' },
    { id: 'REQ-02', type: 'streetlight', description: 'Streetlights needed on Baner Pashan Link Road to make it safer for night walks.', location: 'Baner', status: 'Pending', date: '2023-10-21' }
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
    alert(`Thank you! The facility request was ${status.toLowerCase()}.`);
  };

  return (
    <div className="animate-fade-in-right">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600"><Leaf className="w-6 h-6"/></div>
        <div>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Grow the City</h2>
          <p className="text-stone-500 font-medium text-sm mt-1">Review community dreams and help bring them to life.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#faf9f6] border-b-2 border-stone-100 text-sm font-bold text-stone-400">
                <th className="p-5">Community Idea</th>
                <th className="p-5">Neighborhood</th>
                <th className="p-5">Status</th>
                <th className="p-5"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="p-5">
                    <p className="font-extrabold text-stone-800 text-base capitalize">{r.type} needed</p>
                    <p className="text-sm font-medium text-stone-400 mt-1"><span className="text-stone-300">{r.id}</span> • Dreamt on {r.date}</p>
                  </td>
                  <td className="p-5 text-sm font-semibold text-stone-700">{r.location}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full border 
                      ${r.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        r.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {r.status === 'Pending' ? 'Thinking about it' : r.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => {
                        setSelectedRequest(r);
                        setReason(r.reason || '');
                      }}
                      className="bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold text-sm px-4 py-2 rounded-xl transition-all"
                    >
                      Read More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="p-12 text-center text-stone-500 font-bold">No community ideas found yet.</div>
          )}
        </div>
      </div>

      <FacilityRequestDetails 
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        reason={reason}
        setReason={setReason}
        setActionType={setActionType}
        handleAction={handleAction}
      />
    </div>
  );
};

export default ViewFacilityRequests;
