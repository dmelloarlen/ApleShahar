import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, HeartHandshake } from "lucide-react";
import { getMyComplaints, getStoredUser, getUserRole, getWardComplaints } from "../lib/api";

const statusStyles = {
  Fixed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Helping: "bg-amber-50 text-amber-600 border-amber-100",
  Satisfied: "bg-sky-50 text-sky-600 border-sky-100",
  Revoked: "bg-rose-50 text-rose-600 border-rose-100",
  Reopened: "bg-violet-50 text-violet-600 border-violet-100",
  "Just Reported": "bg-slate-50 text-slate-600 border-slate-100",
};

const toUiComplaint = (item) => ({
  id: String(item?.id || item?.complaint_id || item?._id || 'N/A'),
  title: item?.title || 'Untitled complaint',
  description: item?.description || item?.details || 'No description available.',
  status: item?.status || 'Just Reported',
  contractor: item?.contractor || item?.assigned_to || null,
  date: item?.created_at ? new Date(item.created_at).toLocaleDateString() : '-',
  location: item?.location_name || item?.location || `${item?.latitude ?? '-'}, ${item?.longitude ?? '-'}`,
  ward: item?.ward_no || item?.ward || '-',
  photo: item?.photo || item?.image_url || null,
  raw: item,
});

const ViewComplains = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const user = useMemo(() => getStoredUser(), []);

  const isCitizen = getUserRole(user) === "citizen";

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setLoading(true);
        setError('');

        const data = isCitizen
          ? await getMyComplaints()
          : await getWardComplaints(user?.ward_no || user?.user_metadata?.ward_no);

        const list = Array.isArray(data) ? data : (data?.complaints || []);
        setComplaints(list.map(toUiComplaint));
      } catch (err) {
        setError(err?.payload?.error || err?.message || 'Unable to load complaints.');
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, [isCitizen, user]);

  const openComplaint = (complaint) => {
    navigate(`/manage-complaint?id=${complaint.id}`, { state: { complaint } });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex lg:justify-end mb-8">
            <div className="relative w-full max-w-sm">
              <input
                aria-label="Search complaints"
                type="text"
                placeholder="Search by issue, ID, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-3xl border border-slate- bg-white py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          {loading && (
            <div className="p-8 text-center text-slate-600">Loading complaints...</div>
          )}

          {error && !loading && (
            <div className="p-6 text-center text-red-700 bg-red-50 border-b border-red-100">{error}</div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Issue</th>
                  <th className="px-5 py-4 font-semibold">Reported</th>
                  <th className="px-5 py-4 font-semibold">Ward</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {complaint.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {complaint.location} •{" "}
                        {complaint.description.slice(0, 70)}...
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {complaint.date}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {complaint.ward}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[complaint.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openComplaint(complaint)}
                        className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm shadow-amber-200 transition hover:bg-amber-600"
                      >
                        {isCitizen ? "Manage" : "Assist"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <p className="text-lg font-semibold">
                No reports match your search.
              </p>
              <p className="mt-2 text-sm">
                Try a different keyword or clear the search filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewComplains;
