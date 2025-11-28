import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TAX_RATE = 0.12

function OrderSummary({
  pricePerNight,
  checkIn,
  checkOut,
  guests,
  roomName,
  onConfirm,
  confirmDisabled = false,
  isSubmitting = false
}) {
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const nights = calculateNights()
  const roomPrice = Number(pricePerNight) || 0
  const staySubtotal = roomPrice * nights
  const vatAmount = staySubtotal * TAX_RATE
  const total = staySubtotal + vatAmount

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

  return (
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
              {roomName && (
                <div className="flex justify-between">
                  <span className="text-gray-text">Room</span>
                  <span className="font-medium">{roomName}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-dark mb-3">Price Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-text">
                  Stay ({nights} {nights === 1 ? 'night' : 'nights'} × {formatPrice(roomPrice)})
                </span>
                <span className="font-medium">{formatPrice(staySubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-text">VAT (12%)</span>
                <span className="font-medium">{formatPrice(vatAmount)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled || isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export { TAX_RATE }
export default OrderSummary
