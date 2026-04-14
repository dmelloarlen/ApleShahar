import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'complaintsData';

const loadStoredComplaints = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const saveStoredComplaints = (complaints) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
};

const sampleImage = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80';

export default function ManageComplain() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }, []);

  const isCitizen = user?.role === 'citizen';
  const [complaint, setComplaint] = useState(null);
  const [contractorName, setContractorName] = useState('');
  const [status, setStatus] = useState('Just Reported');
  const [resolvedDescription, setResolvedDescription] = useState('');
  const [resolvedPhoto, setResolvedPhoto] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const stateComplaint = location.state?.complaint;
    const queryId = new URLSearchParams(location.search).get('id');
    const stored = loadStoredComplaints();

    if (stateComplaint) {
      setComplaint(stateComplaint);
      setContractorName(stateComplaint.contractor || '');
      setStatus(stateComplaint.status || 'Just Reported');
      setResolvedDescription(stateComplaint.resolvedDescription || '');
      setResolvedPhoto(stateComplaint.resolvedPhoto || null);
      return;
    }

    if (stored && queryId) {
      const found = stored.find((item) => item.id === queryId);
      if (found) {
        setComplaint(found);
        setContractorName(found.contractor || '');
        setStatus(found.status || 'Just Reported');
        setResolvedDescription(found.resolvedDescription || '');
        setResolvedPhoto(found.resolvedPhoto || null);
        return;
      }
    }

    if (stored && stored.length > 0) {
      const fallback = stored[0];
      setComplaint(fallback);
      setContractorName(fallback.contractor || '');
      setStatus(fallback.status || 'Just Reported');
      setResolvedDescription(fallback.resolvedDescription || '');
      setResolvedPhoto(fallback.resolvedPhoto || null);
    }
  }, [location.state, location.search]);

  const handleResolvedPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setResolvedPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!complaint) return;

    const updates = {
      contractor: contractorName || complaint.contractor,
      status,
      resolvedDescription,
      resolvedPhoto
    };

    const complaints = loadStoredComplaints() || [];
    const updatedList = complaints.map((item) =>
      item.id === complaint.id ? { ...item, ...updates } : item
    );

    saveStoredComplaints(updatedList);
    setComplaint((prev) => (prev ? { ...prev, ...updates } : prev));
    setSavedMessage('Changes saved successfully.');
  };

  const handleCitizenAction = (action) => {
    if (!complaint) return;
    const nextStatus = action === 'resolve' ? 'Satisfied' : action === 'revoke' ? 'Revoked' : 'Reopened';
    const complaints = loadStoredComplaints() || [];
    const updatedList = complaints.map((item) =>
      item.id === complaint.id ? { ...item, status: nextStatus } : item
    );

    saveStoredComplaints(updatedList);
    setComplaint((prev) => (prev ? { ...prev, status: nextStatus } : prev));
    setStatus(nextStatus);
    setSavedMessage(`Complaint marked ${nextStatus}.`);
  };

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
          <p className="text-lg font-semibold text-slate-900">No complaint available</p>
          <p className="mt-3 text-sm text-slate-500">Select a report from the list to manage it.</p>
          <button
            type="button"
            onClick={() => navigate('/manage-complaints')}
            className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" /> Back to reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Manage report</p>
            <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{complaint.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Handle this complaint with a focused authority workflow. Update status, assign contractors, and attach resolution evidence in one place.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/manage-complaints')}
            className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all reports
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">{complaint.status}</div>
                  <p className="text-sm text-slate-500">{complaint.location} • {complaint.date}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Report ID</p>
                    <p className="mt-2 font-semibold text-slate-900">{complaint.id}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Ward</p>
                    <p className="mt-2 font-semibold text-slate-900">{complaint.ward}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Category</p>
                    <p className="mt-2 font-semibold text-slate-900">{complaint.location.split(' ')[0] || 'General'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.85fr]">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Issue summary</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{complaint.description}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Location</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{complaint.location}</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                  <img
                    src={complaint.photo || sampleImage}
                    alt="Complaint evidence"
                    className="h-full w-full object-cover"
                  />
                  <div className="bg-slate-50 px-5 py-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">{complaint.photo ? 'Attached evidence' : 'Sample evidence preview'}</p>
                    <p className="mt-1 text-slate-600">Upload a resolution photo for the task when the issue is fixed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-semibold">Recent update</p>
                  <p className="text-sm text-slate-500">This page keeps all details focused for a clear decision.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Assigned team</p>
                  <p className="mt-3 font-semibold text-slate-900">{complaint.contractor || 'Unassigned'}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current status</p>
                  <p className="mt-3 font-semibold text-slate-900">{complaint.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Action center</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">Take action</h2>
                </div>
                <ShieldCheck className="h-6 w-6 text-slate-700" />
              </div>

              {savedMessage && (
                <div className="mt-5 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{savedMessage}</div>
              )}

              {isCitizen ? (
                <div className="mt-6 space-y-4">
                  <p className="text-sm leading-6 text-slate-600">As a citizen, you can signal satisfaction, request escalation, or revoke the report.</p>
                  <div className="grid gap-3 sm:grid-cols-1">
                    <button type="button" onClick={() => handleCitizenAction('resolve')} className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Mark Satisfied</button>
                    <button type="button" onClick={() => handleCitizenAction('reopen')} className="w-full rounded-3xl bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-600">Re-open Request</button>
                    <button type="button" onClick={() => handleCitizenAction('revoke')} className="w-full rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">Revoke Request</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Assigned contractor</label>
                    <input type="text" value={contractorName} onChange={(e) => setContractorName(e.target.value)} placeholder="e.g. City Works Team" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Update status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                      <option value="Just Reported">Just Reported</option>
                      <option value="Helping">Helping out</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Satisfied">Satisfied</option>
                      <option value="Reopened">Reopened</option>
                      <option value="Revoked">Revoked</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Resolved description</label>
                    <textarea rows="4" value={resolvedDescription} onChange={(e) => setResolvedDescription(e.target.value)} placeholder="Describe the final resolution" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 resize-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Resolved image</label>
                    <div className="rounded-3xl border border-slate-200 bg-white p-4">
                      <input type="file" accept="image/*" capture="environment" onChange={handleResolvedPhotoChange} className="w-full text-sm text-slate-500 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-slate-700" />
                      {resolvedPhoto && (
                        <div className="mt-4 relative">
                          <img src={resolvedPhoto} alt="Resolved evidence" className="h-40 w-full rounded-3xl object-cover" />
                          <button type="button" onClick={() => setResolvedPhoto(null)} className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-slate-950">×</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="w-full rounded-3xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800">Save changes</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
