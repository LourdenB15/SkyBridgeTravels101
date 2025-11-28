import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getHotel } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GuestForm from '@/components/GuestForm'

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

  const nights = calculateNights()
  const roomPrice = room ? Number(room.pricePerNight) : 0
  const stayTotal = roomPrice * nights
  const taxAmount = stayTotal * 0.12
  const totalPrice = stayTotal + taxAmount

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price).replace('PHP', '₱')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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

  if (error || !hotel || !room) {
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-dark mb-3">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-text">Check-in</span>
                    <span className="font-medium">{formatDate(checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Check-out</span>
                    <span className="font-medium">{formatDate(checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Guests</span>
                    <span className="font-medium">{guests} {Number(guests) === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">Room</span>
                    <span className="font-medium">{room.name}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-dark mb-3">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-text">
                      Stay ({nights} {nights === 1 ? 'night' : 'nights'} × {formatPrice(roomPrice)})
                    </span>
                    <span className="font-medium">{formatPrice(stayTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-text">VAT (12%)</span>
                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  if (validateForm) {
                    const isValid = validateForm()
                    if (isValid) {
                      console.log('Form is valid, guest info:', guestInfo)
                    }
                  }
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-full transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingPage
