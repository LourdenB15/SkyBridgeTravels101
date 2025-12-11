import SearchBar from '../components/SearchBar'

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] px-4 pb-20 pt-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-semibold text-white md:text-[2.8rem]">
            Find your next stay
          </h1>
          <p className="mb-8 text-base text-white/95 md:text-lg">
            Search hotels in Cordova, Cebu
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-7xl px-4 pb-8 md:px-8">
        <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800 md:text-[1.8rem]">
            Offers
          </h2>
          <p className="mb-6 text-gray-600">
            Promotions, deals, and special offers for you
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="cursor-pointer overflow-hidden rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="min-h-[160px] bg-gradient-to-br from-[#4e8cff] to-[#3d7ae8] p-6 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-95">
                  Limited Time
                </p>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  20% off weekend stays
                </h3>
                <p className="text-sm opacity-95">
                  Book Friday to Sunday and save big
                </p>
              </div>
              <div className="bg-white px-6 py-4">
                <p className="text-sm text-gray-500">
                  Valid until December 31, 2024
                </p>
              </div>
            </div>

            <div className="cursor-pointer overflow-hidden rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="min-h-[160px] bg-gradient-to-br from-[#2ecc71] to-[#27ae60] p-6 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-95">
                  Exclusive Deal
                </p>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  Free breakfast included
                </h3>
                <p className="text-sm opacity-95">
                  Enjoy complimentary breakfast for 2
                </p>
              </div>
              <div className="bg-white px-6 py-4">
                <p className="text-sm text-gray-500">On select properties</p>
              </div>
            </div>

            <div className="cursor-pointer overflow-hidden rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="min-h-[160px] bg-gradient-to-br from-[#f39c12] to-[#e67e22] p-6 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-95">
                  Early Bird
                </p>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  Book 30 days ahead
                </h3>
                <p className="text-sm opacity-95">
                  Get 15% off on advance bookings
                </p>
              </div>
              <div className="bg-white px-6 py-4">
                <p className="text-sm text-gray-500">Plan your vacation early</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
