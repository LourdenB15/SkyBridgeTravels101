import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { getHotel, createBooking, createPaymentInvoice } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GuestForm from '@/components/GuestForm'
import OrderSummary from '@/components/OrderSummary'

function BookingPage() {
  const { hotelId, roomId } = useParams()
  const [searchParams] = useSearchParams()
  const { getToken } = useAuth()
  const guests = searchParams.get('guests') || '1'
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''

  const [hotel, setHotel] = useState(null)
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [validateForm, setValidateForm] = useState(null)

  const handleGuestValuesChange = useCallback((values) => {
    setGuestInfo(values)
  }, [])

  const handleValidationChange = useCallback((isValid, validateFn) => {
    setIsFormValid(isValid)
    setValidateForm(() => validateFn)
  }, [])

  useEffect(() => {
    async function fetchHotelData() {
      try {
        setLoading(true)
        const hotelData = await getHotel(hotelId)
        setHotel(hotelData)
        const roomData = hotelData.rooms?.find(r => r.id === roomId)
        if (!roomData) {
          setError('Room not found')
        } else {
          setRoom(roomData)
        }
      } catch (err) {
        setError('Failed to load booking details')
      } finally {
        setLoading(false)
      }
    }

    fetchHotelData()
  }, [hotelId, roomId])

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const handleConfirmBooking = async () => {
    if (validateForm) {
      const isValid = validateForm()
      if (!isValid) {
        return
      }
    }

    try {
      setSubmitting(true)
      setError(null)

      const token = await getToken()
      if (!token) {
        setError('Authentication required. Please sign in.')
        return
      }

      const nights = calculateNights()
      const roomPrice = Number(room.pricePerNight)

      const bookingData = {
        hotelId,
        roomId,
        guestFirstName: guestInfo.firstName,
        guestLastName: guestInfo.lastName,
        guestEmail: guestInfo.email,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: Number(guests),
        roomPrice,
        nights
      }

      const result = await createBooking(bookingData, token)

      const paymentResult = await createPaymentInvoice(result.id, token)

      window.location.href = paymentResult.invoiceUrl
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-text">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!hotel || !room) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-dark mb-2">Booking Error</h2>
            <p className="text-gray-text mb-6">{error || 'Unable to load booking details'}</p>
            <Link to="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Complete your Booking</h1>
          <p className="text-white/80 mt-1">Book now</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <img
              src={hotel.images?.[0] || 'https://placehold.co/100x100?text=Hotel'}
              alt={hotel.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h2 className="font-semibold text-dark">{hotel.name}</h2>
              <p className="text-gray-text text-sm">{room.name}</p>
              <p className="text-gray-text text-sm">{hotel.address}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guest Information</CardTitle>
            </CardHeader>
            <CardContent>
              <GuestForm
                onValuesChange={handleGuestValuesChange}
                onValidationChange={handleValidationChange}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <p className="text-gray-text mb-4">
                  Secure payment via Xendit
                </p>
                <p className="text-sm text-gray-text">
                  You will be redirected to complete your payment securely.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && !loading && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <OrderSummary
          pricePerNight={room.pricePerNight}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          roomName={room.name}
          onConfirm={handleConfirmBooking}
          isSubmitting={submitting}
        />
      </div>
    </div>
  )
}

export default BookingPage
