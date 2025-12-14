import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import MentalHealthDashboard from './pages/MentalHealthDashboard'
import AITherapist from './pages/AITherapist'
import MentalHealthAssessment from './pages/MentalHealthAssessment'
import MoodTracker from './pages/MoodTracker'
import CrisisSupport from './pages/CrisisSupport'
import MentalHealthResources from './pages/MentalHealthResources'
import AdvancedAI from './pages/AdvancedAI'
import AutonomousAIDashboard from './pages/AutonomousAIDashboard'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%] bg-black min-h-screen text-white'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/mental-health' element={<MentalHealthDashboard />} />
        <Route path='/ai-therapist' element={<AITherapist />} />
        <Route path='/mental-health-assessment' element={<MentalHealthAssessment />} />
        <Route path='/mood-tracker' element={<MoodTracker />} />
        <Route path='/crisis-support' element={<CrisisSupport />} />
        <Route path='/mental-health-resources' element={<MentalHealthResources />} />
        <Route path='/advanced-ai' element={<AdvancedAI />} />
        <Route path='/autonomous-ai' element={<AutonomousAIDashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App