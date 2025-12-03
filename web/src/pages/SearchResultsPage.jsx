import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '@/components/SearchBar'
import HotelCard from '@/components/HotelCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { searchHotels } from '@/services/api'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')

  const location = searchParams.get('location') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = parseInt(searchParams.get('guests')) || 1

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true)
      try {
        const data = await searchHotels(guests, sortBy, location)
        setHotels(data)
      } catch (error) {
        console.error('Error fetching hotels:', error)
        setHotels([])
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [guests, sortBy, location])

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  const breadcrumbLocation = location || 'Cordova, Cebu'

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="bg-primary px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <SearchBar
            initialValues={{
              location,
              checkIn,
              checkOut,
              guests: guests.toString(),
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 text-sm text-gray-text">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <span>{breadcrumbLocation}</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-dark">Results</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl bg-white p-4 shadow-md">
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <div className="text-center text-gray-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-2 h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-sm">Map view</p>
                  <p className="text-xs">Cordova, Cebu</p>
                </div>
              </div>
              <button className="mt-4 w-full rounded-full border border-dark px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-100">
                Show on map
              </button>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-dark">
                <span className="font-semibold">{breadcrumbLocation}:</span>{' '}
                {loading ? '...' : `${hotels.length} properties found`}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50">
                  Sort: {sortBy === 'relevance' ? 'Relevance' : 'Price (low to high)'}
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    onClick={() => handleSortChange('relevance')}
                    className={sortBy === 'relevance' ? 'bg-gray-100' : ''}
                  >
                    Relevance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange('price')}
                    className={sortBy === 'price' ? 'bg-gray-100' : ''}
                  >
                    Price (low to high)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {loading ? (
              <LoadingSpinner text="Loading hotels..." className="h-64" />
            ) : hotels.length === 0 ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4 h-16 w-16 text-gray-text"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <h3 className="mb-2 text-lg font-semibold text-dark">No properties found</h3>
                <p className="text-gray-text">
                  Try adjusting your search criteria or exploring different locations.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    guests={guests}
                    checkIn={checkIn}
                    checkOut={checkOut}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage
