import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/authorities/Dashboard';

import ViewComplains from './components/ViewComplains';
import ViewFacilityRequests from './components/authorities/ViewFacilityRequests';
import ReportComplainDetails from './components/ReportComplainDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            {/* We can provide a redirect to a default child depending on role dynamically within Dashboard or Login. */}
            <Route path="manage-complaints" element={<ViewComplains />} />
            <Route path="facility-requests" element={<ViewFacilityRequests />} />
            <Route path="report-issue" element={<ReportComplainDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
