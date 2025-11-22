import SearchBar from '../components/SearchBar'

function HomePage() {
  return (
    <div>
      <div className="bg-[#3B82F6] px-4 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-4xl font-bold text-white">Find your next stay</h1>
          <p className="mb-8 text-lg text-white/90">Search hotels in Cordova, Cebu</p>
          <SearchBar />
        </div>
      </div>

      <div className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-semibold text-dark">Offers</h2>
          <p className="mb-6 text-gray-text">Promotions, deals, and special offers for you</p>

          <div className="flex gap-6 overflow-x-auto pb-4">
            <div className="min-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-r from-[#3B82F6] to-[#1E40AF]">
                <div className="flex h-full flex-col justify-center p-6">
                  <span className="mb-2 text-sm font-medium text-white/80">Limited Time</span>
                  <h3 className="text-xl font-bold text-white">20% off weekend stays</h3>
                  <p className="mt-2 text-sm text-white/90">Book Friday to Sunday and save big</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-text">Valid until December 31, 2024</p>
              </div>
            </div>

            <div className="min-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-r from-[#22C55E] to-[#16A34A]">
                <div className="flex h-full flex-col justify-center p-6">
                  <span className="mb-2 text-sm font-medium text-white/80">Exclusive Deal</span>
                  <h3 className="text-xl font-bold text-white">Free breakfast included</h3>
                  <p className="mt-2 text-sm text-white/90">Enjoy complimentary breakfast for 2</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-text">On select properties</p>
              </div>
            </div>

            <div className="min-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-r from-[#F59E0B] to-[#D97706]">
                <div className="flex h-full flex-col justify-center p-6">
                  <span className="mb-2 text-sm font-medium text-white/80">Early Bird</span>
                  <h3 className="text-xl font-bold text-white">Book 30 days ahead</h3>
                  <p className="mt-2 text-sm text-white/90">Get 15% off on advance bookings</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-text">Plan your vacation early</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
