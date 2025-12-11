import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getHotel } from '@/services/api'
import SearchBar from '@/components/SearchBar'
import RoomCard from '@/components/RoomCard'
import Map from '@/components/Map'
import LoadingSpinner from '@/components/LoadingSpinner'

function HotelDetailsPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  const guests = searchParams.get('guests') || 1
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''

  useEffect(() => {
    async function fetchHotel() {
      try {
        setLoading(true)
        const data = await getHotel(id)
        setHotel(data)
      } catch (error) {
        console.error('Failed to fetch hotel:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHotel()
  }, [id])

  const scrollToRooms = () => {
    const roomsSection = document.getElementById('room-options')
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray">
        <div className="bg-primary px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <SearchBar initialValues={{ guests: Number(guests), checkIn, checkOut }} />
          </div>
        </div>
        <LoadingSpinner text="Loading hotel details..." className="min-h-[400px]" />
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-light-gray">
        <div className="bg-primary px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <SearchBar initialValues={{ guests: Number(guests), checkIn, checkOut }} />
          </div>
        </div>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-gray-text"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
            <p className="mt-4 text-lg font-medium text-dark">Hotel not found</p>
            <Link to="/" className="mt-2 inline-block text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <SearchBar initialValues={{ guests: Number(guests), checkIn, checkOut }} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2 text-gray-text">&gt;</span>
          <span className="text-gray-text">Cordova, Cebu</span>
          <span className="mx-2 text-gray-text">&gt;</span>
          <span className="text-dark">{hotel.name}</span>
        </nav>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark md:text-3xl">{hotel.name}</h1>
          <button
            onClick={scrollToRooms}
            className="cursor-pointer rounded-full bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-[#2563EB]"
          >
            Reserve
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
              <div className="aspect-video w-full">
                <img
                  src={hotel.images?.[selectedImage] || 'https://placehold.co/800x450?text=No+Image'}
                  alt={hotel.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {hotel.images && hotel.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-4">
                  {hotel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${hotel.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-dark">About this property</h2>
              <p className="text-gray-text">{hotel.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
              <div className="h-48 z-0 relative">
                <Map
                  latitude={hotel.latitude}
                  longitude={hotel.longitude}
                  hotelName={hotel.name}
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-text">{hotel.address}</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-dark">Property Highlights</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rating-blue text-sm font-bold text-white">
                  {hotel.rating?.toFixed(1) || 'N/A'}
                </div>
                <span className="text-sm font-medium text-dark">
                  {hotel.rating >= 4.5 ? 'Exceptional' : hotel.rating >= 4 ? 'Very Good' : hotel.rating >= 3.5 ? 'Good' : 'Fair'}
                </span>
              </div>
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-dark">Amenities</h4>
                  <ul className="space-y-2">
                    {hotel.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-success"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="room-options" className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-dark">Room Options</h2>
          {hotel.rooms && hotel.rooms.length > 0 ? (
            (() => {
              const guestCount = Number(guests) || 1
              const filteredRooms = hotel.rooms.filter(room => room.maxGuests >= guestCount)

              if (filteredRooms.length === 0) {
                return (
                  <div className="rounded-xl bg-white p-8 text-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-text"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                      <path d="M21 7v-.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5V7" />
                      <path d="M3 7h18" />
                    </svg>
                    <p className="mt-4 text-lg font-medium text-dark">No rooms available for {guestCount} guest{guestCount > 1 ? 's' : ''}</p>
                    <p className="mt-1 text-sm text-gray-text">Try adjusting your guest count to see available rooms.</p>
                  </div>
                )
              }

              return (
                <div className="space-y-4">
                  <p className="text-sm text-gray-text">
                    {filteredRooms.length} room{filteredRooms.length > 1 ? 's' : ''} available for {guestCount} guest{guestCount > 1 ? 's' : ''}
                  </p>
                  {filteredRooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      hotelId={id}
                      guests={guestCount}
                      checkIn={checkIn}
                      checkOut={checkOut}
                    />
                  ))}
                </div>
              )
            })()
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-gray-text"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                <path d="M21 7v-.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5V7" />
                <path d="M3 7h18" />
              </svg>
              <p className="mt-4 text-lg font-medium text-dark">No rooms available</p>
              <p className="mt-1 text-sm text-gray-text">This hotel has no rooms listed at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelDetailsPage
