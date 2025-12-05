import { MapPin } from 'lucide-react'

function BookingHistoryCard({ booking, onCancel, isCancelling }) {
  const formatDateRange = (checkIn, checkOut) => {
    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)
    const inYear = inDate.getFullYear()
    const outYear = outDate.getFullYear()

    const inOptions = { month: 'short', day: 'numeric' }
    const outOptions = { month: 'short', day: 'numeric', year: 'numeric' }

    if (inYear !== outYear) {
      inOptions.year = 'numeric'
    }

    const inFormatted = inDate.toLocaleDateString('en-US', inOptions)
    const outFormatted = outDate.toLocaleDateString('en-US', outOptions)

    return `${inFormatted} - ${outFormatted}`
  }

  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)
    const diffTime = Math.abs(outDate - inDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price).replace('PHP', '₱')
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: {
        borderColor: 'border-green-500',
        textColor: 'text-green-500',
        label: 'Confirmed'
      },
      pending: {
        borderColor: 'border-orange-500',
        textColor: 'text-orange-500',
        label: 'Pending'
      },
      expired: {
        borderColor: 'border-red-500',
        textColor: 'text-red-500',
        label: 'Expired'
      },
      failed: {
        borderColor: 'border-red-500',
        textColor: 'text-red-500',
        label: 'Failed'
      },
      cancelled: {
        borderColor: 'border-gray-500',
        textColor: 'text-gray-500',
        label: 'Cancelled'
      },
      completed: {
        borderColor: 'border-green-500',
        textColor: 'text-green-500',
        label: 'Completed'
      }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.borderColor} ${config.textColor}`}>
        {config.label}
      </span>
    )
  }

  const nights = calculateNights(booking.checkInDate, booking.checkOutDate)
  const canCancel = booking.status === 'pending'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:h-[250px]">
        <div className="w-full lg:w-80 h-48 lg:h-auto flex-shrink-0">
          <img
            src={booking.hotel?.images?.[0] || 'https://placehold.co/320x200?text=Hotel'}
            alt={booking.hotel?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-semibold text-xl text-dark mb-1">
                {booking.hotel?.name}
              </h3>
              <p className="text-gray-text text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" />
                {booking.hotel?.address}
              </p>
            </div>
            <div className="flex-shrink-0">
              {getStatusBadge(booking.status)}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-text uppercase tracking-wide mb-1">Room Type</p>
              <p className="text-sm font-medium text-dark">{booking.room?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-text uppercase tracking-wide mb-1">Check-in - Check-out</p>
              <p className="text-sm font-medium text-dark">
                {formatDateRange(booking.checkInDate, booking.checkOutDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-text uppercase tracking-wide mb-1">Guests</p>
              <p className="text-sm font-medium text-dark">
                {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'Guest' : 'Guests'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-text uppercase tracking-wide mb-1">Duration</p>
              <p className="text-sm font-medium text-dark">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-text">
                Booking ID: <span className="font-medium text-dark">{booking.bookingRef}</span>
              </p>
              <p className="text-2xl font-bold" style={{ color: '#4E8CFF' }}>
                {formatPrice(booking.totalPrice)}
              </p>
            </div>
            {canCancel && (
              <button
                onClick={() => onCancel(booking.id)}
                disabled={isCancelling}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistoryCard
