import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, HeartHandshake } from "lucide-react";

const STORAGE_KEY = "complaintsData";

const initialComplaints = [
  {
    id: "C-101",
    title: "Pothole on Main St",
    description:
      "Large pothole causing traffic slowdowns and potential vehicle damage.",
    status: "Fixed",
    contractor: "City Works Team",
    date: "2023-10-12",
    location: "Main St & 4th Ave",
    ward: "W-01",
    photo: null,
  },
  {
    id: "C-102",
    title: "Broken Streetlight",
    description: "Streetlight has been flickering and is now completely off.",
    status: "Fixed",
    contractor: null,
    date: "2023-10-15",
    location: "Oakwood Dr",
    ward: "W-02",
    photo: null,
  },
  {
    id: "C-103",
    title: "Flooded Pedestrian Walkway",
    description: "Drainage seems blocked, causing severe flooding after rain.",
    status: "Helping",
    contractor: "Neighborhood Squad",
    date: "2023-10-18",
    location: "River Road",
    ward: "W-03",
    photo:
      "https://images.unsplash.com/photo-1549237510-e01c8a53ff79?auto=format&fit=crop&w=900&q=80",
  },
];

const statusStyles = {
  Fixed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Helping: "bg-amber-50 text-amber-600 border-amber-100",
  Satisfied: "bg-sky-50 text-sky-600 border-sky-100",
  Revoked: "bg-rose-50 text-rose-600 border-rose-100",
  Reopened: "bg-violet-50 text-violet-600 border-violet-100",
  "Just Reported": "bg-slate-50 text-slate-600 border-slate-100",
};

const ViewComplains = () => {
  const [complaints, setComplaints] = useState(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return initialComplaints;
    try {
      return JSON.parse(item);
    } catch {
      return initialComplaints;
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const isCitizen = user?.role === "citizen";

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

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
