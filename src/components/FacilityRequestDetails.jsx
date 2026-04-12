import React from 'react';
import { CheckSquare, XSquare } from 'lucide-react';

const FacilityRequestDetails = ({
  selectedRequest,
  setSelectedRequest,
  reason,
  setReason,
  setActionType,
  handleAction
}) => {
  if (!selectedRequest) return null;

  return (
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
  );
};

export default FacilityRequestDetails;
