import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import HotelDetailsPage from './pages/HotelDetailsPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import BookingHistoryPage from './pages/BookingHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
    <Toaster position="top-center" richColors />
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
        <Route path="/booking/:hotelId/:roomId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/confirmation/:bookingRef" element={<ConfirmationPage />} />
        <Route path="/bookings" element={<ProtectedRoute><BookingHistoryPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
    </>
  )
}

export default App
