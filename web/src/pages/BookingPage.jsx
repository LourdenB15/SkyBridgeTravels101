import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getHotel, createBooking, createPaymentInvoice } from '@/services/api'
import GuestForm from '@/components/GuestForm'
import OrderSummary from '@/components/OrderSummary'
import LoadingSpinner from '@/components/LoadingSpinner'

function BookingPage() {
  const { hotelId, roomId } = useParams()
  const [searchParams] = useSearchParams()
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
  const [validateForm, setValidateForm] = useState(null)

  const handleGuestValuesChange = useCallback((values) => {
    setGuestInfo(values)
  }, [])

  const handleValidationChange = useCallback((_, validateFn) => {
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

      const result = await createBooking(bookingData)

      const paymentResult = await createPaymentInvoice(result.id)

      window.location.href = paymentResult.invoiceUrl
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <LoadingSpinner text="Loading booking details..." />
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
      <div className="bg-gradient-to-r from-primary to-[#3d7ae8] py-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Complete your Booking</h1>
          <p className="text-white/90 mt-1">Book now and secure your stay</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <div>
            <div className="bg-white rounded-xl p-4 shadow-md mb-6 flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-[100px] h-[180px] sm:h-[100px] rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={hotel.images?.[0] || 'https://placehold.co/100x100?text=Hotel'}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-dark">{hotel.name}</h2>
                <p className="text-gray-text mt-1">{room.name}</p>
                <p className="text-gray-text text-sm flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hotel.address}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h2 className="text-xl font-semibold text-dark mb-6">Guest Information</h2>
              <GuestForm
                onValuesChange={handleGuestValuesChange}
                onValidationChange={handleValidationChange}
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h2 className="text-xl font-semibold text-dark mb-6">Payment</h2>
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">Secure payment via Xendit</h3>
                <p className="text-gray-text">
                  You will be redirected to complete your payment securely.<br />
                  Multiple payment methods are available.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">Cancellation Policy</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Free cancellation up to 7 days before check-in. Bookings cannot be cancelled within 7 days of the check-in date.
                  </p>
                </div>
              </div>
            </div>

            {error && !loading && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit mb-6 lg:mb-0">
            <OrderSummary
              pricePerNight={room.pricePerNight}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              roomName={room.name}
              onConfirm={handleConfirmBooking}
              isSubmitting={submitting}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
