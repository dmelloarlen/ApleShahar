import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Dashboard from './components/authorities/Dashboard'
import ViewComplains from './components/ViewComplains'
import ReportComplainDetails from './components/ReportComplainDetails'
import FacilityRequestDetails from './components/FacilityRequestDetails'
import Login from './components/auth/login'
import Signup from './components/auth/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewFacilityRequests from './components/authorities/ViewFacilityRequests'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/view-complains" element={<ViewComplains />} />
          <Route path="/complain-details" element={<ReportComplainDetails />} />
          <Route path="/facility-request-details" element={<FacilityRequestDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-facility-requests" element={<ViewFacilityRequests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div className='text-center text-4xl font-bold text-red-400 my-auto'>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
