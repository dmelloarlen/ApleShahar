import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/authorities/Dashboard';
import Navbar from './components/Navbar';

import ViewComplains from './components/ViewComplains';
import ViewFacilityRequests from './components/authorities/ViewFacilityRequests';
import ReportComplainDetails from './components/ReportComplainDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="manage-complaints" element={<ViewComplains />} />
              <Route path="facility-requests" element={<ViewFacilityRequests />} />
              <Route path="report-issue" element={<ReportComplainDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
