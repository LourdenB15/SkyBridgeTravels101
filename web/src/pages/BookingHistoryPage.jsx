import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarX2 } from 'lucide-react'
import { getUserBookings, cancelBooking } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import BookingHistoryCard from '@/components/BookingHistoryCard'

const TABS = [
  { id: 'all', label: 'All Bookings' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' }
]

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [cancellingId, setCancellingId] = useState(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getUserBookings()
      setBookings(data)
    } catch (err) {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId)
      await cancelBooking(bookingId)
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      )
    } catch (err) {
      setError('Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }

  const filterBookings = (bookings) => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    switch (activeTab) {
      case 'upcoming':
        return bookings.filter(b => {
          const checkIn = new Date(b.checkInDate)
          return checkIn >= now && b.status === 'confirmed'
        })
      case 'pending':
        return bookings.filter(b => ['pending', 'expired', 'failed'].includes(b.status))
      case 'completed':
        return bookings.filter(b => {
          if (b.status === 'completed') return true
          if (b.status === 'confirmed') {
            const checkOut = new Date(b.checkOutDate)
            return checkOut < now
          }
          return false
        })
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled')
      default:
        return bookings
    }
  }

  const filteredBookings = filterBookings(bookings)

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <LoadingSpinner text="Loading your bookings..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-dark mb-6">My Bookings</h1>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-4 sm:gap-8 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-gray-text hover:text-dark'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => {
                setError(null)
                fetchBookings()
              }}
              className="mt-2 text-primary hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <CalendarX2 className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500 mb-2">
              {activeTab === 'all' ? 'No bookings yet' : `No ${activeTab} bookings`}
            </p>
            <p className="text-gray-text mb-6">
              {activeTab === 'all'
                ? 'When you book a stay, it will appear here'
                : 'Bookings matching this filter will appear here'}
            </p>
            {activeTab === 'all' && (
              <Link
                to="/"
                className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Find Hotels
              </Link>
            )}
          </div>
        )}

        {!error && filteredBookings.length > 0 && (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingHistoryCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
                isCancelling={cancellingId === booking.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistoryPage
