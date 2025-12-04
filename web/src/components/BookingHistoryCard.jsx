function BookingHistoryCard({ booking }) {
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
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        label: 'Confirmed'
      },
      pending: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        label: 'Pending'
      },
      expired: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        label: 'Expired'
      },
      failed: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        label: 'Failed'
      }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${config.bgColor} ${config.textColor}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex gap-4">
        <img
          src={booking.hotel?.images?.[0] || 'https://placehold.co/128x128?text=Hotel'}
          alt={booking.hotel?.name}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-semibold text-dark truncate">{booking.hotel?.name}</h3>
            {getStatusBadge(booking.status)}
          </div>
          <p className="text-gray-text text-sm truncate">{booking.hotel?.address}</p>
          <p className="text-gray-text text-sm">
            Room: {booking.room?.name} | Guests: {booking.numberOfGuests}
          </p>
          <p className="text-gray-text text-sm">
            {formatDateRange(booking.checkInDate, booking.checkOutDate)}
          </p>
          <p className="text-gray-text text-sm font-medium">{booking.bookingRef}</p>
          <div className="flex-1 flex items-end justify-end mt-2">
            <p className="font-semibold text-dark text-lg">
              {formatPrice(booking.totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistoryCard
