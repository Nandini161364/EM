import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import OrganizerEvents from './components/OganizerDashboard/OrganizerEvents'
import NewEvent from './components/OganizerDashboard/NewEvent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/organizer/events"
          element={
            <ProtectedRoute>
              <OrganizerEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/create"
          element={
            <ProtectedRoute>
              <NewEvent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
