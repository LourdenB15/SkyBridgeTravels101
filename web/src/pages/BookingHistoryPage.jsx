import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { getUserBookings } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import BookingHistoryCard from '@/components/BookingHistoryCard'

function BookingHistoryPage() {
  const { getToken } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true)
        setError(null)
        const token = await getToken()
        if (!token) {
          setError('Authentication required')
          return
        }
        const data = await getUserBookings(token)
        setBookings(data)
      } catch (err) {
        setError('Failed to load bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [getToken])

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <LoadingSpinner text="Loading your bookings..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-primary hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-text text-xl mb-2">No bookings yet</p>
            <p className="text-gray-text mb-6">When you book a stay, it will appear here</p>
          </div>
        )}

        {!error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingHistoryCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistoryPage
