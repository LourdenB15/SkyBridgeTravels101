import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { getBookingByRef, createPaymentInvoice } from '@/services/api'
import { Check, Loader2, XCircle, Calendar, Home, Clock, CreditCard, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/LoadingSpinner'

function ConfirmationPage() {
  const { bookingRef } = useParams()
  const { getToken } = useAuth()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retrying, setRetrying] = useState(false)

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

  const handleRetryPayment = async () => {
    try {
      setRetrying(true)
      const token = await getToken()
      if (!token) {
        setError('Please sign in to retry payment')
        setRetrying(false)
        return
      }
      const paymentResult = await createPaymentInvoice(booking.id, token)
      window.location.href = paymentResult.invoiceUrl
    } catch (err) {
      setError('Failed to create payment. Please try again.')
      setRetrying(false)
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: Check,
          iconBg: 'bg-success',
          badge: 'Payment Successful',
          badgeBg: 'bg-success',
          badgeText: 'text-white',
          title: 'Booking Confirmed!',
          message: 'is confirmed.'
        }
      case 'pending':
        return {
          icon: Clock,
          iconBg: 'bg-yellow-400',
          badge: 'Payment Pending',
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-800',
          title: 'Booking Created',
          message: 'is awaiting payment.'
        }
      case 'expired':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-red-400',
          badge: 'Payment Expired',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          title: 'Payment Expired',
          message: 'payment has expired.'
        }
      case 'failed':
        return {
          icon: XCircle,
          iconBg: 'bg-red-500',
          badge: 'Payment Failed',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          title: 'Payment Failed',
          message: 'payment could not be processed.'
        }
      default:
        return {
          icon: Clock,
          iconBg: 'bg-gray-400',
          badge: 'Processing',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-800',
          title: 'Processing',
          message: 'is being processed.'
        }
    }
  }

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
        <LoadingSpinner text="Loading confirmation..." />
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

  const statusConfig = getStatusConfig(booking.status)
  const StatusIcon = statusConfig.icon
  const showRetryButton = booking.status === 'pending' || booking.status === 'expired' || booking.status === 'failed'

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Complete!</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className={`w-20 h-20 ${statusConfig.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <StatusIcon className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${statusConfig.badgeBg} ${statusConfig.badgeText}`}>
            {statusConfig.badge}
          </span>

          <h2 className="text-3xl font-bold text-dark mb-4">{statusConfig.title}</h2>

          <p className="text-gray-text mb-6">
            Your stay at <span className="font-semibold text-dark">{booking.hotel?.name}</span> {statusConfig.message}
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

          {showRetryButton && (
            <Button
              onClick={handleRetryPayment}
              disabled={retrying}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-8 py-3 text-lg mb-4 w-full sm:w-auto"
            >
              {retrying ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  {booking.status === 'pending' ? 'Complete Payment' : 'Retry Payment'}
                </>
              )}
            </Button>
          )}

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
