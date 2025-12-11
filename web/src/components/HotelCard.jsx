import { Link } from 'react-router-dom'

function HotelCard({ hotel, guests, checkIn, checkOut }) {
  const queryParams = new URLSearchParams()
  queryParams.set('guests', guests || 1)
  if (checkIn) queryParams.set('checkIn', checkIn)
  if (checkOut) queryParams.set('checkOut', checkOut)

  return (
    <Link
      to={`/hotel/${hotel.id}?${queryParams.toString()}`}
      className="block"
    >
      <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg sm:h-48 sm:flex-row">
        <div className="h-40 w-full shrink-0 sm:h-full sm:w-48 md:w-64">
          <img
            src={hotel.images?.[0] || 'https://placehold.co/400x300?text=Hotel'}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-dark">{hotel.name}</h3>
              <span className="rounded bg-rating-blue px-2 py-1 text-sm font-medium text-white">
                {hotel.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-text">{hotel.address}</p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-text">Starting from</p>
              <p className="text-xl font-bold text-primary">
                ₱{hotel.minPrice?.toLocaleString() || 'N/A'}
                <span className="text-sm font-normal text-gray-text">/night</span>
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              See availability
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
