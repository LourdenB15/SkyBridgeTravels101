import { useNavigate } from 'react-router-dom'

function RoomCard({ room, hotelId, guests, checkIn, checkOut }) {
  const navigate = useNavigate()

  const handleBookNow = () => {
    const queryParams = new URLSearchParams()
    queryParams.set('guests', guests || 1)
    if (checkIn) queryParams.set('checkIn', checkIn)
    if (checkOut) queryParams.set('checkOut', checkOut)
    navigate(`/booking/${hotelId}/${room.id}?${queryParams.toString()}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('PHP', '₱')
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg sm:flex-row">
      <div className="h-48 w-full shrink-0 sm:h-auto sm:w-48 md:w-64">
        <img
          src={room.images?.[0] || 'https://placehold.co/400x300?text=No+Image'}
          alt={room.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark">{room.name}</h3>
          <p className="mt-1 text-sm text-gray-text line-clamp-2">{room.description}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Max {room.maxGuests} guest{room.maxGuests > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xl font-bold text-primary">
              {formatPrice(room.pricePerNight)}
            </span>
            <span className="text-sm text-gray-text">/night</span>
          </div>
          <button
            onClick={handleBookNow}
            className="cursor-pointer rounded-full bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-[#2563EB]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
