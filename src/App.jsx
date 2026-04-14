import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/authorities/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ViewComplains from './components/ViewComplains';
import ManageComplain from './components/ManageComplain';
import ViewFacilityRequests from './components/authorities/ViewFacilityRequests';
import ReportComplainDetails from './components/ReportComplainDetails';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col">
        {true && <Navbar />}
        <div className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/view-complaints" element={<ViewComplains />} />
            <Route path="/manage-complaint" element={<ManageComplain />} />
            <Route path="/facility-requests" element={<ViewFacilityRequests />} />
            <Route path="/report-issue" element={<ReportComplainDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
