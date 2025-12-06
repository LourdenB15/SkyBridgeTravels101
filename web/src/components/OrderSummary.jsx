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
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold text-dark pb-4 mb-4 border-b-2 border-gray-100">
        Order Summary
      </h2>

      <div className="mb-6">
        <h3 className="font-semibold text-dark mb-4">Booking Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-text">Check-in</span>
            <span className="font-medium text-dark">{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-text">Check-out</span>
            <span className="font-medium text-dark">{formatDate(checkOut)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-text">Guests</span>
            <span className="font-medium text-dark">{guests} {Number(guests) === 1 ? 'guest' : 'guests'}</span>
          </div>
          {roomName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-text">Room</span>
              <span className="font-medium text-dark">{roomName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-6" />

      <div className="mb-6">
        <h3 className="font-semibold text-dark mb-4">Price Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-text">
              Stay ({nights} {nights === 1 ? 'night' : 'nights'} × {formatPrice(roomPrice)})
            </span>
            <span className="font-medium text-dark">{formatPrice(staySubtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-text">VAT (12%)</span>
            <span className="font-medium text-dark">{formatPrice(vatAmount)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
        <span className="text-lg font-semibold text-dark">Total</span>
        <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled || isSubmitting}
        className="w-full mt-6 bg-primary hover:bg-[#3d7ae8] text-white font-semibold py-3 px-6 rounded-lg transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {isSubmitting ? 'Processing...' : 'Complete Booking'}
      </button>

    </div>
  )
}

export { TAX_RATE }
export default OrderSummary
