function SearchBar() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-dark">Location</label>
          <input
            type="text"
            placeholder="Cordova, Cebu"
            className="w-full rounded-lg border-2 border-dark px-4 py-3 text-dark placeholder:text-gray-text focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-dark">Check-in</label>
          <input
            type="date"
            className="w-full rounded-lg border-2 border-dark px-4 py-3 text-dark focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-dark">Check-out</label>
          <input
            type="date"
            className="w-full rounded-lg border-2 border-dark px-4 py-3 text-dark focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
        <div className="w-full md:w-32">
          <label className="mb-1 block text-sm font-medium text-dark">Guests</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-full rounded-lg border-2 border-dark px-4 py-3 text-dark focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-8 py-3 font-medium text-white transition-colors hover:bg-[#2563EB]">
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
