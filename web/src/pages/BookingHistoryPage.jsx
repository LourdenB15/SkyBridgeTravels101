import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { getUserBookings } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'

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
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex gap-4">
                  <img
                    src={booking.hotel?.images?.[0] || 'https://placehold.co/128x128?text=Hotel'}
                    alt={booking.hotel?.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-dark">{booking.hotel?.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-gray-text text-sm">{booking.hotel?.address}</p>
                    <p className="text-gray-text text-sm">
                      Room: {booking.room?.name} | Guests: {booking.numberOfGuests}
                    </p>
                    <p className="text-gray-text text-sm">
                      {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-gray-text text-sm">{booking.bookingRef}</p>
                    <p className="font-semibold text-dark mt-1">
                      ₱{new Intl.NumberFormat('en-PH').format(booking.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistoryPage
