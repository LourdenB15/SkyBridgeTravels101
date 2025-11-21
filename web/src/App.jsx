import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import HotelDetailsPage from './pages/HotelDetailsPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
        <Route path="/booking/:hotelId/:roomId" element={<BookingPage />} />
        <Route path="/confirmation/:bookingRef" element={<ConfirmationPage />} />
      </Routes>
    </Layout>
  )
}

export default App
