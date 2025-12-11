import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function SearchBar({ initialValues = {} }) {
  const navigate = useNavigate()
  const [location, setLocation] = useState(initialValues.location || '')
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || '')
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || '')
  const [guests, setGuests] = useState(initialValues.guests || 1)

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates')
      return
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out must be after check-in')
      return
    }
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    params.set('checkIn', checkIn)
    params.set('checkOut', checkOut)
    params.set('guests', guests)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1.5fr_1fr_auto] lg:items-end">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">Location</label>
          <input
            type="text"
            placeholder="Cordova, Cebu"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#4e8cff] focus:outline-none focus:ring-2 focus:ring-[#4e8cff]/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-800 transition-all focus:border-[#4e8cff] focus:outline-none focus:ring-2 focus:ring-[#4e8cff]/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-800 transition-all focus:border-[#4e8cff] focus:outline-none focus:ring-2 focus:ring-[#4e8cff]/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800">Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-800 transition-all focus:border-[#4e8cff] focus:outline-none focus:ring-2 focus:ring-[#4e8cff]/10"
          />
        </div>
        <button
          onClick={handleSearch}
          className="col-span-1 flex items-center justify-center gap-2 rounded-lg bg-[#4e8cff] px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3d7ae8] hover:shadow-lg md:col-span-2 lg:col-span-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
