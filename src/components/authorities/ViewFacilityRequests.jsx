import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FacilityRequestDetails from '../FacilityRequestDetails';

const ViewFacilityRequests = () => {
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
        <h2 className="text-3xl font-bold mb-6">Facility Requests Review</h2>
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
