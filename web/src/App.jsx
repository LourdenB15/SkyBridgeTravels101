import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import HotelDetailsPage from './pages/HotelDetailsPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import BookingHistoryPage from './pages/BookingHistoryPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
        <Route path="/hotel/:id" element={<Layout><HotelDetailsPage /></Layout>} />
        <Route path="/booking/:hotelId/:roomId" element={<Layout><ProtectedRoute><BookingPage /></ProtectedRoute></Layout>} />
        <Route path="/confirmation/:bookingRef" element={<Layout><ConfirmationPage /></Layout>} />
        <Route path="/bookings" element={<Layout><ProtectedRoute><BookingHistoryPage /></ProtectedRoute></Layout>} />
        <Route path="/profile" element={<Layout><ProtectedRoute><ProfileSettingsPage /></ProtectedRoute></Layout>} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
