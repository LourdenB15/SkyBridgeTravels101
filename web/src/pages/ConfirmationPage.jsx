import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBookingByRef } from '@/services/api'
import { Check, Loader2, XCircle, Calendar, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ConfirmationPage() {
  const { bookingRef } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBooking() {
      try {
        setLoading(true)
        const data = await getBookingByRef(bookingRef)
        setBooking(data)
      } catch (err) {
        setError('Booking not found')
      } finally {
        setLoading(false)
      }
    }

    if (bookingRef) {
      fetchBooking()
    }
  }, [bookingRef])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-text">Loading confirmation...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">Booking Not Found</h1>
          <p className="text-gray-text mb-6">
            We couldn't find a booking with reference {bookingRef}.
            Please check your booking reference and try again.
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Complete!</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <h2 className="text-3xl font-bold text-dark mb-4">Booking Confirmed!</h2>

          <p className="text-gray-text mb-6">
            Your stay at <span className="font-semibold text-dark">{booking.hotel?.name}</span> is confirmed.
            <br />
            Please save your booking reference.
          </p>

          <div className="bg-light-gray rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-text mb-2">Booking Reference</p>
            <p className="text-3xl font-bold text-primary tracking-wider">{booking.bookingRef}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-text mb-1">Hotel</p>
                <p className="font-semibold text-dark">{booking.hotel?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-text mb-1">Room</p>
                <p className="font-semibold text-dark">{booking.room?.name}</p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-text mb-1">Check-in</p>
                  <p className="font-semibold text-dark">{formatDate(booking.checkInDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-text mb-1">Check-out</p>
                  <p className="font-semibold text-dark">{formatDate(booking.checkOutDate)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-primary">
              <strong>Guest:</strong> {booking.guestFirstName} {booking.guestLastName}
            </p>
            <p className="text-sm text-primary">
              <strong>Email:</strong> {booking.guestEmail}
            </p>
            <p className="text-sm text-primary">
              <strong>Guests:</strong> {booking.numberOfGuests}
            </p>
          </div>

          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage
