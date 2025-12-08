import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
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

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
        <Route path="/hotel/:id" element={<Layout><HotelDetailsPage /></Layout>} />
        <Route path="/booking/:hotelId/:roomId" element={<Layout><ProtectedRoute><BookingPage /></ProtectedRoute></Layout>} />
        <Route path="/confirmation/:bookingRef" element={<Layout><ConfirmationPage /></Layout>} />
        <Route path="/bookings" element={<Layout><ProtectedRoute><BookingHistoryPage /></ProtectedRoute></Layout>} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
